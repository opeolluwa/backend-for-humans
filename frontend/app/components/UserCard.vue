<template>
  <div class="flex items-center justify-center gap-x-3 cursor-pointer">
    <UAvatar
      src="https://github.com/benjamincanac.png"
      class="rounded-2xl squircle"
    />
    <div class="flex flex-col">
      <span>Alex Brown</span>
      <small class="-mt-1.5">alexbrown@mailer.com</small>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.squircle {
  mask-image: url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
}
</style>
