<script setup lang="ts">
import { useCountdown } from "@vueuse/core";
definePageMeta({
  layout: "security",
});

const countdownSeconds = 120;
const { remaining, start, stop } = useCountdown(countdownSeconds, {
  onComplete() {},
  onTick() {},
});

const value = ref();
const formError = ref<string>();
const loading = ref<boolean>(false);

async function onSubmit() {
  try {
    loading.value = true;
    formError.value = "";
    start();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    stop();
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <AppLeadingText> Check you email </AppLeadingText>
    <p class="mb-4 text-gray-500 mt-1">
      Please enter the six digit pin we sent to you
    </p>

    <UPinInput
      v-model="value"
      length="6"
      autofocus
      :autofocus-delay="300"
      otp
      size="xl"
      type="number"
      class="mt-6"
      :ui="{ base: 'bg-brand-50 p-7 dark:bg-brand-50/5' }"
      @complete="onSubmit"
    />

    <UButton
      class="flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer mt-8"
    >
      Confirm</UButton
    >
    <small class="mt-4 text-gray-500"
      >Did&apos;t get the email? Resent in {{ remaining }}</small
    >
  </div>
</template>

<style scoped></style>
