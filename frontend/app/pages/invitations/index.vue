<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "dashboard",
});

const schema = v.object({
  email: v.pipe(v.string(), v.email("Please enter a valid email address.")),
  role: v.pipe(v.string(), v.minLength(1, "Please select a role.")),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive<Schema>({ email: "", role: "" });
const formError = ref("");
const loading = ref(false);
const toast = useToast();

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Member", value: "member" },
  { label: "Viewer", value: "viewer" },
];

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  loading.value = true;
  formError.value = "";

  try {
    // TODO: replace with actual API call
    // await api.post("/invitations", data);
    console.log("Invitation data:", data);

    toast.add({
      title: "Invitation sent",
      description: `An invitation has been sent to ${data.email}.`,
      color: "success",
    });

    state.email = "";
    state.role = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    formError.value = err.message || "Failed to send invitation. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-lg">
    <h1 class="text-2xl font-semibold">Send Invitation</h1>
    <p class="text-gray-400 mt-1 text-sm">
      Invite a team member to join your workspace.
    </p>

    <div
      v-if="formError"
      class="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400"
    >
      {{ formError }}
    </div>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 mt-6"
      @submit="onSubmit"
    >
      <UFormField
        v-slot="{ error }"
        label="Email address"
        name="email"
        required
        :ui="{ error: 'text-red-500 text-sm mt-1' }"
      >
        <UInput
          v-model="state.email"
          placeholder="colleague@example.com"
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
        label="Role"
        name="role"
        required
        :ui="{ error: 'text-red-500 text-sm mt-1' }"
      >
        <USelect
          v-model="state.role"
          :items="roles"
          value-key="value"
          label-key="label"
          placeholder="Select a role"
          :class="[
            'w-full transition-colors',
            error ? 'border-red-500' : 'border-gray-300',
          ]"
        />
      </UFormField>

      <UButton
        :loading="loading"
        :disabled="loading"
        type="submit"
        class="flex justify-center items-center text-center w-full rounded py-4 text-white cursor-pointer"
      >
        Send Invitation
      </UButton>
    </UForm>
  </div>
</template>
