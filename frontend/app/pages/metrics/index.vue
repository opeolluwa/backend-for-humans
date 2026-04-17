<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:chart-bar-square",
    ariaLabel: "Metrics",
    title: "Metrics",
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[60vh] gap-4 text-center">
    <div class="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
      <UIcon name="heroicons:chart-bar-square" class="size-8 text-gray-300 dark:text-white/20" />
    </div>
    <div>
      <p class="font-medium text-base">No metrics yet</p>
      <p class="text-sm text-muted mt-1">Metrics will appear here once your workspace has activity.</p>
    </div>
  </div>
</template>

<style scoped></style>
