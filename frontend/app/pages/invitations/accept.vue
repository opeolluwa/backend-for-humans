<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import api from "~/plugin/api";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  layout: "auth",
});

const schema = v.object({
  firstName: v.pipe(v.string(), v.minLength(1, "First name is required.")),
  lastName: v.pipe(v.string(), v.minLength(1, "Last name is required.")),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 characters."),
  ),
  confirmPassword: v.pipe(
    v.string(),
    v.minLength(8, "Please confirm your password."),
  ),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<Schema>({
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
});

const formError = ref("");
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const router = useRouter();
const route = useRoute();
const token = computed(() => route.query.token as string | undefined);

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  if (data.password !== data.confirmPassword) {
    formError.value = "Passwords do not match.";
    return;
  }

  loading.value = true;
  formError.value = "";

  try {
    await api.post(
      "/invitations/accept",
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      { headers: { Authorization: `Bearer ${token.value}` } },
    );
    await router.push("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    formError.value =
      err.response?.data?.message ||
      "Failed to accept invitation. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <template v-if="!token">
      <AppLeadingText>Unauthorized</AppLeadingText>
      <p class="text-center text-gray-500 leading-6 mt-2">
        This invitation link is invalid or has expired.
      </p>
    </template>

    <template v-else>
      <AppLeadingText>Accept Invitation</AppLeadingText>
      <h1 v-show="formError" class="capitalize text-center text-5xl font-bold">
        Oops!
      </h1>

      <p v-show="!formError" class="text-center text-gray-500 leading-6 mt-2">
        Set up your account to join the workspace
      </p>

      <span v-show="formError" class="text-red-500 text-sm mt-1">{{
        formError
      }}</span>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 w-full mt-6"
        @submit="onSubmit"
      >
        <div class="flex gap-3">
          <UFormField
            v-slot="{ error }"
            label="First name"
            name="firstName"
            required
            class="flex-1"
            :ui="{ error: 'text-red-500 text-sm mt-1' }"
          >
            <UInput
              v-model="state.firstName"
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
            label="Last name"
            name="lastName"
            required
            class="flex-1"
            :ui="{ error: 'text-red-500 text-sm mt-1' }"
          >
            <UInput
              v-model="state.lastName"
              :ui="{ base: 'py-4 px-6' }"
              :class="[
                'w-full transition-colors',
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-black',
              ]"
            />
          </UFormField>
        </div>

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
            :ui="{ base: 'py-4 px-6' }"
            :class="[
              'w-full transition-colors',
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

        <UFormField
          v-slot="{ error }"
          label="Confirm password"
          name="confirmPassword"
          :error="false"
          required
          :ui="{ error: 'text-red-500 text-sm mt-1' }"
        >
          <UInput
            id="confirmPassword"
            v-model="state.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            :ui="{ base: 'py-4 px-6' }"
            :class="[
              'w-full transition-colors',
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
                :icon="
                  showConfirmPassword ? 'heroicons:eye-slash' : 'heroicons:eye'
                "
                :aria-label="
                  showConfirmPassword ? 'Hide password' : 'Show password'
                "
                :aria-pressed="showConfirmPassword"
                aria-controls="confirmPassword"
                @click.prevent="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton
          :loading="loading"
          :disabled="loading"
          type="submit"
          class="flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer"
        >
          Create Account
        </UButton>
      </UForm>
    </template>
  </div>
</template>

<style scoped>
::-ms-reveal {
  display: none;
}
</style>
