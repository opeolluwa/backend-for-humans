<script setup lang="ts">
import type { FormSubmitEvent, TableColumn } from "@nuxt/ui";
import * as v from "valibot";
import api from "~/plugin/api";
import { useMarketplaceStore } from "~/stores/marketplace";
import { h, resolveComponent } from "vue";
import type { Row } from "@tanstack/vue-table";
import { getPaginationRowModel } from "@tanstack/vue-table";
import type { MarketPlace } from "../../../../bindings/Marketplace";

definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:building-storefront",
    ariaLabel: "Marketplace",
    title: "Marketplace",
  },
});

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const toast = useToast();

const columns: TableColumn<MarketPlace>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => `${row.getValue("name")}`,
  },

  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => `#${row.getValue("slug")}`,
  },

  {
    accessorKey: "createdAt",
    header: "Date created",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right text-red-500" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            }),
        ),
      );
    },
  },
];

function getRowItems(row: Row<MarketPlace>) {
  const router = useRouter();
  const marketplaceStore = useMarketplaceStore();
  // const { confirm } = useModal(); // Nuxt UI modal composable

  const identifier = row.original.identifier;

  return [
    {
      type: "label",
      label: "Actions",
    },

    { type: "separator" },

    // --- NEW CLEAN ACTIONS ---
    {
      label: "View entries",
      icon: "i-lucide-list",
      class: "text-sm flex gap-x-2 items-center",
      onSelect() {
        router.push(`/marketplace/${identifier}/products`);
      },
    },

    {
      label: "Update",
      icon: "i-lucide-pencil",
      onSelect() {
        router.push(`/marketplace/${identifier}/update`);
      },
    },

    {
      label: "Delete",
      icon: "i-lucide-trash",
      class: "text-red-500",
      async onSelect() {
        // const ok = await confirm({
        //   title: "Delete marketplace?",
        //   description: "This action cannot be undone.",
        //   confirmButton: {
        //     label: "Delete",
        //     color: "error",
        //   },
        //   cancelButton: {
        //     label: "Cancel",
        //   },
        // });

        // if (!ok) return;

        try {
          await api.delete(`/marketplaces/${identifier}`);

          toast.add({
            title: "Deleted",
            description: "Marketplace deleted successfully.",
            color: "success",
          });

          await marketplaceStore.fetchMarketplaces();
        } catch {
          toast.add({
            title: "Error",
            description: "Failed to delete marketplace.",
            color: "error",
          });
        }
      },
    },
  ];
}

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Name is required ")),
  description: v.pipe(v.string(), v.minLength(1, "Description is required ")),
  slug: v.pipe(v.string(), v.minLength(1, "Slug is required ")),
});

type Schema = v.InferOutput<typeof schema>;

const openForm = ref(false);
const state = reactive<Schema>({
  name: "",
  description: "",
  slug: "",
});

const resetForm = () => {
  state.name = "";
  state.description = "";
  state.slug = "";
};

const marketplaceStore = useMarketplaceStore();
const fetchingMarketplaces = ref(false);

const marketplaces = ref<MarketPlace[]>();
const nullMarketplaces = computed(() => !marketplaces.value?.length);

const loading = ref(false);
async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    const res = await api.post("/marketplaces", data);
    if (res.status !== 201) {
      throw new Error(res.data?.message || "Failed to create marketplace");
    }
    toast.add({
      title: "Success",
      description: "Product added successfully.",
    });
    openForm.value = false;
    resetForm();
  } catch {
    toast.add({
      title: "Error",
      description: "Failed to create marketplace. Please try again.",
      color: "error",
    });
  } finally {
    loading.value = false;
    await marketplaceStore.fetchMarketplaces();
    marketplaces.value = marketplaceStore.marketplaces;
  }
}

onMounted(async () => {
  try {
    await marketplaceStore.fetchMarketplaces();
    marketplaces.value = marketplaceStore.marketplaces;
  } catch {
    toast.add({
      title: "Error",
      description: "Failed to load marketplaces. Please try again.",
      color: "error",
    });
  } finally {
    fetchingMarketplaces.value = false;
  }
});

const pagination = ref({ pageIndex: 0, pageSize: 10 });

const globalFilter = ref("");
const search = ref("");
const domainFilter = ref("");
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const fromDate = ref("");
const toDate = ref("");

const filteredMarketplaces = computed(() => {
  const query = search.value.trim().toLowerCase();
  const domain = domainFilter.value.trim().toLowerCase();
  const min = minPrice.value;
  const max = maxPrice.value;
  const from = fromDate.value ? new Date(fromDate.value) : null;
  const to = toDate.value ? new Date(toDate.value) : null;

  return (marketplaces.value || []).filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const slug = item.slug?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";

    const matchSearch =
      !query ||
      name.includes(query) ||
      slug.includes(query) ||
      description.includes(query);
    const matchDomain =
      !domain || slug.includes(domain) || name.includes(domain);

    const createdAt = item.createdAt ? new Date(item.createdAt) : null;
    const matchDate =
      (!from || (createdAt && createdAt >= from)) &&
      (!to || (createdAt && createdAt <= to));

    const price = (item as any).price;
    const hasPriceFilter = min != null || max != null;
    const matchPrice =
      !hasPriceFilter ||
      (typeof price === "number" &&
        (min == null || price >= min) &&
        (max == null || price <= max));

    return matchSearch && matchDomain && matchDate && matchPrice;
  });
});

