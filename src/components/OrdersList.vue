<template>
  <div>
    <h1>Orders</h1>
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
      <li v-for="order in orders" :key="order.id">
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

export default {
  components: {
    AddOrderModal,
    EditOrderModal,
  },
  setup() {
    const store = useStore();
    const orders = computed(() => store.state.orders);
    const customers = computed(() => store.state.customers);

    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedOrder = ref(null);

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
      orders,
      deleteOrder,
      editOrder,
      customers,
      getCustomerById,
      showAddModal,
      showEditModal,
      selectedOrder,
    };
  },
};
</script>
