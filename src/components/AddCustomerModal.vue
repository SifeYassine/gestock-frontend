<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Add Customer</h3>
      <form @submit.prevent="submitForm" class="add-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="newCustomer.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Email"
          v-model="newCustomer.email"
          id="email"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Phone"
          v-model="newCustomer.phone"
          id="phone"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Address"
          v-model="newCustomer.address"
          id="address"
          required
          class="input-field"
        />

        <button type="submit" class="submit-button">Add Customer</button>
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
    const newCustomer = ref({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    async function submitForm() {
      try {
        await store.dispatch("addCustomer", newCustomer.value);
        // Clear the form
        newCustomer.value = {
          name: "",
          email: "",
          phone: "",
          address: "",
        };
        // Close modal
        emit("close");
      } catch (error) {
        console.error("Failed to add customer:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { newCustomer, submitForm, closeModal };
  },
};
</script>
