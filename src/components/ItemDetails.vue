<script>
import SkeletonLoader from "@/components/SkeletonLoader.vue";
export default {
  name: 'ItemDetails',
  components:{SkeletonLoader},
  props: {
    item: {
      type: Object,
      required: true
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem) {
          this.quantity = newItem.quantity || 1
        }
      }
    }
  },
  methods: {
    confirmQuantity() {
      this.$emit('updateQuantity', {
        itemId: this.item.id,
        quantity: parseInt(this.quantity)
      })
    }
  }
}
</script>

<template>
  <transition name="slide">
    <div
        v-if="item"
        class="fixed right-0 top-0 h-full w-80 bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out"
    >
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-white text-xl font-bold">{{ item.name }}</h3>
          <button
              v-if="isFixed"
              @click="$emit('close')"
              class="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div class="mb-4">
          <img
              :src="item.image"
              :alt="item.name"
              class="w-32 h-32 object-contain mx-auto"
          />
        </div>

        <p class="text-gray-300 mb-6">{{ item.description }}</p>

        <div class="mb-4">
          <label class="block text-gray-300 mb-2">Количество:</label>
          <input
              type="number"
              v-model="quantity"
              min="1"
              class="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="isFixed" class="flex gap-2">
          <button
              @click="confirmQuantity"
              class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-200"
          >
            Подтвердить
          </button>

          <button
              @click="$emit('delete', item.id)"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-all duration-200"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* Добавим красивый эффект появления для содержимого */
.slide-enter-active .p-4 > * {
  animation: fade-in 0.3s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Задержка анимации для разных элементов */
.slide-enter-active .p-4 > *:nth-child(1) { animation-delay: 0.1s; }
.slide-enter-active .p-4 > *:nth-child(2) { animation-delay: 0.15s; }
.slide-enter-active .p-4 > *:nth-child(3) { animation-delay: 0.2s; }
.slide-enter-active .p-4 > *:nth-child(4) { animation-delay: 0.25s; }
.slide-enter-active .p-4 > *:nth-child(5) { animation-delay: 0.3s; }
</style>