<script>
export default {
  name: "SecondSkeleton"
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6 h-full mt-4 flex flex-row justify-between items-start">
    <div class="skeleton-box h-10 w-11/12 rounded-xl"></div>
    <button @click="$emit('close')" class="text-gray-400 hover:text-white transition-colors">
      ✕
    </button>
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