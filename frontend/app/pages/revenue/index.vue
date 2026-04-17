<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:banknotes",
    ariaLabel: "Revenue",
    title: "Revenue",
  },
});

// ─── Stats ────────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Total Revenue",
    value: "$0",
    trend: "+0%",
    up: true,
    icon: "heroicons:banknotes",
    desc: "All time",
  },
  {
    label: "Monthly Recurring",
    value: "$0",
    trend: "+0%",
    up: true,
    icon: "heroicons:arrow-path",
    desc: "MRR",
  },
  {
    label: "Annual Recurring",
    value: "$0",
    trend: "+0%",
    up: true,
    icon: "heroicons:calendar-days",
    desc: "ARR",
  },
  {
    label: "Avg. Order Value",
    value: "$0",
    trend: "+0%",
    up: true,
    icon: "heroicons:receipt-percent",
    desc: "Per transaction",
  },
];

// ─── Chart mock ───────────────────────────────────────────────────────────────

const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const chartValues = [0, 0, 0, 0, 0, 0];
const chartMax = Math.max(...chartValues, 1);

function barHeight(val: number) {
  return Math.max(Math.round((val / chartMax) * 100), 4);
}

// ─── Revenue sources ──────────────────────────────────────────────────────────

const sources = [
  { label: "Marketplace sales",  pct: 0, color: "bg-brand" },
  { label: "Subscriptions",      pct: 0, color: "bg-brand-300" },
  { label: "One-time purchases", pct: 0, color: "bg-brand-100 dark:bg-brand/30" },
  { label: "Other",              pct: 0, color: "bg-gray-200 dark:bg-white/10" },
];

// ─── Transactions ─────────────────────────────────────────────────────────────

interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: string;
  status: "completed" | "pending" | "failed";
}

const transactions: Transaction[] = [];
const hasTransactions = computed(() => transactions.length > 0);
</script>

<template>
  <div class="space-y-8">

    <!-- Greeting row -->
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-1">
        Revenue
      </p>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Revenue overview
      </h1>
      <p class="text-sm text-gray-400 dark:text-white/40 mt-1">
        Track income, transactions, and revenue streams.
      </p>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5 flex flex-col gap-4"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500 dark:text-white/40 font-medium">{{ stat.label }}</span>
          <div class="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand/10 flex items-center justify-center">
            <UIcon :name="stat.icon" class="size-4 text-brand" />
          </div>
        </div>
        <div>
          <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
          <div class="flex items-center gap-1.5 mt-1.5">
            <UIcon
              :name="stat.up ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'"
              :class="stat.up ? 'text-brand' : 'text-red-500'"
              class="size-3.5"
            />
            <span :class="stat.up ? 'text-brand' : 'text-red-500'" class="text-xs font-semibold">
              {{ stat.trend }}
            </span>
            <span class="text-xs text-gray-400 dark:text-white/25">{{ stat.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart + sources -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Bar chart -->
      <div class="xl:col-span-2 bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-6">
          <div>
            <p class="text-sm font-semibold text-gray-700 dark:text-white/80">Revenue over time</p>
            <p class="text-xs text-gray-400 dark:text-white/30 mt-0.5">Last 6 months</p>
          </div>
        </div>

        <div class="flex items-end gap-3 h-36">
          <template v-for="(val, i) in chartValues" :key="chartMonths[i]">
            <div class="flex-1 flex flex-col items-center gap-1.5">
              <div
                class="w-full rounded-md transition-all"
                :class="i === chartValues.length - 1 ? 'bg-brand' : 'bg-brand-100 dark:bg-brand/20'"
                :style="{ height: `${barHeight(val)}%` }"
              />
              <span class="text-[9px] text-gray-400 dark:text-white/25 font-medium">
                {{ chartMonths[i] }}
              </span>
            </div>
          </template>
        </div>
      </div>

      <!-- Revenue by source -->
      <div class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
        <p class="text-sm font-semibold text-gray-700 dark:text-white/80 mb-1">By source</p>
        <p class="text-xs text-gray-400 dark:text-white/30 mb-5">Revenue breakdown</p>

        <div class="space-y-4">
          <div v-for="source in sources" :key="source.label">
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full shrink-0" :class="source.color" />
                <span class="text-xs text-gray-600 dark:text-white/50">{{ source.label }}</span>
              </div>
              <span class="text-xs font-medium text-gray-700 dark:text-white/60">{{ source.pct }}%</span>
            </div>
            <div class="h-1.5 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="source.color"
                :style="{ width: `${source.pct}%` }"
              />
            </div>
          </div>
        </div>

        <!-- Source empty -->
        <div
          v-if="sources.every(s => s.pct === 0)"
          class="mt-6 flex flex-col items-center gap-2 text-center"
        >
          <p class="text-xs text-gray-400 dark:text-white/25">No revenue data yet.</p>
        </div>
      </div>
    </div>

    <!-- Transactions -->
    <div class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
      <div class="flex items-center justify-between mb-5">
        <div>
          <p class="text-sm font-semibold text-gray-700 dark:text-white/80">Recent transactions</p>
          <p class="text-xs text-gray-400 dark:text-white/30 mt-0.5">Latest incoming payments</p>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="!hasTransactions"
        class="flex flex-col items-center justify-center py-12 gap-4 text-center"
      >
        <div class="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
          <UIcon name="heroicons:banknotes" class="size-7 text-gray-300 dark:text-white/20" />
        </div>
        <div>
          <p class="font-medium text-sm text-gray-700 dark:text-white/50">No transactions yet</p>
          <p class="text-xs text-muted mt-1">Transactions will appear here once payments come in.</p>
        </div>
      </div>

      <!-- Transaction list -->
      <div v-else class="divide-y divide-gray-50 dark:divide-white/5">
        <div
          v-for="tx in transactions"
          :key="tx.id"
          class="flex items-center gap-4 py-3"
        >
          <div class="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand/10 flex items-center justify-center shrink-0">
            <UIcon name="heroicons:banknotes" class="size-4 text-brand" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-800 dark:text-white/90 truncate">{{ tx.description }}</p>
            <p class="text-xs text-gray-400 dark:text-white/30">{{ tx.date }}</p>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-sm font-semibold text-gray-800 dark:text-white/80">{{ tx.amount }}</span>
            <span
              class="text-xs rounded-full px-2.5 py-0.5 font-medium"
              :class="{
                'bg-brand-50 dark:bg-brand/10 text-brand dark:text-brand-300': tx.status === 'completed',
                'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400': tx.status === 'pending',
                'bg-red-50 dark:bg-red-500/10 text-red-500': tx.status === 'failed',
              }"
            >
              {{ tx.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
