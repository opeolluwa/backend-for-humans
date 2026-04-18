<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:bookmark",
    ariaLabel: "Bookmarks",
    title: "Bookmarks",
  },
});

type BookmarkCategory = "all" | "courses" | "lessons" | "articles";

const activeCategory = ref<BookmarkCategory>("all");

const categories: { key: BookmarkCategory; label: string }[] = [
  { key: "all",      label: "All"      },
  { key: "courses",  label: "Courses"  },
  { key: "lessons",  label: "Lessons"  },
  { key: "articles", label: "Articles" },
];

interface Bookmark {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<BookmarkCategory, "all">;
  tag: string;
  tagColor: string;
  progress?: number;
  icon: string;
  iconBg: string;
  savedAt: string;
}

const bookmarks: Bookmark[] = [
  {
    id: 1,
    title: "Introduction to Quantum Mechanics",
    subtitle: "Chapter 3 · Wave-particle duality",
    category: "lessons",
    tag: "Lesson",
    tagColor: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300",
    progress: 42,
    icon: "heroicons:beaker",
    iconBg: "bg-purple-500",
    savedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    subtitle: "12 modules · 8h 30m total",
    category: "courses",
    tag: "Course",
    tagColor: "bg-brand-50 dark:bg-brand/10 text-brand dark:text-brand-300",
    progress: 68,
    icon: "heroicons:code-bracket",
    iconBg: "bg-yellow-500",
    savedAt: "3 days ago",
  },
  {
    id: 3,
    title: "Understanding Neural Networks",
    subtitle: "A visual guide to deep learning",
    category: "articles",
    tag: "Article",
    tagColor: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300",
    icon: "heroicons:cpu-chip",
    iconBg: "bg-rose-500",
    savedAt: "5 days ago",
  },
  {
    id: 4,
    title: "Linear Algebra for Machine Learning",
    subtitle: "9 modules · 6h 15m total",
    category: "courses",
    tag: "Course",
    tagColor: "bg-brand-50 dark:bg-brand/10 text-brand dark:text-brand-300",
    progress: 15,
    icon: "heroicons:variable",
    iconBg: "bg-blue-500",
    savedAt: "1 week ago",
  },
  {
    id: 5,
    title: "Shakespeare's Use of Metaphor",
    subtitle: "Chapter 7 · Comparative analysis",
    category: "lessons",
    tag: "Lesson",
    tagColor: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300",
    progress: 90,
    icon: "heroicons:book-open",
    iconBg: "bg-emerald-500",
    savedAt: "1 week ago",
  },
  {
    id: 6,
    title: "The Science of Memory Retention",
    subtitle: "How spaced repetition improves recall",
    category: "articles",
    tag: "Article",
    tagColor: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300",
    icon: "heroicons:light-bulb",
    iconBg: "bg-amber-500",
    savedAt: "2 weeks ago",
  },
];

const query = ref("");

const filtered = computed(() => {
  let list = bookmarks;
  if (activeCategory.value !== "all") {
    list = list.filter((b) => b.category === activeCategory.value);
  }
  if (query.value.trim()) {
    const q = query.value.toLowerCase();
    list = list.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q),
    );
  }
  return list;
});

const removedIds = ref<Set<number>>(new Set());

function removeBookmark(id: number) {
  removedIds.value = new Set([...removedIds.value, id]);
}

const visible = computed(() => filtered.value.filter((b) => !removedIds.value.has(b.id)));
</script>

<template>
  <div class="space-y-5">

    <!-- Header row -->
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Bookmarks</h1>
        <p class="text-xs text-gray-400 dark:text-white/30 mt-0.5">
          {{ visible.length }} saved item{{ visible.length !== 1 ? "s" : "" }}
        </p>
      </div>

      <!-- Search -->
      <AppInput
        v-model="query"
        placeholder="Search bookmarks…"
        icon="heroicons:magnifying-glass"
        variant="outline"
        class="w-64"
      />
    </div>

    <!-- Category tabs -->
    <div class="flex items-center gap-1 bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-xl p-1 w-fit">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
        :class="activeCategory === cat.key
          ? 'bg-brand text-white shadow-sm'
          : 'text-gray-500 dark:text-white/40 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'"
        @click="activeCategory = cat.key"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Grid -->
    <div v-if="visible.length" class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div
        v-for="item in visible"
        :key="item.id"
        class="group bg-white dark:bg-brand-dark-600 border border-gray-100 dark:border-white/5 rounded-2xl p-5 flex gap-4"
      >
        <!-- Icon -->
        <div
          class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white"
          :class="item.iconBg"
        >
          <UIcon :name="item.icon" class="size-5" />
        </div>

        <!-- Body -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <span
                class="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5"
                :class="item.tagColor"
              >
                {{ item.tag }}
              </span>
              <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug truncate">
                {{ item.title }}
              </p>
              <p class="text-xs text-gray-400 dark:text-white/30 mt-0.5 truncate">
                {{ item.subtitle }}
              </p>
            </div>

            <!-- Remove button -->
            <button
              class="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-300 dark:text-white/20 hover:text-red-500 dark:hover:text-red-400"
              title="Remove bookmark"
              @click="removeBookmark(item.id)"
            >
              <UIcon name="heroicons:bookmark-slash" class="size-4" />
            </button>
          </div>

          <!-- Progress bar -->
          <div v-if="item.progress !== undefined" class="mt-3">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] text-gray-400 dark:text-white/30">Progress</span>
              <span class="text-[10px] font-semibold text-gray-500 dark:text-white/50">{{ item.progress }}%</span>
            </div>
            <div class="h-1.5 rounded-full bg-gray-100 dark:bg-white/10">
              <div
                class="h-full rounded-full bg-brand transition-all"
                :style="{ width: `${item.progress}%` }"
              />
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between mt-3">
            <span class="text-[10px] text-gray-300 dark:text-white/20 flex items-center gap-1">
              <UIcon name="heroicons:clock" class="size-3" />
              Saved {{ item.savedAt }}
            </span>
            <button class="text-[10px] font-medium text-brand hover:underline transition-colors">
              {{ item.category === "articles" ? "Read" : "Continue" }} →
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
        <UIcon name="heroicons:bookmark" class="size-5 text-gray-300 dark:text-white/20" />
      </div>
      <p class="text-sm font-semibold text-gray-700 dark:text-white/60">No bookmarks found</p>
      <p class="text-xs text-gray-400 dark:text-white/25 mt-1 max-w-xs">
        {{ query ? "Try a different search term." : "Save courses, lessons, and articles to find them here." }}
      </p>
    </div>

  </div>
</template>

<style scoped></style>
