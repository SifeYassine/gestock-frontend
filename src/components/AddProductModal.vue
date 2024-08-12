<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Add Product</h3>
      <form @submit.prevent="submitForm" class="add-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="newProduct.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Description"
          v-model="newProduct.description"
          id="description"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Price"
          v-model="newProduct.price"
          id="price"
          step="0.01"
          min="0"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Category ID"
          v-model="newProduct.category_id"
          id="category_id"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Supplier ID"
          v-model="newProduct.supplier_id"
          id="supplier_id"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button">Add Product</button>
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
    const newProduct = ref({
      name: "",
      description: "",
      price: "",
      category_id: "",
      supplier_id: "",
    });

    async function submitForm() {
      try {
        await store.dispatch("addProduct", newProduct.value);
        // Clear the form
        newProduct.value = {
          name: "",
          description: "",
          price: "",
          category_id: "",
          supplier_id: "",
        };
        // Close modal
        emit("close");
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { newProduct, submitForm, closeModal };
  },
};
</script>
