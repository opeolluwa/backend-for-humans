<script setup lang="ts">
const slides = [
  {
    heading: "Learn backend development, the human way.",
    body: "Practical courses and resources to help you build real-world backend skills.",
  },
  {
    heading: "From zero to production-ready.",
    body: "Step-by-step learning paths that take you from basics to deploying real systems.",
  },
  {
    heading: "APIs, databases, and everything in between.",
    body: "Master the tools and patterns that power modern backend applications.",
  },
  {
    heading: "Built for developers who think differently.",
    body: "Plain language, real examples — no jargon, no fluff.",
  },
];

const current = ref(0);

onMounted(() => {
  setInterval(() => {
    current.value = (current.value + 1) % slides.length;
  }, 4000);
});
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden">
    <!-- Left panel -->
    <div class="hidden lg:flex lg:w-1/2 relative flex-col overflow-hidden">
      <img
        src="/bg.jpg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-brand/60 dark:bg-black/75" />

      <div class="relative z-10 flex flex-col h-full p-10">
        <AppLogo />

        <div class="flex-1 flex flex-col justify-center overflow-hidden">
          <Transition name="slide" mode="out-in">
            <div :key="current">
              <h2 class="text-white text-4xl font-bold leading-snug max-w-xs">
                {{ slides[current]?.heading }}
              </h2>
              <p class="text-white/60 text-sm mt-4 max-w-xs leading-relaxed">
                {{ slides[current]?.body }}
              </p>
            </div>
          </Transition>
        </div>

        <div class="mt-auto">
          <div class="flex gap-1.5 mb-5">
            <button
              v-for="(_, i) in slides"
              :key="i"
              class="h-1 rounded-full transition-all duration-300"
              :class="i === current ? 'w-6 bg-white' : 'w-2 bg-white/30'"
              @click="current = i"
            />
          </div>
          <p class="text-white/50 text-xs italic leading-relaxed">
            "Don't worry about failure; you only have to be right once."
          </p>
          <p class="text-white/40 text-xs mt-1 font-medium">— Drew Houston</p>
        </div>
      </div>
    </div>

    <!-- Right panel -->
    <div
      class="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white dark:bg-brand-dark-700 overflow-y-auto relative"
    >
      <div
        class="absolute inset-0 opacity-40 dark:hidden pointer-events-none"
        style="background-image: radial-gradient(circle, #00b87a22 1px, transparent 1px); background-size: 32px 32px;"
      />

      <div class="relative z-10 w-full max-w-md px-8 py-10">
        <div class="flex justify-start mb-8 lg:hidden">
          <AppLogo />
        </div>

        <slot />

        <p class="text-center text-[11px] text-gray-400 mt-8 dark:text-white/20">
          &copy; {{ new Date().getFullYear() }} BHE. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
