<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const props = defineProps<{ ui?: Record<string, string> }>();

const mergedUi = computed(() => ({
  base: "px-3 py-2.5 rounded-md border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  ...props.ui,
}));
</script>

<template>
  <UInput v-bind="attrs" :ui="mergedUi">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="(slotProps as any) ?? {}" />
    </template>
  </UInput>
</template>
