<script>
export default {
  name: "SkeletonLoader.vue"
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6 h-full">
    <!-- Имитация большой картинки -->
    <div class="skeleton-box h-64 w-full rounded-lg mb-6"></div>

    <!-- Имитация текстовых блоков -->
    <div class="space-y-4">
      <div class="skeleton-box h-6 w-4/5 rounded"></div>
      <div class="skeleton-box h-4 w-full rounded"></div>
      <div class="skeleton-box h-4 w-3/4 rounded"></div>
      <div class="skeleton-box h-4 w-5/6 rounded"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-box {
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.06) 25%,
      rgba(255, 255, 255, 0.12) 37%,
      rgba(255, 255, 255, 0.06) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>