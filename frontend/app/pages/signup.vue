<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = v.object({
  email: v.pipe(v.string(), v.email("Please enter a valid email address.")),
  password: v.pipe(v.string(), v.minLength(8, "Must be at least 8 characters")),
  firstName: v.pipe(v.string(), v.minLength(1, "Must be provided")),
  lastName: v.pipe(v.string(), v.minLength(1, "Must be provided")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  password: "",
  firstName: "",
  lastname: "",
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}

definePageMeta({
  layout: "authentication",
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
    <p class="text-sm text-gray-500 dark:text-white/40 mt-1">
      Already have an account?
      <NuxtLink to="/" class="text-brand font-medium hover:underline">Sign in</NuxtLink>
    </p>

    <UForm :schema="schema" :state="state" class="space-y-4 w-full mt-6" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-4">
        <UFormField
          v-slot="{ error }"
          label="First name"
          name="firstName"
          required
          :ui="{ error: 'text-red-500 text-sm mt-1' }"
        >
          <AppInput
            v-model="state.firstName"
            placeholder="John"
            :class="['w-full', error ? 'border-red-500' : '']"
          />
        </UFormField>

        <UFormField
          v-slot="{ error }"
          label="Last name"
          name="lastName"
          required
          :ui="{ error: 'text-red-500 text-sm mt-1' }"
        >
          <AppInput
            v-model="state.lastname"
            placeholder="Doe"
            :class="['w-full', error ? 'border-red-500' : '']"
          />
        </UFormField>
      </div>

      <UFormField
        v-slot="{ error }"
        label="Email"
        name="email"
        required
        :ui="{ error: 'text-red-500 text-sm mt-1' }"
      >
        <AppInput
          v-model="state.email"
          placeholder="you@example.com"
          :class="['w-full', error ? 'border-red-500' : '']"
        />
      </UFormField>

      <UFormField
        v-slot="{ error }"
        label="Password"
        name="password"
        required
        :ui="{ error: 'text-red-500 text-sm mt-1' }"
      >
        <AppInput
          v-model="state.password"
          type="password"
          placeholder="••••••••"
          :class="['w-full', error ? 'border-red-500' : '']"
        />
      </UFormField>

      <UButton
        type="submit"
        class="flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer"
      >
        Continue
      </UButton>
    </UForm>
  </div>
</template>

<style scoped></style>
