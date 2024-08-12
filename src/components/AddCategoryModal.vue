<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Add Category</h3>
      <form @submit.prevent="submitForm" class="add-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="newCategory.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Description"
          v-model="newCategory.description"
          id="description"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button">Add Category</button>
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
    const newCategory = ref({ name: "", description: "" });

    async function submitForm() {
      try {
        await store.dispatch("addCategory", newCategory.value);
        // Clear the form
        newCategory.value = { name: "", description: "" };
        // Close modal
        emit("close");
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { newCategory, submitForm, closeModal };
  },
};
</script>
