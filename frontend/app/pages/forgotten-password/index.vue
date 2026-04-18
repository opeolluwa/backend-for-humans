<script setup lang="ts">
import api from "~/plugin/api";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "authentication",
});

const email = ref("");
const formError = ref<string>();
const loading = ref<boolean>(false);
const router = useRouter();

async function onSubmit() {
  try {
    loading.value = true;
    formError.value = "";
    const { data: respData } = await api.post("/forgotten-password", {
      email: email.value,
    });
    await router.push(`/set-password?token=${respData.data.token}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    formError.value =
      error.response?.data?.message || "Something went wrong";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Forgot password?</h1>
    <p class="text-sm text-gray-500 dark:text-white/40 mt-1">
      Enter your email to receive a reset link.
    </p>

    <UAlert
      v-if="formError"
      color="error"
      variant="subtle"
      title="Request failed"
      :description="formError"
      class="mt-4"
      icon="heroicons:information-circle"
    />

    <UForm :state="{ email: '' }" class="w-full mt-6 space-y-4" @submit="onSubmit">
      <UFormField
        v-slot="{ error }"
        label="Email"
        name="email"
        required
        :ui="{ error: 'text-red-500 text-sm mt-1' }"
      >
        <AppInput
          v-model="email"
          placeholder="you@example.com"
          :class="['w-full transition-colors', error ? 'border-red-500' : 'border-gray-300']"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="loading"
        class="flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer mt-6"
      >
        Submit
      </UButton>
    </UForm>

    <div class="text-center mt-4">
      <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
        Back to sign in
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
