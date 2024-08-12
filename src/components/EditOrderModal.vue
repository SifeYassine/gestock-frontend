<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Order</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="number"
          placeholder="Total Price"
          v-model="orderInfo.total_price"
          id="total_price"
          step="0.01"
          min="0"
          required
          class="input-field"
        />

        <select
          name="status"
          v-model="orderInfo.status"
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
          v-model="orderInfo.customer_id"
          id="customer_id"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="User ID"
          v-model="orderInfo.user_id"
          id="user_id"
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
    order: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const orderInfo = ref(props.order);

    // Watch for changes and update orderInfo
    watchEffect(() => {
      orderInfo.value = props.order;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateOrder", orderInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { orderInfo, submitForm, closeModal };
  },
};
</script>
