<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import api from "~/plugin/api";
import { useTokenStore } from "~/stores/token";
import { useRouter } from "vue-router";

definePageMeta({
  breadcrumb: {
    hidden: true,
  },
  layout: "auth",
});
const schema = v.object({
  email: v.pipe(v.string(), v.email("Please enter a valid email address.")),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 characters."),
  ),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<Schema>({ email: "", password: "" });
const formError = ref("");
const loading = ref(false);
const showPassword = ref(false);

const router = useRouter();
const tokenStore = useTokenStore();

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  loading.value = true;
  formError.value = "";

  try {
    const { status, data: respData } = await api.post("/login", data);

    console.log({
      respData,
    });

    if (status !== 200) {
      throw new Error(respData?.message || "Login failed");
    }
    tokenStore.persistAccessToken(respData.data.token);
    const token = tokenStore.accessToken;
    console.log("Access Token:", token);

    await router.push("/home");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    formError.value = err.message || "An error occurred. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <AppLeadingText> Welcome </AppLeadingText>

    <p class="text-center text-gray-500 leading-6 mt-2">
      Please enter your email and password
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
      
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 w-full mt-6"
      @submit="onSubmit"
    >
      <!-- Email Field -->
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
          v-model="state.email"
          :ui="{ base: 'py-4 px-6' }"
          :class="[
            'w-full transition-colors',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black',
          ]"
        />
      </UFormField>

      <!-- Password Field -->
      <UFormField
        v-slot="{ error }"
        label="Password"
        name="password"
        :error="false"
        required
        :ui="{ error: 'text-red-500 text-sm mt-1' }"
      >
        <UInput
          id="password"
          v-model="state.password"
          :type="showPassword ? 'text' : 'password'"
          :ui="{
            base: 'py-4 px-6',
          }"
          :class="[
            ' w-full transition-colors',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black',
          ]"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="ghost"
              size="lg"
              :icon="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
              @click.prevent="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <div class="flex justify-end">
        <NuxtLink
          to="/forgotten-password"
          class="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Forgot password?
        </NuxtLink>
      </div>

      <UButton
        :loading="loading"
        :disabled="loading"
        type="submit"
        class="flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer"
      >
        Login
      </UButton>
     
    </UForm>
  </div>
</template>

<style scoped>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>
