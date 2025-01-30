<script>
export default {
  name: 'InventoryItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleDragStart(event) {
      console.log('Start drag item from position:', this.position)
      // Очищаем изображение при перетаскивании
      const emptyImg = new Image()
      event.dataTransfer.setDragImage(emptyImg, 0, 0)
      // Передаем позицию в родительский компонент
      this.$emit('dragstart', this.position)
    }
  }
}
</script>

<template>
  <div
      class="w-full h-full flex items-center justify-center relative"
      draggable="true"
      @dragstart="handleDragStart"
  >
    <img
        :src="item.image"
        :alt="item.name"
        class="max-w-full max-h-full object-contain"
        draggable="false"
    />
    <div
        v-if="item.quantity > 1"
        class="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1 rounded"
    >
      {{ item.quantity }}
    </div>
  </div>
</template>

<style scoped>
div[draggable="true"] {
  cursor: move;
}

div[draggable="true"]:active {
  opacity: 0.7;
}
</style>