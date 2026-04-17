<script setup lang="ts">
import api from "~/plugin/api";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "auth",
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
  <div class="flex flex-col items-center justify-center">
    <AppLeadingText>Forgot Password</AppLeadingText>
    <p class="mb-2 text-gray-500 mt-1">
      Enter your email to receive a reset link
    </p>

    <UForm :state="{ email: '' }" class="w-full mt-6" @submit="onSubmit">
      <UFormField
        v-slot="{ error }"
        label="Email"
        name="email"
        required
        :ui="{
          error: 'text-red-500 text-sm mt-1',
        }"
      >
        <UInput
          v-model="email"
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
        Submit
      </UButton>
    </UForm>

    <p v-if="formError" class="text-red-500 text-sm mt-2">
      {{ formError }}
    </p>
  </div>
</template>

<style scoped></style>
