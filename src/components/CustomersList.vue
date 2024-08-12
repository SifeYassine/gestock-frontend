<template>
  <div>
    <h1>Customers</h1>
    <button @click="showAddModal = true" class="add-button">
      Add Customer
    </button>

    <!-- Add Customer Modal -->
    <AddCustomerModal
      :showModal="showAddModal"
      @close="showAddModal = false"
      @add-customer="addCustomer"
    />

    <!-- Edit Customer Modal -->
    <EditCustomerModal
      :showModal="showEditModal"
      :customer="selectedCustomer"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="customer in customers" :key="customer.id">
        <h2>{{ customer.name }}</h2>
        <p>
          <strong>Email:</strong> <br /><br />
          {{ customer.email }}
        </p>
        <p>
          <strong>Phone:</strong><br /><br />
          {{ customer.phone }}
        </p>
        <p><strong>Address:</strong> <br /><br />{{ customer.address }}</p>
        <div class="card-buttons">
          <button @click="editCustomer(customer)" class="edit-button">
            Edit
          </button>
          <button @click="deleteCustomer(customer.id)" class="delete-button">
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
import AddCustomerModal from "./AddCustomerModal.vue";
import EditCustomerModal from "./EditCustomerModal.vue";

export default {
  components: {
    AddCustomerModal,
    EditCustomerModal,
  },
  setup() {
    const store = useStore();
    const customers = computed(() => store.state.customers);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedCustomer = ref(null);

    async function fetchCustomers() {
      store.dispatch("fetchCustomers");
    }

    async function editCustomer(customer) {
      selectedCustomer.value = customer;
      showEditModal.value = true;
    }

    async function deleteCustomer(id) {
      try {
        await store.dispatch("deleteCustomer", id);
      } catch (error) {
        console.error("Failed to delete customer:", error);
      }
    }

    onMounted(fetchCustomers);

    return {
      customers,
      deleteCustomer,
      editCustomer,
      showAddModal,
      showEditModal,
      selectedCustomer,
    };
  },
};
</script>
