<template>
  <div>
    <h1>Suppliers</h1>

    <!-- Search Bar Component -->
    <SearchBar @search="handleSearch" />

    <button @click="showAddModal = true" class="add-button">
      Add Supplier
    </button>

    <!-- Add Supplier Modal -->
    <AddSupplierModal
      :showModal="showAddModal"
      @close="showAddModal = false"
      @add-supplier="addSupplier"
    />

    <!-- Edit Supplier Modal -->
    <EditSupplierModal
      :showModal="showEditModal"
      :supplier="selectedSupplier"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="supplier in filteredSuppliers" :key="supplier.id">
        <h2>{{ supplier.name }}</h2>
        <p><strong>Email:</strong> <br /><br />{{ supplier.email }}</p>
        <p><strong>Phone:</strong><br /><br />{{ supplier.phone }}</p>
        <p><strong>Address:</strong> <br /><br />{{ supplier.address }}</p>
        <div class="card-buttons">
          <button @click="editSupplier(supplier)" class="edit-button">
            Edit
          </button>
          <button class="delete-button" @click="deleteSupplier(supplier.id)">
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
import AddSupplierModal from "./AddSupplierModal.vue";
import EditSupplierModal from "./EditSupplierModal.vue";
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    AddSupplierModal,
    EditSupplierModal,
    SearchBar,
  },
  setup() {
    const store = useStore();
    const suppliers = computed(() => store.state.suppliers);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedSupplier = ref(null);
    const searchQuery = ref("");

    async function fetchSuppliers() {
      store.dispatch("fetchSuppliers");
    }

    const filteredSuppliers = computed(() => {
      if (!searchQuery.value) {
        return suppliers.value;
      }
      return suppliers.value.filter(
        (supplier) =>
          supplier.name.includes(searchQuery.value) ||
          supplier.email.includes(searchQuery.value) ||
          supplier.phone.includes(searchQuery.value) ||
          supplier.address.includes(searchQuery.value)
      );
    });

    function handleSearch(query) {
      searchQuery.value = query;
    }

    async function editSupplier(supplier) {
      selectedSupplier.value = supplier;
      showEditModal.value = true;
    }

    async function deleteSupplier(id) {
      try {
        await store.dispatch("deleteSupplier", id);
      } catch (error) {
        console.error("Failed to delete supplier:", error);
      }
    }

    onMounted(fetchSuppliers);

    return {
      filteredSuppliers,
      editSupplier,
      deleteSupplier,
      showAddModal,
      showEditModal,
      selectedSupplier,
      handleSearch,
    };
  },
};
</script>
