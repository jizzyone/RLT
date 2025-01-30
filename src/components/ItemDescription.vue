<script>
export default {
  name: 'ItemDescription',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <div
      v-if="item"
      class="item-description fixed right-0 top-0 h-full w-80 bg-gray-800 p-4 transform transition-transform"
      :class="{ 'translate-x-0': item, 'translate-x-full': !item }"
  >
    <div class="text-white">
      <h3 class="text-xl font-bold mb-4">{{ item.name }}</h3>
      <p class="mb-4">{{ item.description }}</p>
      <button
          @click="$emit('delete', item)"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>