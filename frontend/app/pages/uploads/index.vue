<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:arrow-up-tray",
    ariaLabel: "Uploads",
    title: "Uploads",
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// ─── State ────────────────────────────────────────────────────────────────────

const files = ref<UploadedFile[]>([]);
const isDragging = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

const hasFiles = computed(() => files.value.length > 0);

// ─── Upload ───────────────────────────────────────────────────────────────────

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(type: string) {
  return type.startsWith("image/");
}

function processFiles(incoming: FileList | File[]) {
  const list = Array.from(incoming);
  for (const file of list) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const url = URL.createObjectURL(file);
    files.value.push({
      id,
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      uploadedAt: new Date().toISOString(),
    });
  }
}

function onFileInputChange(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files?.length) processFiles(input.files);
  input.value = "";
}

function onDrop(e: DragEvent) {
  isDragging.value = false;
  if (e.dataTransfer?.files?.length) processFiles(e.dataTransfer.files);
}

function removeFile(id: string) {
  const file = files.value.find((f) => f.id === id);
  if (file) URL.revokeObjectURL(file.url);
  files.value = files.value.filter((f) => f.id !== id);
}

// ─── Lazy preview via IntersectionObserver ────────────────────────────────────

const loadedPreviews = ref<Set<string>>(new Set());

function onTileVisible(id: string) {
  loadedPreviews.value = new Set([...loadedPreviews.value, id]);
}

function useIntersection(id: string) {
  return {
    el: (el: Element | null) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            onTileVisible(id);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(el);
    },
  };
}

// ─── File type icon ───────────────────────────────────────────────────────────

function fileIcon(type: string) {
  if (type.startsWith("image/")) return "heroicons:photo";
  if (type.startsWith("video/")) return "heroicons:film";
  if (type.startsWith("audio/")) return "heroicons:musical-note";
  if (type === "application/pdf") return "heroicons:document-text";
  if (type.includes("zip") || type.includes("compressed")) return "heroicons:archive-box";
  return "heroicons:document";
}
</script>

<template>
  <div class="space-y-6">

    <!-- Drop zone / Upload trigger -->
    <div
      class="relative border-2 border-dashed rounded-xl transition-colors cursor-pointer"
      :class="isDragging
        ? 'border-primary bg-primary/5'
        : 'border-default hover:border-primary/50 bg-gray-50 dark:bg-white/2'"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="fileInputRef?.click()"
    >
      <input
        ref="fileInputRef"
        type="file"
        multiple
        class="hidden"
        @change="onFileInputChange"
      />
      <div class="flex flex-col items-center justify-center gap-3 py-10 text-center pointer-events-none select-none">
        <div class="size-12 rounded-full bg-white dark:bg-white/5 border border-default flex items-center justify-center shadow-sm">
          <UIcon name="heroicons:arrow-up-tray" class="size-5 text-muted" />
        </div>
        <div>
          <p class="text-sm font-medium">
            <span class="text-primary">Click to upload</span>
            <span class="text-muted"> or drag and drop</span>
          </p>
          <p class="text-xs text-muted mt-0.5">Any file type · No size limit</p>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <template v-if="!hasFiles">
      <div class="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div class="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
          <UIcon name="heroicons:arrow-up-tray" class="size-8 text-gray-300 dark:text-white/20" />
        </div>
        <div>
          <p class="font-medium text-base">No files uploaded yet</p>
          <p class="text-sm text-muted mt-1">Drag and drop files above or click to browse.</p>
        </div>
        <UButton icon="heroicons:arrow-up-tray" variant="outline" color="neutral" @click="fileInputRef?.click()">
          Browse files
        </UButton>
      </div>
    </template>
    <!-- File grid -->
    <template v-else>
      <div class="flex items-center justify-between">
        <p class="text-sm text-muted">
          {{ files.length }} {{ files.length === 1 ? "file" : "files" }}
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <div
          v-for="file in files"
          :key="file.id"
          :ref="(el) => useIntersection(file.id).el(el as Element)"
          class="group relative rounded-xl border border-default bg-white dark:bg-white/3 overflow-hidden flex flex-col"
        >
          <!-- Preview area -->
          <div class="aspect-square bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden">
            <template v-if="loadedPreviews.has(file.id)">
              <img
                v-if="isImage(file.type)"
                :src="file.url"
                :alt="file.name"
                class="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
              <UIcon
                v-else
                :name="fileIcon(file.type)"
                class="size-10 text-muted"
              />
            </template>
            <!-- Skeleton while not in viewport -->
            <div v-else class="w-full h-full animate-pulse bg-gray-200 dark:bg-white/10" />
          </div>

          <!-- File info -->
          <div class="px-2.5 py-2 flex flex-col gap-0.5">
            <p class="text-xs font-medium truncate leading-tight">{{ file.name }}</p>
            <p class="text-[11px] text-muted">{{ formatSize(file.size) }}</p>
          </div>

          <!-- Remove button -->
          <button
            class="absolute top-1.5 right-1.5 size-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove file"
            @click.stop="removeFile(file.id)"
          >
            <UIcon name="heroicons:x-mark" class="size-3.5" />
          </button>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped></style>
