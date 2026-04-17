<script setup lang="ts">
import { useUserInformationStore } from "~/stores/user";
import { useMarketplaceStore } from "~/stores/marketplace";

definePageMeta({
  layout: "dashboard",
});

const userStore = useUserInformationStore();
const marketplaceStore = useMarketplaceStore();

onMounted(async () => {
  await marketplaceStore.fetchMarketplaces();
});

const firstName = computed(() => userStore.userFirstName || "there");
const marketplaces = computed(() => marketplaceStore.marketplaces);
const totalMarketplaces = computed(() => marketplaces.value.length);

// Stat cards — real where available, indicative elsewhere
const stats = computed(() => [
  {
    label: "Marketplaces",
    value: totalMarketplaces.value,
    trend: "+12.4%",
    up: true,
    icon: "heroicons:building-storefront",
    color: "brand",
  },
  {
    label: "Total Products",
    value: 0,
    trend: "+8.1%",
    up: true,
    icon: "heroicons:tag",
    color: "brand",
  },
  {
    label: "Team Members",
    value: 0,
    trend: "0%",
    up: true,
    icon: "heroicons:users",
    color: "brand",
  },
  {
    label: "Active Tasks",
    value: 0,
    trend: "+3.7%",
    up: true,
    icon: "heroicons:clipboard-document-check",
    color: "brand",
  },
]);

// Bar chart mock data — monthly activity (Jan–Jun)
const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const chartValues = [42, 68, 55, 80, 63, 91];
const chartMax = Math.max(...chartValues);

function barHeight(val: number) {
  return Math.round((val / chartMax) * 100);
}

// Quick links
const quickLinks = [
  { label: "Marketplace", path: "/marketplace", icon: "heroicons:building-storefront" },
  { label: "Uploads", path: "/uploads", icon: "heroicons:arrow-up-tray" },
  { label: "Team", path: "/teams", icon: "heroicons:users" },
  { label: "Metrics", path: "/metrics", icon: "heroicons:chart-bar-square" },
  { label: "Calendar", path: "/calendar", icon: "heroicons:calendar-days" },
  { label: "Settings", path: "/settings", icon: "heroicons:cog-6-tooth" },
];

// Recent marketplaces — latest 5
const recentMarketplaces = computed(() =>
  [...marketplaces.value]
    .sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    })
    .slice(0, 5),
);

function formatDate(dt?: string | null) {
  if (!dt) return "—";
  return new Date(dt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
</script>

<template>
  <div class="space-y-8">

    <!-- Greeting row -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-1">
          Dashboard
        </p>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Hi, {{ firstName }} 👋
        </h1>
        <p class="text-sm text-gray-400 dark:text-white/40 mt-1">
          Here's what's happening across your workspace today.
        </p>
      </div>
    
    </div>

    <!-- Stat cards + chart -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Stat cards (2/3 width) -->
      <div class="xl:col-span-2 grid grid-cols-2 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5 flex flex-col gap-4"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-white/40 font-medium">
              {{ stat.label }}
            </span>
            <div class="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand/10 flex items-center justify-center">
              <UIcon :name="stat.icon" class="size-4 text-brand" />
            </div>
          </div>
          <div>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ stat.value.toLocaleString() }}
            </p>
            <div class="flex items-center gap-1.5 mt-1.5">
              <UIcon
                :name="stat.up ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'"
                :class="stat.up ? 'text-brand' : 'text-red-500'"
                class="size-3.5"
              />
              <span
                :class="stat.up ? 'text-brand' : 'text-red-500'"
                class="text-xs font-semibold"
              >
                {{ stat.trend }}
              </span>
              <span class="text-xs text-gray-400 dark:text-white/25">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity chart (1/3 width) -->
      <div class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-semibold text-gray-700 dark:text-white/80">
            Activity
          </p>
          <span class="text-xs text-gray-400 dark:text-white/30">Last 6 months</span>
        </div>

        <!-- Bar chart -->
        <div class="flex items-end gap-2 h-28">
          <template v-for="(val, i) in chartValues" :key="chartMonths[i]">
            <div class="flex-1 flex flex-col items-center gap-1">
              <div
                class="w-full rounded-md transition-all"
                :class="i === chartValues.length - 1
                  ? 'bg-brand'
                  : 'bg-brand-100 dark:bg-brand/20'"
                :style="{ height: `${barHeight(val)}%` }"
              />
              <span class="text-[9px] text-gray-400 dark:text-white/25 font-medium">
                {{ chartMonths[i] }}
              </span>
            </div>
          </template>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
          <div>
            <p class="text-lg font-bold text-gray-900 dark:text-white">
              {{ chartValues[chartValues.length - 1] }}
            </p>
            <p class="text-xs text-gray-400 dark:text-white/30">
              entries this month
            </p>
          </div>
          <div class="flex items-center gap-1">
            <UIcon name="heroicons:arrow-trending-up" class="size-3.5 text-brand" />
            <span class="text-xs font-semibold text-brand">+44%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick links + Recent marketplaces -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Quick links -->
      <div class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
        <p class="text-sm font-semibold text-gray-700 dark:text-white/80 mb-4">
          Quick access
        </p>
        <div class="grid grid-cols-3 gap-3">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-brand/10 hover:text-brand group transition-all"
          >
            <UIcon
              :name="link.icon"
              class="size-5 text-gray-400 dark:text-white/30 group-hover:text-brand transition-colors"
            />
            <span class="text-[10px] font-medium text-gray-500 dark:text-white/40 group-hover:text-brand transition-colors text-center leading-tight">
              {{ link.label }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Recent marketplaces -->
      <div class="xl:col-span-2 bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-semibold text-gray-700 dark:text-white/80">
            Recent stores
          </p>
          <NuxtLink
            to="/marketplace"
            class="text-xs text-brand hover:text-brand-600 dark:text-brand-300 font-medium transition-colors"
          >
            View all
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div
          v-if="recentMarketplaces.length === 0"
          class="flex flex-col items-center justify-center py-10 gap-3 text-center"
        >
          <div class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
            <UIcon name="heroicons:building-storefront" class="size-5 text-gray-300 dark:text-white/20" />
          </div>
          <p class="text-sm text-gray-400 dark:text-white/30">
            No stores yet.
            <NuxtLink to="/marketplace" class="text-brand hover:underline ml-1">Create one →</NuxtLink>
          </p>
        </div>

        <!-- Marketplace list -->
        <div v-else class="divide-y divide-gray-50 dark:divide-white/5">
          <div
            v-for="mp in recentMarketplaces"
            :key="mp.identifier"
            class="flex items-center gap-4 py-3"
          >
            <!-- Avatar -->
            <div class="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand/10 flex items-center justify-center shrink-0">
              <UIcon name="heroicons:building-storefront" class="size-4 text-brand" />
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-white/90 truncate">
                {{ mp.name }}
              </p>
              <p class="text-xs text-gray-400 dark:text-white/30 truncate">
                /{{ mp.slug }}
              </p>
            </div>

            <!-- Date + action -->
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs text-gray-400 dark:text-white/25">
                {{ formatDate(mp.createdAt) }}
              </span>
              <NuxtLink :to="`/marketplace/${mp.identifier}/products`">
                <UButton
                  icon="heroicons:arrow-right"
                  size="xs"
                  color="neutral"
                  variant="ghost"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
