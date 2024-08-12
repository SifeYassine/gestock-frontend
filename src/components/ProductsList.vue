<template>
  <div>
    <h1>Products</h1>
    <button @click="showAddModal = true" class="add-button">Add Product</button>

    <!-- Add Product Modal -->
    <AddProductModal :showModal="showAddModal" @close="showAddModal = false" />

    <!-- Edit Product Modal -->
    <EditProductModal
      :showModal="showEditModal"
      :product="selectedProduct"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="product in products" :key="product.id">
        <h2>{{ product.name }}</h2>
        <p>
          <strong>Description:</strong><br /><br />
          {{ product.description }}
        </p>
        <p><strong>Price:</strong> {{ product.price }} $</p>
        <div class="card-buttons">
          <button @click="editProduct(product)" class="edit-button">
            Edit
          </button>
          <button @click="deleteProduct(product.id)" class="delete-button">
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
import AddProductModal from "./AddProductModal.vue";
import EditProductModal from "./EditProductModal.vue";

export default {
  components: {
    AddProductModal,
    EditProductModal,
  },
  setup() {
    const store = useStore();
    const products = computed(() => store.state.products);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedProduct = ref(null);

    function fetchProducts() {
      store.dispatch("fetchProducts");
    }

    async function editProduct(product) {
      selectedProduct.value = product;
      showEditModal.value = true;
    }

    async function deleteProduct(id) {
      try {
        await store.dispatch("deleteProduct", id);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }

    onMounted(fetchProducts);

    return {
      products,
      deleteProduct,
      editProduct,
      showAddModal,
      showEditModal,
      selectedProduct,
    };
  },
};
</script>
