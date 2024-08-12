<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Customer</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="customerInfo.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Email"
          v-model="customerInfo.email"
          id="email"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Phone"
          v-model="customerInfo.phone"
          id="phone"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Address"
          v-model="customerInfo.address"
          id="address"
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
    customer: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const customerInfo = ref(props.customer);

    // Watch for changes and update customerInfo
    watchEffect(() => {
      customerInfo.value = props.customer;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateCustomer", customerInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update customer:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { customerInfo, submitForm, closeModal };
  },
};
</script>
