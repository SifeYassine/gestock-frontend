<template>
  <div>
    <h1>Inventories</h1>

    <!-- Search Bar Component -->
    <SearchBar @search="handleSearch" />

    <button @click="showAddModal = true" class="add-button">
      Add Inventory
    </button>

    <!-- Add Inventory Modal -->
    <AddInventoryModal
      :showModal="showAddModal"
      @close="showAddModal = false"
      @add-inventory="addInventory"
    />

    <!-- Edit Inventory Modal -->
    <EditInventoryModal
      :showModal="showEditModal"
      :inventory="selectedInventory"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="inventory in filteredInventories" :key="inventory.id">
        <h2>Inventory Id: {{ inventory.id }}</h2>
        <p><strong>Capacity:</strong> {{ inventory.capacity }}</p>
        <p><strong>Current Stock:</strong> {{ inventory.current_stock }}</p>
        <p>
          <strong>Location:</strong> <br /><br />
          {{ inventory.location }}
        </p>
        <div class="card-buttons">
          <button @click="editInventory(inventory)" class="edit-button">
            Edit
          </button>
          <button @click="deleteInventory(inventory.id)" class="delete-button">
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
import AddInventoryModal from "./AddInventoryModal.vue";
import EditInventoryModal from "./EditInventoryModal.vue";
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    AddInventoryModal,
    EditInventoryModal,
    SearchBar,
  },
  setup() {
    const store = useStore();
    const inventories = computed(() => store.state.inventories);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedInventory = ref(null);
    const searchQuery = ref("");

    async function fetchInventories() {
      store.dispatch("fetchInventories");
    }

    const filteredInventories = computed(() => {
      if (!searchQuery.value) {
        return inventories.value;
      }
      return inventories.value.filter(
        (inventory) =>
          inventory.id.toString().includes(searchQuery.value) ||
          inventory.capacity.toString().includes(searchQuery.value) ||
          inventory.current_stock.toString().includes(searchQuery.value) ||
          inventory.location.includes(searchQuery.value)
      );
    });

    function handleSearch(query) {
      searchQuery.value = query;
    }

    async function editInventory(inventory) {
      selectedInventory.value = inventory;
      showEditModal.value = true;
    }

    async function deleteInventory(id) {
      try {
        await store.dispatch("deleteInventory", id);
      } catch (error) {
        console.error("Failed to delete inventory:", error);
      }
    }

    onMounted(fetchInventories);

    return {
      filteredInventories,
      editInventory,
      deleteInventory,
      showAddModal,
      showEditModal,
      selectedInventory,
      handleSearch,
    };
  },
};
</script>
