<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Supplier</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="supplierInfo.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Email"
          v-model="supplierInfo.email"
          id="email"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Phone"
          v-model="supplierInfo.phone"
          id="phone"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Address"
          v-model="supplierInfo.address"
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
    supplier: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const supplierInfo = ref(props.supplier);

    // Watch for changes and update supplierInfo
    watchEffect(() => {
      supplierInfo.value = props.supplier;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateSupplier", supplierInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update supplier:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { supplierInfo, submitForm, closeModal };
  },
};
</script>
