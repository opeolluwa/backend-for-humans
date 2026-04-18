<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const stats = [
  {
    label: "Enrolled Courses",
    badge: "Active",
    value: 22,
    progress: 55,
    showProgress: true,
    action: null,
    icon: "heroicons:book-open",
  },
  {
    label: "Total Assignments",
    badge: null,
    value: 32,
    showProgress: false,
    action: "View All",
    icon: "heroicons:clipboard-document-list",
  },
  {
    label: "Completed Courses",
    badge: null,
    value: 11,
    showProgress: false,
    action: "View Courses",
    icon: "heroicons:academic-cap",
  },
  {
    label: "Upcoming Quiz",
    badge: null,
    value: "7 Days",
    showProgress: false,
    action: "View Schedule",
    icon: "heroicons:calendar-days",
  },
];

// Bar chart — days of week
const chartDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const chartValues = [30, 60, 45, 90, 55, 25, 40];
const chartMax = Math.max(...chartValues);
const activeDay = ref(3); // Thursday

function barHeight(val: number) {
  return Math.round((val / chartMax) * 100);
}

const chartTabs = ["Daily", "Weekly", "Monthly"];
const activeTab = ref("Daily");

// Online classes
const onlineClasses = [
  {
    subject: "PH",
    name: "Physics",
    subtitle: "Motion and Velocity",
    time: "02:15:45",
    progress: 88,
    color: "bg-blue-500",
  },
  {
    subject: "LT",
    name: "Literature",
    subtitle: "Shakespeare's Sonnets",
    time: "03:10:22",
    progress: 85,
    color: "bg-purple-500",
  },
];

// Assignment breakdown
const breakdown = [
  { label: "Total Submitted", value: 60, color: "bg-brand" },
  { label: "In Review", value: 25, color: "bg-amber-400" },
  { label: "Remaining Assignment", value: 15, color: "bg-gray-200 dark:bg-white/10" },
];
</script>

<template>
  <div class="space-y-6">

    <!-- Stat cards row -->
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5"
      >
        <!-- Top: icon + label + badge -->
        <div class="flex items-center gap-2 mb-4">
          <div class="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand/10 flex items-center justify-center shrink-0">
            <UIcon :name="stat.icon" class="size-3.5 text-brand" />
          </div>
          <span class="text-xs font-medium text-gray-500 dark:text-white/40 truncate">
            {{ stat.label }}
          </span>
          <span
            v-if="stat.badge"
            class="ml-auto shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand/10 text-brand"
          >
            {{ stat.badge }}
          </span>
        </div>

        <!-- Value -->
        <p class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ stat.value }}
        </p>

        <!-- Progress bar -->
        <div v-if="stat.showProgress" class="mt-3">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs text-gray-400 dark:text-white/30">Progress</span>
            <span class="text-xs font-semibold text-gray-500 dark:text-white/50">{{ stat.progress }}%</span>
          </div>
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-white/10">
            <div
              class="h-full rounded-full bg-brand transition-all"
              :style="{ width: `${stat.progress}%` }"
            />
          </div>
        </div>

        <!-- Action link -->
        <div v-else-if="stat.action" class="mt-3">
          <button class="flex items-center gap-1 text-xs text-gray-400 dark:text-white/30 hover:text-brand transition-colors group">
            {{ stat.action }}
            <UIcon name="heroicons:arrow-right" class="size-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>

    <!-- Chart + right panel -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- Report Analytics bar chart -->
      <div class="xl:col-span-2 bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-5">
          <p class="text-sm font-semibold text-gray-700 dark:text-white/80">
            Report Analytics
          </p>
          <div class="flex items-center gap-1 bg-gray-50 dark:bg-white/5 rounded-lg p-1">
            <button
              v-for="tab in chartTabs"
              :key="tab"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all"
              :class="activeTab === tab
                ? 'bg-white dark:bg-brand-dark-500 text-gray-800 dark:text-white shadow-sm'
                : 'text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/50'"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <!-- Y-axis + bars -->
        <div class="flex gap-3">
          <div class="flex flex-col justify-between h-40 text-right pr-1 shrink-0">
            <span class="text-[10px] text-gray-300 dark:text-white/20">24h</span>
            <span class="text-[10px] text-gray-300 dark:text-white/20">18h</span>
            <span class="text-[10px] text-gray-300 dark:text-white/20">12h</span>
            <span class="text-[10px] text-gray-300 dark:text-white/20">6h</span>
            <span class="text-[10px] text-gray-300 dark:text-white/20">0h</span>
          </div>

          <div class="flex-1 flex items-end gap-2 h-40">
            <div
              v-for="(val, i) in chartValues"
              :key="chartDays[i]"
              class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
            >
              <div
                v-if="i === activeDay"
                class="bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-md"
              >
                {{ val }}h
              </div>
              <div
                class="w-full rounded-md cursor-pointer transition-all"
                :class="i === activeDay
                  ? 'bg-brand'
                  : 'bg-brand-100 dark:bg-brand/20 hover:bg-brand/40'"
                :style="{ height: `${barHeight(val)}%` }"
                @click="activeDay = i"
              />
              <span class="text-[10px] text-gray-400 dark:text-white/25 font-medium">
                {{ chartDays[i] }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right panel -->
      <div class="flex flex-col gap-4">

        <!-- Online Classes -->
        <div class="flex-1 bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-semibold text-gray-700 dark:text-white/80">
              Online Classes
            </p>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand/10 text-brand">
              3 Ongoing
            </span>
          </div>

          <div class="space-y-3">
            <div
              v-for="cls in onlineClasses"
              :key="cls.name"
              class="flex items-center gap-3"
            >
              <!-- Subject avatar -->
              <div
                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold"
                :class="cls.color"
              >
                {{ cls.subject }}
              </div>

              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-800 dark:text-white/90 truncate">
                  {{ cls.name }}
                </p>
                <p class="text-[10px] text-gray-400 dark:text-white/30 truncate">
                  {{ cls.subtitle }}
                </p>
              </div>

              <div class="shrink-0 text-right">
                <p class="text-xs font-semibold text-gray-600 dark:text-white/60 font-mono">
                  {{ cls.time }}
                </p>
                <div class="flex items-center justify-end gap-1 mt-0.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span class="text-[10px] text-brand">{{ cls.progress }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Assignment Breakdown -->
        <div class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-semibold text-gray-700 dark:text-white/80">
              Assignment Breakdown
            </p>
            <UIcon name="heroicons:information-circle" class="size-4 text-gray-300 dark:text-white/20" />
          </div>

          <!-- Stacked bar -->
          <div class="flex h-2.5 rounded-full overflow-hidden gap-px">
            <div
              v-for="seg in breakdown"
              :key="seg.label"
              class="h-full transition-all"
              :class="seg.color"
              :style="{ width: `${seg.value}%` }"
            />
          </div>

          <!-- Legend -->
          <div class="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
            <div
              v-for="seg in breakdown"
              :key="seg.label"
              class="flex items-center gap-1.5"
            >
              <div class="w-2 h-2 rounded-full shrink-0" :class="seg.color" />
              <span class="text-[10px] text-gray-400 dark:text-white/30">{{ seg.label }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped></style>
