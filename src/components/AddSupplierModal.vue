<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Add Supplier</h3>
      <form @submit.prevent="submitForm" class="add-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="newSupplier.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Email"
          v-model="newSupplier.email"
          id="email"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Phone"
          v-model="newSupplier.phone"
          id="phone"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Address"
          v-model="newSupplier.address"
          id="address"
          required
          class="input-field"
        />

        <button type="submit" class="submit-button">Add Supplier</button>
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
    const newSupplier = ref({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    async function submitForm() {
      try {
        await store.dispatch("addSupplier", newSupplier.value);
        // Clear the form
        newSupplier.value = {
          name: "",
          email: "",
          phone: "",
          address: "",
        };
        // Close modal
        emit("close");
      } catch (error) {
        console.error("Failed to add supplier:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { newSupplier, submitForm, closeModal };
  },
};
</script>
