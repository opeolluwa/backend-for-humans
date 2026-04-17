<script setup lang="ts">
import type { Email } from "../../../../bindings/Email";
import { useEmailStore } from "~/stores/emails";

definePageMeta({
  layout: "dashboard",
  breadcrumb: {
    icon: "heroicons:envelope",
    ariaLabel: "Messages",
    title: "Messages",
  },
});

const emailStore = useEmailStore();
const toast = useToast();

const loading = ref(false);
const search = ref("");
const activeTab = ref<"all" | "unread" | "starred">("all");
const selectedEmail = ref<Email | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    await emailStore.fetchEmails();
  } catch {
    toast.add({
      title: "Error",
      description: "Failed to load messages.",
      color: "error",
    });
  } finally {
    loading.value = false;
  }
});

const filteredEmails = computed(() => {
  let list = emailStore.emails;

  if (activeTab.value === "unread") list = list.filter((e) => !e.isRead);
  else if (activeTab.value === "starred") list = list.filter((e) => e.isStarred);

  const q = search.value.trim().toLowerCase();
  if (!q) return list;

  return list.filter(
    (e) =>
      e.subject.toLowerCase().includes(q) ||
      e.senderEmail.toLowerCase().includes(q) ||
      e.recipientEmail.toLowerCase().includes(q) ||
      (e.tag ?? "").toLowerCase().includes(q),
  );
});

const unreadCount = computed(() => emailStore.emails.filter((e) => !e.isRead).length);

async function selectEmail(email: Email) {
  selectedEmail.value = email;
  if (!email.isRead) {
    await emailStore.markAsRead(email.identifier);
  }
}

