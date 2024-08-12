<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Product</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="productInfo.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Description"
          v-model="productInfo.description"
          id="description"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Price"
          v-model="productInfo.price"
          id="price"
          step="0.01"
          min="0"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Category ID"
          v-model="productInfo.category_id"
          id="category_id"
          required
          class="input-field"
        />

        <input
          type="number"
          placeholder="Supplier ID"
          v-model="productInfo.supplier_id"
          id="supplier_id"
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
    product: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const productInfo = ref(props.product);

    // Watch for changes and update productInfo
    watchEffect(() => {
      productInfo.value = props.product;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateProduct", productInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { productInfo, submitForm, closeModal };
  },
};
</script>
