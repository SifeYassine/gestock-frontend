<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Add Order</h3>
      <form @submit.prevent="submitForm" class="add-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="number"
          placeholder="Total Price"
          v-model="newOrder.total_price"
          id="total_price"
          step="0.01"
          min="0"
          required
          class="input-field"
        />

        <select
          name="status"
          v-model="newOrder.status"
          class="input-field multi-select"
        >
          <option value="" disabled selected hidden>Status</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="number"
          placeholder="Customer ID"
          v-model="newOrder.customer_id"
          id="customer_id"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="User ID"
          v-model="newOrder.user_id"
          id="user_id"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button">Add Order</button>
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
    const newOrder = ref({
      total_price: "",
      status: "",
      customer_id: "",
      user_id: "",
    });

    async function submitForm() {
      try {
        await store.dispatch("addOrder", newOrder.value);
        // Clear the form
        newOrder.value = {
          total_price: "",
          status: "",
          customer_id: "",
          user_id: "",
        };
        // Close modal
        emit("close");
      } catch (error) {
        console.error("Failed to add Order:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { newOrder, submitForm, closeModal };
  },
};
</script>
