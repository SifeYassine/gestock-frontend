import { createStore } from "vuex";
import axios from "@/api/axios";

export default createStore({
  state: {
    users: [],
    roles: [],
    role_id: null,
    customers: [],
    orders: [],
    categories: [],
    suppliers: [],
    products: [],
    inventories: [],
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    setCustomers(state, customers) {
      state.customers = customers;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSuppliers(state, suppliers) {
      state.suppliers = suppliers;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setInventories(state, inventories) {
      state.inventories = inventories;
    },
    setToken(state, { token, role_id }) {
      state.token = token;
      state.role_id = role_id;
      localStorage.setItem("token", token);
      localStorage.setItem("role_id", role_id);
    },

    clearToken(state) {
      state.token = "";
      state.role_id = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
    },
    clearUsers(state) {
      state.users = [];
    },
    clearRoles(state) {
      state.roles = [];
    },
    clearCustomers(state) {
      state.customers = [];
    },
    clearOrders(state) {
      state.orders = [];
    },
    clearCategories(state) {
      state.categories = [];
    },
    clearSuppliers(state) {
      state.suppliers = [];
    },
    clearProducts(state) {
      state.products = [];
    },
    clearInventories(state) {
      state.inventories = [];
    },
  },
  actions: {
    async register({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/register", credentials);
        commit("setToken", data.access_token);
      } catch (error) {
        console.error(error);
      }
    },

    async login({ commit }, credentials) {
      try {
        const { data } = await axios.post("/auth/login", credentials);
        commit("setToken", {
          token: data.access_token,
          role_id: data.user.role_id,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async logout({ commit }) {
      await axios.post("/auth/logout");
      commit("clearToken");
      commit("clearProducts");
      commit("clearCategories");
      commit("clearSuppliers");
      commit("clearInventories");
      commit("clearOrders");
      commit("clearCustomers");
      commit("clearUsers");
      commit("clearRoles");
    },

    // Users CRUD
    async fetchUsers({ commit }) {
      try {
        const { data } = await axios.get("/users/index");
        commit("setUsers", data.users);
      } catch (error) {
        console.error(error);
      }
    },

    async updateUser({ commit, state }, user) {
      try {
        const { data } = await axios.put(`/users/update/${user.id}`, user);
        // Update the state with the updated user
        commit(
          "setUsers",
          state.users.map((usr) => (usr.id === user.id ? data.user : usr))
        );
      } catch (error) {
        console.error(error);
      }
    },

    async deleteUser({ commit, state }, userId) {
      try {
        await axios.delete(`/users/delete/${userId}`);
        // Remove the deleted user from the state
        commit(
          "setUsers",
          state.users.filter((user) => user.id !== userId)
        );
      } catch (error) {
        console.error(error);
      }
    },

    // Roles CRUD
    async fetchRoles({ commit }) {
      try {
        const { data } = await axios.get("/roles/index");
        commit("setRoles", data.roles);
      } catch (error) {
        console.error(error);
      }
    },

    // Customers CRUD
    async fetchCustomers({ commit }) {
      try {
        const { data } = await axios.get("/customers/index");
        commit("setCustomers", data.customers);
      } catch (error) {
        console.error(error);
      }
    },

    async addCustomer({ commit, state }, customer) {
      try {
        const { data } = await axios.post("/customers/create", customer);
        // Update the state with the newly added customer
        commit("setCustomers", [...state.customers, data.customer]);
      } catch (error) {
        console.error("Failed to add customer:", error);
      }
    },

    async updateCustomer({ commit, state }, customer) {
      try {
        const { data } = await axios.put(
          `/customers/update/${customer.id}`,
          customer
        );
        // Update the state with the updated customer
        commit(
          "setCustomers",
          state.customers.map((cust) =>
            cust.id === customer.id ? data.customer : cust
          )
        );
      } catch (error) {
        console.error("Failed to update customer:", error);
      }
    },

    async deleteCustomer({ commit, state }, id) {
      try {
        await axios.delete(`/customers/delete/${id}`);
        // Update the state after successful deletion
        const updatedCustomers = state.customers.filter(
          (customer) => customer.id !== id
        );
        commit("setCustomers", updatedCustomers);
      } catch (error) {
        console.error("Failed to delete customer:", error);
      }
    },

    // Orders CRUD
    async fetchOrders({ commit }) {
      try {
        const { data } = await axios.get("/orders/index");
        commit("setOrders", data.orders);
      } catch (error) {
        console.error(error);
      }
    },

    async addOrder({ commit, state }, order) {
      try {
        const { data } = await axios.post("/orders/create", order);
        // Update the state with the newly added order
        commit("setOrders", [...state.orders, data.order]);
      } catch (error) {
        console.error("Failed to add order:", error);
      }
    },

    async updateOrder({ commit, state }, order) {
      try {
        const { data } = await axios.put(`/orders/update/${order.id}`, order);
        // Update the state with the updated order
        const updatedOrders = state.orders.map((ord) =>
          ord.id === data.order.id ? data.order : ord
        );
        commit("setOrders", updatedOrders);
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    },

    async deleteOrder({ commit, state }, id) {
      try {
        await axios.delete(`/orders/delete/${id}`);
        // Update the state after successful deletion
        const updatedOrders = state.orders.filter((order) => order.id !== id);
        commit("setOrders", updatedOrders);
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    },

    // Categories CRUD
    async fetchCategories({ commit }) {
      try {
        const { data } = await axios.get("/categories/index");
        commit("setCategories", data.categories);
      } catch (error) {
        console.error(error);
      }
    },

    async addCategory({ commit, state }, category) {
      try {
        const { data } = await axios.post("/categories/create", category);
        // Update the state with the newly added category
        commit("setCategories", [...state.categories, data.category]);
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    },

    async updateCategory({ commit, state }, category) {
      try {
        const { data } = await axios.put(
          `/categories/update/${category.id}`,
          category
        );
        // Update the state with the updated category
        const updatedCategory = state.categories.map((categ) =>
          categ.id === data.category.id ? data.category : categ
        );
        commit("setCategories", updatedCategory);
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },

    async deleteCategory({ commit, state }, id) {
      try {
        await axios.delete(`/categories/delete/${id}`);
        // Update the state after successful deletion
        const updatedCategories = state.categories.filter(
          (category) => category.id !== id
        );
        commit("setCategories", updatedCategories);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    },

    // Suppliers CRUD
    async fetchSuppliers({ commit }) {
      try {
        const { data } = await axios.get("/suppliers/index");
        commit("setSuppliers", data.suppliers);
      } catch (error) {
        console.error(error);
      }
    },

    async addSupplier({ commit, state }, supplier) {
      try {
        const { data } = await axios.post("/suppliers/create", supplier);
        // Update the state with the newly added supplier
        commit("setSuppliers", [...state.suppliers, data.supplier]);
      } catch (error) {
        console.error("Failed to add supplier:", error);
      }
    },

    async updateSupplier({ commit, state }, supplier) {
      try {
        const { data } = await axios.put(
          `/suppliers/update/${supplier.id}`,
          supplier
        );
        // Update the state with the updated supplier
        const updatedSuppliers = state.suppliers.map((supp) =>
          supp.id === data.supplier.id ? data.supplier : supp
        );
        commit("setSuppliers", updatedSuppliers);
      } catch (error) {
        console.error("Failed to update supplier:", error);
      }
    },

    async deleteSupplier({ commit, state }, id) {
      try {
        await axios.delete(`/suppliers/delete/${id}`);
        // Update the state after successful deletion
        const updatedSuppliers = state.suppliers.filter(
          (supplier) => supplier.id !== id
        );
        commit("setSuppliers", updatedSuppliers);
      } catch (error) {
        console.error("Failed to delete supplier:", error);
      }
    },

    // Products CRUD
    async fetchProducts({ commit }) {
      try {
        const { data } = await axios.get("/products/index");
        commit("setProducts", data.products);
      } catch (error) {
        console.error(error);
      }
    },

    async addProduct({ commit, state }, product) {
      try {
        const { data } = await axios.post("/products/create", product);
        // Update the state with the newly added product
        commit("setProducts", [...state.products, data.product]);
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    },

    async updateProduct({ commit, state }, product) {
      try {
        const { data } = await axios.put(
          `/products/update/${product.id}`,
          product
        );
        // Update the state with the updated product
        const updatedProducts = state.products.map((prod) =>
          prod.id === data.product.id ? data.product : prod
        );
        commit("setProducts", updatedProducts);
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    },

    async deleteProduct({ commit, state }, id) {
      try {
        await axios.delete(`/products/delete/${id}`);
        // Update the state after successful deletion
        const updatedProducts = state.products.filter(
          (product) => product.id !== id
        );
        commit("setProducts", updatedProducts);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    },

    // Inventories CRUD
    async fetchInventories({ commit }) {
      try {
        const { data } = await axios.get("/inventories/index");
        commit("setInventories", data.inventories);
      } catch (error) {
        console.error(error);
      }
    },

    async addInventory({ commit, state }, inventory) {
      try {
        const { data } = await axios.post("/inventories/create", inventory);
        // Update the state with the newly added inventory
        commit("setInventories", [...state.inventories, data.inventory]);
      } catch (error) {
        console.error("Failed to add inventory:", error);
      }
    },

    async updateInventory({ commit, state }, inventory) {
      try {
        const { data } = await axios.put(
          `/inventories/update/${inventory.id}`,
          inventory
        );
        // Update the state with the updated inventory
        const updatedInventories = state.inventories.map((invt) =>
          invt.id === data.inventory.id ? data.inventory : invt
        );
        commit("setInventories", updatedInventories);
      } catch (error) {
        console.error("Failed to update inventory:", error);
      }
    },

    async deleteInventory({ commit, state }, id) {
      try {
        await axios.delete(`/inventories/delete/${id}`);
        // Update the state after successful deletion
        const updatedInventories = state.inventories.filter(
          (inventory) => inventory.id !== id
        );
        commit("setInventories", updatedInventories);
      } catch (error) {
        console.error("Failed to delete inventory:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.token,
    isAdmin: (state) => state.role_id === 1,
  },
});
