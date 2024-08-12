<template>
  <div>
    <h1>Inventories</h1>
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
      <li v-for="inventorie in inventories" :key="inventorie.id">
        <h2>Inventory Id: {{ inventorie.id }}</h2>
        <p><strong>Capacity:</strong> {{ inventorie.capacity }}</p>
        <p><strong>Current Stock:</strong> {{ inventorie.current_stock }}</p>
        <p>
          <strong>Location:</strong> <br /><br />
          {{ inventorie.location }}
        </p>
        <div class="card-buttons">
          <button @click="editInventory(inventorie)" class="edit-button">
            Edit
          </button>
          <button @click="deleteInventory(inventorie.id)" class="delete-button">
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

export default {
  components: {
    AddInventoryModal,
    EditInventoryModal,
  },
  setup() {
    const store = useStore();
    const inventories = computed(() => store.state.inventories);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedInventory = ref(null);

    async function fetchInventories() {
      store.dispatch("fetchInventories");
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
      inventories,
      deleteInventory,
      editInventory,
      showAddModal,
      showEditModal,
      selectedInventory,
    };
  },
};
</script>
