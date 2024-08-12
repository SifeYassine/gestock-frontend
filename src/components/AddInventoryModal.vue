<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Add Inventory</h3>
      <form @submit.prevent="submitForm" class="add-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="number"
          placeholder="Capacity"
          v-model="newInventory.capacity"
          id="capacity"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Current Stock"
          v-model="newInventory.current_stock"
          id="current_stock"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Location"
          v-model="newInventory.location"
          id="location"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button">Add Inventory</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    showModal: Boolean,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const newInventory = ref({
      capacity: "",
      current_stock: "",
      location: "",
    });

    async function submitForm() {
      try {
        await store.dispatch("addInventory", newInventory.value);
        // Clear the form
        newInventory.value = {
          capacity: "",
          current_stock: "",
          location: "",
        };
        // Close modal
        emit("close");
      } catch (error) {
        console.error("Failed to add Inventory:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { newInventory, submitForm, closeModal };
  },
};
</script>
