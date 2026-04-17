<script setup lang="ts">
import api from "~/plugin/api";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  layout: "security",
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
  <div class="flex flex-col items-center justify-center">
    <template v-if="!token">
      <AppLeadingText>Unauthorized</AppLeadingText>
      <p class="mb-2 text-gray-500 mt-1">This link is invalid or has expired.</p>
    </template>

    <template v-else>
    <AppLeadingText>Set New Password</AppLeadingText>
    <p class="mb-2 text-gray-500 mt-1">Enter and confirm your new password</p>

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
        <UInput
          v-model="password"
          type="password"
          :ui="{ base: 'py-4 px-6' }"
          :class="[
            'w-full transition-colors',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black',
          ]"
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
        <UInput
          v-model="confirmPassword"
          type="password"
          :ui="{ base: 'py-4 px-6' }"
          :class="[
            'w-full transition-colors',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black',
          ]"
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

    <p v-if="formError" class="text-red-500 text-sm mt-2">
      {{ formError }}
    </p>
    </template>
  </div>
</template>

<style scoped></style>
