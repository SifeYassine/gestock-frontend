<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Category</h3>
      <form @submit.prevent="submitForm" class="edit-form">
        <button type="button" @click="closeModal" class="close-button">
          ✖️
        </button>

        <input
          type="text"
          placeholder="Name"
          v-model="categoryInfo.name"
          id="name"
          required
          class="input-field"
        />

        <input
          type="text"
          placeholder="Description"
          v-model="categoryInfo.description"
          id="description"
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
    category: Object,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();
    const categoryInfo = ref(props.category);

    // Watch for changes and update categoryInfo
    watchEffect(() => {
      categoryInfo.value = props.category;
    });

    async function submitForm() {
      try {
        await store.dispatch("updateCategory", categoryInfo.value);
        emit("close");
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    }

    function closeModal() {
      emit("close");
    }

    return { categoryInfo, submitForm, closeModal };
  },
};
</script>
