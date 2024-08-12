<template>
  <div>
    <h1>Orders</h1>

    <!-- Search Bar Component -->
    <SearchBar @search="handleSearch" />

    <button @click="showAddModal = true" class="add-button">Add Order</button>

    <!-- Add Order Modal -->
    <AddOrderModal
      :showModal="showAddModal"
      @close="showAddModal = false"
      @add-order="addOrder"
    />

    <!-- Edit Order Modal -->
    <EditOrderModal
      :showModal="showEditModal"
      :order="selectedOrder"
      @close="showEditModal = false"
    />

    <ul>
      <li v-for="order in filteredOrders" :key="order.id">
        <div v-if="getCustomerById(order.customer_id)" class="customer-info">
          <h2>{{ getCustomerById(order.customer_id).name }}</h2>
          <p><strong>Customer Id:</strong> {{ order.customer_id }}</p>
        </div>
        <p><strong>Total Price:</strong> {{ order.total_price }} $</p>
        <p><strong>Status:</strong> {{ order.status }}</p>
        <div class="card-buttons">
          <button @click="editOrder(order)" class="edit-button">Edit</button>
          <button class="delete-button" @click="deleteOrder(order.id)">
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
import AddOrderModal from "./AddOrderModal.vue";
import EditOrderModal from "./EditOrderModal.vue";
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    AddOrderModal,
    EditOrderModal,
    SearchBar,
  },
  setup() {
    const store = useStore();
    const orders = computed(() => store.state.orders);
    const customers = computed(() => store.state.customers);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedOrder = ref(null);
    const searchQuery = ref("");

    async function fetchOrders() {
      store.dispatch("fetchOrders");
    }

    async function fetchCustomers() {
      store.dispatch("fetchCustomers");
    }

    async function fetchData() {
      await fetchOrders();
      await fetchCustomers();
    }

    const filteredOrders = computed(() => {
      if (!searchQuery.value) {
        return orders.value;
      }
      return orders.value.filter(
        (order) =>
          getCustomerById(order.customer_id).name.includes(searchQuery.value) ||
          order.total_price.toString().includes(searchQuery.value) ||
          order.status.includes(searchQuery.value)
      );
    });

    function handleSearch(query) {
      searchQuery.value = query;
    }

    async function editOrder(order) {
      selectedOrder.value = order;
      showEditModal.value = true;
    }

    async function deleteOrder(id) {
      try {
        await store.dispatch("deleteOrder", id);
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }

    onMounted(fetchData);

    function getCustomerById(id) {
      return customers.value.find((customer) => customer.id === id);
    }

    return {
      filteredOrders,
      editOrder,
      deleteOrder,
      customers,
      getCustomerById,
      showAddModal,
      showEditModal,
      selectedOrder,
      handleSearch,
    };
  },
};
</script>
