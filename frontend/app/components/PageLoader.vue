<template>
  <div class="flex flex-col justify-center items-center h-[70vh]">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 45px;
  aspect-ratio: 0.75;
  --c: no-repeat linear-gradient(oklch(46.507% 0.18554 314.5) 0 0);
  background:
    var(--c) 0% 50%,
    var(--c) 50% 50%,
    var(--c) 100% 50%;
  animation: l7 1s infinite linear alternate;
}
@keyframes l7 {
  0% {
    background-size:
      20% 50%,
      20% 50%,
      20% 50%;
  }
  20% {
    background-size:
      20% 20%,
      20% 50%,
      20% 50%;
  }
  40% {
    background-size:
      20% 100%,
      20% 20%,
      20% 50%;
  }
  60% {
    background-size:
      20% 50%,
      20% 100%,
      20% 20%;
  }
  80% {
    background-size:
      20% 50%,
      20% 50%,
      20% 100%;
  }
  100% {
    background-size:
      20% 50%,
      20% 50%,
      20% 50%;
  }
}
</style>
