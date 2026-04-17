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
  layout: "auth",
});
</script>

<template>
  <h1 class="capitalize text-center text-5xl font-bold">Create account</h1>
  <p class="text-center text-gray-500 leading-6 mt-2">
    The account will be admin account
  </p>

  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 px-36 w-full mt-6"
    @submit="onSubmit"
  >
    <UFormField label="First name" name="firstName" required>
      <UInput
        v-model="state.firstName"
        :ui="{
          base: 'py-4 px-6',
        }"
        class="border-2 rounded w-full"
      />
    </UFormField>

    <UFormField label="Last name" name="lastName" required>
      <UInput
        v-model="state.lastname"
        :ui="{
          base: 'py-4 px-6',
        }"
        class="border-2 rounded w-full"
      />
    </UFormField>

    <UFormField label="Email" name="email" required>
      <UInput
        v-model="state.email"
        :ui="{
          base: 'py-4 px-6',
        }"
        class="border-2 rounded w-full"
      />
    </UFormField>

    <UFormField label="Password" name="password" required>
      <UInput
        v-model="state.password"
        type="password"
        :ui="{
          base: 'py-4 px-6',
        }"
        class="border-2 rounded w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      class="bg-black flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer"
    >
      Continue
    </UButton>
  </UForm>
</template>

<style scoped></style>
