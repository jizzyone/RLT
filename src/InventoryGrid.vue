<script>
import { INVENTORY_SIZE, MOCK_ITEMS } from './types/inventory'
import InventoryItem from "@/components/InventoryItem.vue";
import ItemDetails from "@/components/ItemDetails.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import SecondSkeleton from "@/components/SecondSkeleton.vue";

export default {
  name: 'InventoryGrid',
  components: {
    InventoryItem,
    ItemDetails,
    SkeletonLoader,
    SecondSkeleton
  },
  data() {
    return {
      INVENTORY_SIZE,
      items: [],
      selectedItem: null,
      isHoveringModal: false,
      isModalFixed: false,
      draggedPosition: null
    }
  },
  methods: {
    getItemAtPosition(position) {
      return this.items.find(item => item.position === position)
    },
    handleMouseLeave() {
      // небольшая задержка перед закрытием, чтобы пользователь
      // успел перевести мышь на модальное окно если хочет
      setTimeout(() => {
        if (!this.isHoveringModal) {
          this.selectedItem = null
        }
      }, 100)
    },
    handleModalHover(isHovering) {
      this.isHoveringModal = isHovering
    },
    handleCellHover(position) {
      if (!this.isModalFixed) {
        const item = this.getItemAtPosition(position)
        if (item) {
          this.selectedItem = item
        }
      }
    },

    handleDragStart(position) {
      console.log('Start drag from position:', position)
      this.draggedPosition = position
    },

    handleDrop(event, newPosition) {
      console.log('Drop to position:', newPosition);
      console.log('Dragged from position:', this.draggedPosition);

      if (this.draggedPosition === null) return;

      // Копируем массив для реактивности
      const newItems = [...this.items];

      // Находим предметы по позициям
      const draggedItem = newItems.find(item => item.position === this.draggedPosition);
      const targetItem = newItems.find(item => item.position === newPosition);

      if (draggedItem) {
        // Меняем позиции
        draggedItem.position = newPosition;
        if (targetItem) {
          targetItem.position = this.draggedPosition;
        }

        // Обновляем состояние
        this.items = newItems;
        this.saveToLocalStorage();
      }

      this.draggedPosition = null;
    },
    handleCellLeave() {
      if (!this.isModalFixed) {
        this.selectedItem = null
      }
    },

    handleCellClick(position) {
      const item = this.getItemAtPosition(position)
      if (item) {
        this.selectedItem = item
        this.isModalFixed = true
      }
    },

    handleModalClose() {
      this.selectedItem = null
      this.isModalFixed = false
    },
    updateItemQuantity({ itemId, quantity }) {
      const itemIndex = this.items.findIndex(item => item.id === itemId)
      if (itemIndex !== -1) {
        this.items[itemIndex].quantity = quantity
        this.saveToLocalStorage()
      }
    },
    deleteItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId)
      this.selectedItem = null
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('inventory', JSON.stringify(this.items))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('inventory')
      this.items = saved ? JSON.parse(saved) : MOCK_ITEMS
    }
  },
  mounted() {
    this.loadFromLocalStorage()
    console.log('Mounted items:', this.items)
  }
}
</script>

<template>
  <div class="p-12 bg-gray-900">
    <div class="flex gap-4">
      <div class="w-64 bg-gray-800 rounded-lg p-4">
        <SkeletonLoader/>
      </div>
      <div class="flex-1 bg-gray-800 p-4 rounded-lg">
        <div class="grid grid-cols-5 gap-2">
          <div
              v-for="index in INVENTORY_SIZE"
              :key="index-1"
              class="inventory-cell bg-gray-700 rounded cursor-pointer aspect-square"
              @mouseenter="handleCellHover(index-1)"
              @mouseleave="handleCellLeave"
              @click="handleCellClick(index-1)"
              @dragover.prevent
              @drop="handleDrop($event, index-1)"
          >
            <InventoryItem
                v-if="getItemAtPosition(index-1)"
                :item="getItemAtPosition(index-1)"
                :position="index-1"
                @dragstart="handleDragStart"
            />
          </div>
        </div>
      </div>
    </div>
    <SecondSkeleton/>
    <ItemDetails
        v-if="selectedItem"
        :item="selectedItem"
        :is-fixed="isModalFixed"
        @close="handleModalClose"
        @delete="deleteItem"
        @updateQuantity="updateItemQuantity"
    />
  </div>
</template>

<style scoped>
.inventory-cell {
  transition: all 0.2s ease;
}

.inventory-cell.drag-over {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>