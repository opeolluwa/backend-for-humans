<script setup lang="ts">
import * as v from "valibot";
import useLogout from "~/composables/useLogout";

const items = useBreadcrumbItems();

const searchInputRef = ref<HTMLInputElement | null>(null);

const isMac =
  typeof navigator !== "undefined" &&
  /mac|iphone|ipad|ipod/i.test(navigator.userAgent);

function focusSearch(e: KeyboardEvent) {
  const isTrigger =
    e.key === "f" && (isMac ? e.metaKey : e.ctrlKey) && !e.shiftKey;
  if (!isTrigger) return;
  e.preventDefault();
  searchInputRef.value?.focus();
}

onMounted(() => window.addEventListener("keydown", focusSearch));
onUnmounted(() => window.removeEventListener("keydown", focusSearch));

interface Route {
  label: string;
  icon: string;
  path: string;
}

interface Divider {
  divider: true;
  label?: string;
}

type RouteItem = Route | Divider;

const routes: RouteItem[] = [
  {
    label: "Dashboard",
    path: "/home",
    icon: "heroicons:squares-2x2",
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: "heroicons:calendar-days",
  },
  {
    divider: true,
    label: "Operations",
  },
  {
    label: "Messages",
    path: "/messages",
    icon: "heroicons:envelope",
  },
  {
    label: "Marketplace",
    path: "/marketplace",
    icon: "heroicons:building-storefront",
  },
  {
    label: "Uploads",
    path: "/uploads",
    icon: "heroicons:arrow-up-tray",
  },
  {
    label: "Metrics",
    path: "/metrics",
    icon: "heroicons:chart-bar-square",
  },
  {
    label: "Revenue",
    path: "/revenue",
    icon: "heroicons:banknotes",
  },
  {
    divider: true,
    label: "Workspace",
  },
  {
    label: "Team",
    path: "/teams",
    icon: "heroicons:users",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: "heroicons:cog-6-tooth",
  },
];

const schema = v.object({
  query: v.pipe(v.string()),
});

const state = reactive({
  query: "",
});

const logout = async () => useLogout();
const getKey = (item: RouteItem) =>
  "divider" in item ? `div-${item.label ?? Math.random()}` : item.path;
</script>

<template>
  <div class="flex h-screen bg-gray-50 dark:bg-brand-dark-500">
    <!-- Sidebar -->
    <aside
      class="w-60 shrink-0 flex flex-col bg-white dark:bg-brand-dark-600 border-r border-gray-100 dark:border-white/5"
    >
      <!-- Brand mark -->
      <div class="px-5 py-5 border-b border-gray-100 dark:border-white/5">
        <AppLogo />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto">
        <template v-for="item in routes" :key="getKey(item)">
          <!-- Section label -->
          <template v-if="'divider' in item">
            <div class="pt-5 pb-2 px-2">
              <p
                v-if="item.label"
                class="text-[9px] font-semibold uppercase tracking-widest text-gray-400 dark:text-white/25"
              >
                {{ item.label }}
              </p>
            </div>
          </template>

          <!-- Nav link -->
          <template v-else>
            <NuxtLink
              :href="item.path"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 dark:text-white/40 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all mb-0.5"
              active-class="!text-brand dark:!text-brand-300 !bg-brand-50 dark:!bg-brand/10 font-medium"
            >
              <UIcon :name="item.icon" class="size-4 shrink-0" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </template>
        </template>
      </nav>

      <!-- Sign out -->
      <div class="px-3 pb-4 pt-3 border-t border-gray-100 dark:border-white/5">
        <button
          class="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 dark:text-white/25 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer"
          @click="logout"
        >
          <UIcon
            name="heroicons:arrow-left-start-on-rectangle"
            class="size-4 shrink-0"
          />
          <span>Sign out</span>
        </button>
      </div>
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <header
        class="flex items-center justify-between px-8 py-3.5 bg-white dark:bg-brand-dark-600 border-b border-gray-100 dark:border-white/5 shrink-0"
      >
        <UForm :schema="schema" :state="state" class="w-80">
          <UFormField name="query">
            <UInput
              :ref="(el: any) => (searchInputRef = el?.$el?.querySelector('input') ?? null)"
              v-model="state.query"
              placeholder="Search..."
              icon="heroicons:magnifying-glass"
              variant="outline"
              class="w-full"
              @keydown.escape="state.query = ''; ($event.target as HTMLInputElement).blur()"
            >
              <template #trailing>
                <kbd
                  class="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/10 text-[10px] font-medium text-gray-400 dark:text-white/30 bg-gray-50 dark:bg-white/5 select-none"
                >
                  {{ isMac ? "⌘" : "Ctrl" }}F
                </kbd>
              </template>
            </UInput>
          </UFormField>
        </UForm>

        <div class="flex items-center gap-4">
          <UIcon name="heroicons:bell" class="_icon" />
          <UColorModeButton />
          <NuxtLink to="/account">
            <UserCard />
          </NuxtLink>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto">
        <div class="px-8 pt-5">
          <UBreadcrumb
            :hide-non-existing="true"
            :hide-root="true"
            :items="items"
          >
            <template #separator>
              <span class="mx-2 text-gray-300 dark:text-white/20">/</span>
            </template>
          </UBreadcrumb>
        </div>
        <div class="px-8 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
