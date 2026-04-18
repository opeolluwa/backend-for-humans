<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:bell",
    ariaLabel: "Notifications",
    title: "Notifications",
  },
});

type FilterKey = "all" | "unread" | "courses" | "system";

const activeFilter = ref<FilterKey>("all");

const filters: { key: FilterKey; label: string }[] = [
  { key: "all",     label: "All"     },
  { key: "unread",  label: "Unread"  },
  { key: "courses", label: "Courses" },
  { key: "system",  label: "System"  },
];

interface Notification {
  id: number;
  type: "courses" | "system";
  icon: string;
  iconBg: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const notifications = reactive<Notification[]>([
  {
    id: 1,
    type: "courses",
    icon: "heroicons:academic-cap",
    iconBg: "bg-brand",
    title: "New module available",
    body: "Module 5 of \"Advanced JavaScript Patterns\" has been published.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "system",
    icon: "heroicons:shield-check",
    iconBg: "bg-emerald-500",
    title: "New sign-in detected",
    body: "A new sign-in was detected from macOS · Safari. Not you? Secure your account.",
    time: "12 min ago",
    read: false,
  },
  {
    id: 3,
    type: "courses",
    icon: "heroicons:clipboard-document-check",
    iconBg: "bg-amber-500",
    title: "Assignment graded",
    body: "Your submission for\"Wave-particle duality\" received a score of 91/100.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "courses",
    icon: "heroicons:calendar-days",
    iconBg: "bg-purple-500",
    title: "Quiz starting soon",
    body: "Your \"Linear Algebra\" quiz begins in 30 minutes. Good luck!",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "system",
    icon: "heroicons:megaphone",
    iconBg: "bg-blue-500",
    title: "Platform update",
    body: "We've rolled out dark mode improvements and faster page loads.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "courses",
    icon: "heroicons:trophy",
    iconBg: "bg-yellow-500",
    title: "Course completed",
    body: "Congratulations! You've completed \"Introduction to Quantum Mechanics\".",
    time: "2 days ago",
    read: true,
  },
  {
    id: 7,
    type: "system",
    icon: "heroicons:envelope",
    iconBg: "bg-rose-500",
    title: "Weekly digest",
    body: "You studied 4h 20m this week — up 18 % from last week. Keep it up!",
    time: "3 days ago",
    read: true,
  },
]);

const unreadCount = computed(() => notifications.filter((n) => !n.read).length);

const visible = computed(() => {
  if (activeFilter.value === "unread") return notifications.filter((n) => !n.read);
  if (activeFilter.value === "courses") return notifications.filter((n) => n.type === "courses");
  if (activeFilter.value === "system") return notifications.filter((n) => n.type === "system");
  return notifications;
});

function markRead(id: number) {
  const n = notifications.find((n) => n.id === id);
  if (n) n.read = true;
}

function markAllRead() {
  notifications.forEach((n) => (n.read = true));
}

function dismiss(id: number) {
  const idx = notifications.findIndex((n) => n.id === id);
  if (idx !== -1) notifications.splice(idx, 1);
}
</script>

<template>
  <div class="max-w-2xl space-y-5">

    <!-- Header -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2.5">
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h1>
        <span
          v-if="unreadCount"
          class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand text-white"
        >
          {{ unreadCount }}
        </span>
      </div>

      <button
        v-if="unreadCount"
        class="text-xs font-medium text-brand hover:underline transition-colors"
        @click="markAllRead"
      >
        Mark all as read
      </button>
    </div>

    <!-- Filter tabs -->
    <div class="flex items-center gap-1 bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-xl p-1 w-fit">
      <button
        v-for="f in filters"
        :key="f.key"
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
        :class="activeFilter === f.key
          ? 'bg-brand text-white shadow-sm'
          : 'text-gray-500 dark:text-white/40 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- List -->
    <div
      v-if="visible.length"
      class="bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl divide-y divide-gray-100 dark:divide-white/5 overflow-hidden"
    >
      <div
        v-for="item in visible"
        :key="item.id"
        class="group flex items-start gap-4 px-5 py-4 transition-colors"
        :class="!item.read ? 'bg-brand-50/40 dark:bg-brand/5' : 'hover:bg-gray-50 dark:hover:bg-white/2'"
      >
        <!-- Icon -->
        <div
          class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white mt-0.5"
          :class="item.iconBg"
        >
          <UIcon :name="item.icon" class="size-4" />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
              {{ item.title }}
              <span
                v-if="!item.read"
                class="inline-block w-1.5 h-1.5 rounded-full bg-brand align-middle ml-1.5 mb-0.5"
              />
            </p>
            <span class="shrink-0 text-[10px] text-gray-300 dark:text-white/20 mt-0.5">{{ item.time }}</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-white/40 mt-0.5 leading-relaxed">
            {{ item.body }}
          </p>

          <!-- Actions -->
          <div class="flex items-center gap-3 mt-2">
            <button
              v-if="!item.read"
              class="text-[10px] font-medium text-brand hover:underline"
              @click="markRead(item.id)"
            >
              Mark as read
            </button>
            <button
              class="text-[10px] font-medium text-gray-400 dark:text-white/25 hover:text-red-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              @click="dismiss(item.id)"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl"
    >
      <div class="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-3">
        <UIcon name="heroicons:bell-slash" class="size-5 text-gray-300 dark:text-white/20" />
      </div>
      <p class="text-sm font-semibold text-gray-700 dark:text-white/60">All caught up</p>
      <p class="text-xs text-gray-400 dark:text-white/25 mt-1">No notifications to show here.</p>
    </div>

  </div>
</template>

<style scoped></style>
