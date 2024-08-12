<template>
  <div>
    <h1>Categories</h1>
    <button @click="showAddModal = true" class="add-button">
      Add Category
    </button>

    <!-- Add Category Modal -->
    <AddCategoryModal :showModal="showAddModal" @close="showAddModal = false" />

    <!-- Edit Category Modal -->
    <EditCategoryModal
      :showModal="showEditModal"
      :category="selectedCategory"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="category in categories" :key="category.id">
        <h2>{{ category.name }}</h2>
        <p>
          <strong>Description:</strong> <br /><br />
          {{ category.description }}
        </p>
        <div class="card-buttons">
          <button @click="editCategory(category)" class="edit-button">
            Edit
          </button>
          <button @click="deleteCategory(category.id)" class="delete-button">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AddCategoryModal from "./AddCategoryModal.vue";
import EditCategoryModal from "./EditCategoryModal.vue";

export default {
  components: {
    AddCategoryModal,
    EditCategoryModal,
  },
  setup() {
    const store = useStore();
    const categories = computed(() => store.state.categories);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedCategory = ref(null);

    async function fetchCategories() {
      store.dispatch("fetchCategories");
    }

    async function editCategory(category) {
      selectedCategory.value = category;
      showEditModal.value = true;
    }

    async function deleteCategory(id) {
      try {
        await store.dispatch("deleteCategory", id);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }

    onMounted(fetchCategories);

    return {
      categories,
      deleteCategory,
      editCategory,
      showAddModal,
      showEditModal,
      selectedCategory,
    };
  },
};
</script>