const table = useTemplateRef("table");
const colorMode = useColorMode();

function clearFilters() {
  search.value = "";
  domainFilter.value = "";
  minPrice.value = null;
  maxPrice.value = null;
  fromDate.value = "";
  toDate.value = "";
  globalFilter.value = "";
}
</script>

<template>
  <div>
    <PageLoader v-if="fetchingMarketplaces" />

    <div
      v-if="nullMarketplaces"
      class="flex flex-col justify-center items-center h-[70vh]"
    >
      <div
        class="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6"
      >
        <UIcon
          name="heroicons:users"
          class="size-8 text-gray-300 dark:text-white/20"
        />
      </div>

      <h1>You currently don&apos;t have any product</h1>

      <UButton
        color="neutral"
        variant="outline"
        class="px-5 py-4 rounded mt-3 cursor-pointer flex items-center justify-center gap-x-2"
        @click="openForm = true"
      >
        <UIcon name="heroicons:plus-circle" class="size-5" />
        Add product
      </UButton>
    </div>

    <div v-else>
      <div
        class="flex flex-col lg:flex-row gap-3 mb-5 px-4 py-3 border rounded border-accented items-end"
      >
        <UInput
          v-model="search"
          class="max-w-sm"
          placeholder="Search by name / slug / description"
        />

        <UInput
          v-model="domainFilter"
          class="max-w-sm"
          placeholder="Domain (slug)"
        />

        <UInput
          type="date"
          v-model="fromDate"
          class="max-w-sm"
          placeholder="From date"
        />

        <UInput
          type="date"
          v-model="toDate"
          class="max-w-sm"
          placeholder="To date"
        />

        <UInput
          type="number"
          v-model.number="minPrice"
          class="max-w-[10rem]"
          placeholder="Min price"
        />

        <UInput
          type="number"
          v-model.number="maxPrice"
          class="max-w-[10rem]"
          placeholder="Max price"
        />

        <UButton color="neutral" variant="outline" @click="clearFilters">
          Clear filters
        </UButton>
      </div>
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :data="filteredMarketplaces"
        class=""
        :loading="fetchingMarketplaces"
        loading-animation="carousel"
        :columns="columns"
        sticky="header"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel(),
        }"
      />

      <div class="flex justify-center border-t border-default pt-4 mt-6">
        <UPagination
          :default-page="
            (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
          "
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>

    <UModal
      v-model:open="openForm"
      title="Create store"
      description="A store lets you manage your goods"
      close-icon="heroicons:x-mark"
    >
      <template #body>
        <UForm
          class="space-y-4"
          :schema="schema"
          :state="state"
          @submit.prevent="onSubmit"
        >
          <UFormField
            v-slot="{ error }"
            label="Name"
            name="name"
            required
            :ui="{ error: 'text-red-500 text-sm mt-1' }"
          >
            <UInput
              v-model="state.name"
              :ui="{ base: 'py-4 px-6' }"
              :class="[
                'w-full transition-colors',
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black',
              ]"
            />
          </UFormField>

          <UFormField
            v-slot="{ error }"
            label="Description"
            name="description"
            required
            :ui="{ error: 'text-red-500 text-sm mt-1' }"
          >
            <UInput
              v-model="state.description"
              :ui="{ base: 'py-4 px-6' }"
              :class="[
                'w-full transition-colors',
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black',
              ]"
            />
          </UFormField>

          <UFormField
            v-slot="{ error }"
            label="Slug"
            name="slug"
            hint="eg: cars, roses"
            required
            :ui="{ error: 'text-red-500 text-sm mt-1' }"
          >
            <UInput
              v-model="state.slug"
              :ui="{ base: 'py-4 px-6' }"
              :class="[
                'w-full transition-colors',
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black',
              ]"
            />
          </UFormField>

          <div class="flex justify-between items-center">
            <UButton
              type="submit"
              class="dark:text-white/90 py-3 px-4"
              :loading="loading"
              :disabled="loading"
            >
              Continue
            </UButton>
            <UButton
              variant="subtle"
              :color="colorMode.toString() === 'dark' ? 'red-500' : 'muted'"
              class="dark:text-white/90 py-3 px-4"
              @click="resetForm"
            >
              Clear form
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <AppContentButton
      v-show="nullMarketplaces === false"
      class="fixed bottom-12 right-20"
      @click="openForm = true"
    />
  </div>
</template>

<style scoped></style>
