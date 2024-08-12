<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Inventory</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="number"
          placeholder="Capacity"
          v-model="inventoryInfo.capacity"
          id="capacity"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Current Stock"
          v-model="inventoryInfo.current_stock"
          id="current_stock"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Location"
          v-model="inventoryInfo.location"
          id="location"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    showModal: Boolean,
    inventory: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const inventoryInfo = ref(props.inventory);

    // Watch for changes and update inventoryInfo
    watchEffect(() => {
      inventoryInfo.value = props.inventory;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateInventory", inventoryInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update inventory:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { inventoryInfo, submitForm, closeModal };
  },
};
</script>