async function toggleStar(email: Email, event: MouseEvent) {
  event.stopPropagation();
  await emailStore.toggleStarred(email.identifier, !email.isStarred);
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function formatFullDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
</script>

<template>
  <div class="flex gap-6 h-[calc(100vh-180px)] min-h-[500px]">
    <!-- Left panel: email list -->
    <div
      class="w-80 shrink-0 flex flex-col bg-white dark:bg-brand-dark-600 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden"
    >
      <!-- Search + tabs -->
      <div class="px-4 pt-4 pb-3 border-b border-gray-100 dark:border-white/5 space-y-3">
        <UInput
          v-model="search"
          placeholder="Search messages..."
          icon="heroicons:magnifying-glass"
          size="sm"
        />

        <div class="flex gap-1">
          <button
            v-for="tab in ['all', 'unread', 'starred'] as const"
            :key="tab"
            class="flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors cursor-pointer"
            :class="
              activeTab === tab
                ? 'bg-brand-50 dark:bg-brand/10 text-brand dark:text-brand-300'
                : 'text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white/60'
            "
            @click="activeTab = tab"
          >
            {{ tab }}
            <span
              v-if="tab === 'unread' && unreadCount > 0"
              class="ml-1 bg-brand text-white text-[10px] rounded-full px-1.5 py-0.5"
            >
              {{ unreadCount }}
            </span>
          </button>
        </div>
      </div>

      <!-- Email list -->
      <div class="flex-1 overflow-y-auto">
        <PageLoader v-if="loading" />

        <div
          v-else-if="filteredEmails.length === 0"
          class="flex flex-col items-center justify-center h-full gap-4 text-center px-6"
        >
          <div class="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
            <UIcon name="heroicons:envelope-open" class="size-7 text-gray-300 dark:text-white/20" />
          </div>
          <div>
            <p class="font-medium text-sm text-gray-700 dark:text-white/60">No messages found</p>
            <p class="text-xs text-muted mt-1">Try adjusting your search or filter.</p>
          </div>
        </div>

        <button
          v-for="email in filteredEmails"
          :key="email.identifier"
          class="w-full text-left px-4 py-3 border-b border-gray-50 dark:border-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
          :class="selectedEmail?.identifier === email.identifier ? 'bg-brand-50/60 dark:bg-brand/5' : ''"
          @click="selectEmail(email)"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <!-- Unread dot -->
              <span
                class="shrink-0 size-1.5 rounded-full mt-1.5"
                :class="!email.isRead ? 'bg-brand' : 'bg-transparent'"
              />
              <div class="min-w-0">
                <p
                  class="text-xs truncate"
                  :class="
                    !email.isRead
                      ? 'font-semibold text-gray-900 dark:text-white'
                      : 'font-medium text-gray-600 dark:text-white/50'
                  "
                >
                  {{ email.senderEmail }}
                </p>
                <p
                  class="text-xs truncate mt-0.5"
                  :class="
                    !email.isRead
                      ? 'text-gray-800 dark:text-white/80'
                      : 'text-gray-500 dark:text-white/35'
                  "
                >
                  {{ email.subject }}
                </p>
                <p class="text-[10px] text-gray-400 dark:text-white/20 truncate mt-0.5">
                  To: {{ email.recipientEmail }}
                </p>
              </div>
            </div>

            <div class="flex flex-col items-end gap-1.5 shrink-0">
              <span class="text-[10px] text-gray-400 dark:text-white/25 whitespace-nowrap">
                {{ formatDate(email.dateSent) }}
              </span>
              <button
                class="transition-colors cursor-pointer"
                :class="
                  email.isStarred
                    ? 'text-amber-400'
                    : 'text-gray-200 dark:text-white/10 hover:text-amber-300'
                "
                @click="toggleStar(email, $event)"
              >
                <UIcon
                  :name="email.isStarred ? 'heroicons:star-solid' : 'heroicons:star'"
                  class="size-3.5"
                />
              </button>
              <span
                v-if="email.tag"
                class="text-[9px] bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/30 rounded px-1.5 py-0.5 uppercase tracking-wide"
              >
                {{ email.tag }}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Right panel: email preview -->
    <div
      class="flex-1 bg-white dark:bg-brand-dark-600 rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col"
    >
      <!-- Empty state -->
      <div
        v-if="!selectedEmail"
        class="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8"
      >
        <div class="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
          <UIcon name="heroicons:envelope" class="size-8 text-gray-300 dark:text-white/20" />
        </div>
        <div>
          <p class="font-medium text-base text-gray-700 dark:text-white/50">No message selected</p>
          <p class="text-sm text-muted mt-1">Select a message from the list to preview it here.</p>
        </div>
      </div>

      <!-- Email preview -->
      <template v-else>
        <!-- Email header -->
        <div class="px-8 py-5 border-b border-gray-100 dark:border-white/5">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h2 class="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                {{ selectedEmail.subject }}
              </h2>
              <p class="text-xs text-gray-400 dark:text-white/30 mt-1">
                {{ formatFullDate(selectedEmail.dateSent) }}
              </p>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <span
                v-if="selectedEmail.hasAttachments"
                class="flex items-center gap-1 text-xs text-gray-400 dark:text-white/30"
              >
                <UIcon name="heroicons:paper-clip" class="size-3.5" />
                Attachments
              </span>
              <span
                v-if="selectedEmail.tag"
                class="text-xs bg-brand-50 dark:bg-brand/10 text-brand dark:text-brand-300 rounded-full px-2.5 py-0.5 font-medium"
              >
                {{ selectedEmail.tag }}
              </span>
              <button
                class="transition-colors cursor-pointer"
                :class="
                  selectedEmail.isStarred
                    ? 'text-amber-400'
                    : 'text-gray-300 dark:text-white/20 hover:text-amber-300'
                "
                @click="toggleStar(selectedEmail, $event)"
              >
                <UIcon
                  :name="selectedEmail.isStarred ? 'heroicons:star-solid' : 'heroicons:star'"
                  class="size-4"
                />
              </button>
            </div>
          </div>

          <!-- From / To -->
          <div class="mt-4 space-y-1.5">
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-400 dark:text-white/25 w-8">From</span>
              <span class="font-medium text-gray-700 dark:text-white/70">
                {{ selectedEmail.senderEmail }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-gray-400 dark:text-white/25 w-8">To</span>
              <span class="font-medium text-gray-700 dark:text-white/70">
                {{ selectedEmail.recipientEmail }}
              </span>
            </div>
          </div>
        </div>

        <!-- Email body -->
        <div class="flex-1 overflow-y-auto px-8 py-6">
          <!-- Render as HTML if body contains tags, otherwise as plain text -->
          <div
            v-if="selectedEmail.body.includes('<')"
            class="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-white/70"
            v-html="selectedEmail.body"
          />
          <pre
            v-else
            class="whitespace-pre-wrap text-sm text-gray-700 dark:text-white/70 font-sans leading-relaxed"
          >{{ selectedEmail.body }}</pre>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
