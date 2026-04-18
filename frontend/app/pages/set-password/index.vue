<script setup lang="ts">
import api from "~/plugin/api";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  layout: "authentication",
});

const password = ref("");
const confirmPassword = ref("");
const formError = ref<string>();
const loading = ref<boolean>(false);
const router = useRouter();
const route = useRoute();
const token = computed(() => route.query.token as string | undefined);

async function onSubmit() {
  try {
    loading.value = true;
    formError.value = "";
    if (password.value !== confirmPassword.value) {
      formError.value = "Passwords do not match";
      return;
    }
    await api.post(
      "/reset-password",
      { password: password.value, confirmPassword: confirmPassword.value },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    );
    await router.push("/");
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
  <div class="flex flex-col">
    <template v-if="!token">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Invalid link</h1>
      <p class="text-sm text-gray-500 dark:text-white/40 mt-1">This link is invalid or has expired.</p>
      <NuxtLink to="/" class="text-brand text-sm font-medium hover:underline mt-4 inline-block">
        Back to sign in
      </NuxtLink>
    </template>

    <template v-else>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Set new password</h1>
      <p class="text-sm text-gray-500 dark:text-white/40 mt-1">Enter and confirm your new password.</p>

      <UAlert
        v-if="formError"
        color="error"
        variant="subtle"
        title="Error"
        :description="formError"
        class="mt-4"
        icon="heroicons:information-circle"
      />

      <UForm
        :state="{ password: '', confirmPassword: '' }"
        class="w-full mt-6"
        @submit="onSubmit"
      >
        <UFormField
          v-slot="{ error }"
          label="New Password"
          name="password"
          required
          :ui="{ error: 'text-red-500 text-sm mt-1' }"
        >
          <AppInput
            v-model="password"
            type="password"
            placeholder="••••••••"
            :class="['w-full transition-colors', error ? 'border-red-500' : 'border-gray-300']"
          />
        </UFormField>

        <UFormField
          v-slot="{ error }"
          label="Confirm Password"
          name="confirmPassword"
          required
          :ui="{ error: 'text-red-500 text-sm mt-1' }"
          class="mt-4"
        >
          <AppInput
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            :class="['w-full transition-colors', error ? 'border-red-500' : 'border-gray-300']"
          />
        </UFormField>

        <UButton
          type="submit"
          :loading="loading"
          class="flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer mt-6"
        >
          Reset Password
        </UButton>
      </UForm>
    </template>
  </div>
</template>

<style scoped></style>
