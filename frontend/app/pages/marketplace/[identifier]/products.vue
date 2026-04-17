<script lang="ts" setup>
import api from "~/plugin/api";
import type { MarketplaceWithProducts } from "../../../../../bindings/MarketplaceWithProducts";
import { useCountryStore } from "~/stores/country";

import { z } from "zod";

const route = useRoute();
const identifier = route.params.identifier;

const openForm = ref(false);
const state = reactive({
  name: "",
  price: 0,
  description: "",
  picture: null,
  currencyIdentifier: "",
});

const currencyOptions = computed(
  () =>
    countries.value.map((country) => ({
      label: `${country.currency} (${country.country})`,
      value: country.identifier,
      avatar: { src: country.flag },
    })) as Array<{ label: string; value: string; avatar: { src: string } }>,
);

const countryStore = useCountryStore();

const loading = ref(false);

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
  picture: z.any().optional(),
  currencyIdentifier: z.string().min(1, "Currency is required"),
});

const resetForm = () => {
  state.name = "";
  state.description = "";
  state.price = 0;
  state.picture = null;
  state.currencyIdentifier = "";
};

definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:cube",
    ariaLabel: "Marketplace Products",
    title: "Marketplace Products",
  },
});

const onSubmit = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", state.price.toString());
    formData.append("currencyIdentifier", state.currencyIdentifier);
    if (state.picture) {
      formData.append("picture", state.picture);
    }

    const { data: response, status } = await api.post(
      `/marketplaces/${identifier}/products`,
      formData,
    );
    if (status !== 201) {
      throw new Error(response?.message || "Product creation failed");
    }
    resetForm();
    openForm.value = false;
  } catch (error) {
    console.log({ error });
  } finally {
    loading.value = false;
  }
};

const marketplaceWithProducts = ref<MarketplaceWithProducts>();

onMounted(async () => {
  try {
    await countryStore.fetchCountries();

    const { data: response, status } = await api.get(
      `/marketplaces/${identifier}/products`,
    );
    if (status !== 200) {
      throw new Error(response?.message || "Login failed");
    }
    marketplaceWithProducts.value = response.data;
    return;
  } catch (error) {
    console.log({ error });
  }
});

const countries = computed(() => countryStore.countries);
</script>

<template>
  <div class="space-y-4 space-x-4 flex flex-wrap">
    <!-- <h1>Products for {{ identifier }} {{ marketplaceWithProducts }}</h1> -->
    <UPageCard
      v-for="value in marketplaceWithProducts?.products"
      :key="value.identifier"
      class="w-64 bg-white rounded-xl shadow-sm p-2 hover:shadow-md transition"
    >
      <template #default>
        <div class="flex flex-col gap-3">
          <!-- Product Image -->
          <div
            class="bg-gray-100 rounded-xl flex items-center justify-center p-2"
          >
            <img
              :src="String(value.picture)"
              class="rounded-xl w-40 h-32 object-cover"
            />
          </div>

          <!-- Name -->
          <p class="text-gray-900 font-semibold text-base truncate">
            {{ value.name }}
          </p>

          <!-- Category (use your description or static category) -->
          <p class="text-gray-500 text-sm -mt-2">
            {{ value.description }}
          </p>

          <!-- Price Row -->
          <div class="flex justify-between items-center mt-1">
            <p class="text-gray-900 font-bold text-lg">
              {{ value.price }}
            </p>

            <div class="flex items-center gap-1">
              <span class="text-gray-700 text-sm">
                {{ value.currencyCode }}
              </span>
              <img
                :src="String(value.flag)"
                class="h-4 w-4 rounded-sm object-cover"
              />
            </div>
          </div>
        </div>
      </template>
    </UPageCard>

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
          <UFileUpload v-model="state.picture" class="w-full min-h-48" />

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

          <div class="flex justify-between gap-x-2">
            <UFormField
              v-slot="{ error }"
              label="Pice"
              name="Price"
              required
              :ui="{ error: 'text-red-500 text-sm mt-1' }"
            >
              <UInputNumber
                v-model="state.price"
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
              label="Currency"
              name="currency"
              required
              class="w-full"
              :ui="{ error: 'text-red-500 text-sm mt-1' }"
            >
              <USelect
                v-model="state.currencyIdentifier"
                :items="currencyOptions"
                :ui="{ base: 'py-4 px-6', viewport: '', content: 'w-60' }"
                :class="[
                  'w-full transition-colors',
                  error
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-black',
                ]"
              />
            </UFormField>
          </div>

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
      class="fixed bottom-12 right-20"
      @click="openForm = true"
    />
  </div>
</template>
