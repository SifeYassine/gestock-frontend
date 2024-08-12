<template>
  <div id="app" @click="closeSidebarOnClickOutside">
    <nav>
      <div class="logo"><img src="@/assets/logo.png" alt="Logo" /></div>
      <div>
        <!-- Hamburger Icon -->
        <button @click="toggleSidebar" class="hamburger-icon">&#9776;</button>
      </div>
    </nav>

    <!-- Sidebar Menu -->
    <div v-if="isSidebarOpen" class="sidebar">
      <router-link v-if="$route.path !== '/'" to="/" class="nav-button"
        >Home</router-link
      >

      <router-link
        v-if="isAuthenticated && isAdmin"
        to="/admin"
        class="nav-button"
        >Admin Panel</router-link
      >

      <router-link v-if="isAuthenticated" to="/products" class="nav-button"
        >Products</router-link
      >
      <router-link v-if="isAuthenticated" to="/categories" class="nav-button"
        >Categories</router-link
      >
      <router-link v-if="isAuthenticated" to="/orders" class="nav-button"
        >Orders</router-link
      >
      <router-link v-if="isAuthenticated" to="/customers" class="nav-button"
        >Customers</router-link
      >

      <router-link v-if="isAuthenticated" to="/suppliers" class="nav-button"
        >Suppliers</router-link
      >
      <router-link v-if="isAuthenticated" to="/inventories" class="nav-button"
        >Inventories</router-link
      >

      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="nav-button login-button"
        >Login</router-link
      >
      <router-link
        v-if="!isAuthenticated"
        to="/register"
        class="nav-button register-button"
        >Register</router-link
      >
      <button v-else @click="logout" class="nav-button logout-button">
        Logout
      </button>
    </div>

    <router-view />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const isAdmin = computed(() => store.getters.isAdmin);
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebarOnClickOutside = (event) => {
      if (
        isSidebarOpen.value &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".hamburger-icon")
      ) {
        isSidebarOpen.value = false;
      }
    };

    const logout = () => {
      store.dispatch("logout");
      router.push("/login");
      isSidebarOpen.value = false;
    };

    return {
      isAuthenticated,
      isAdmin,
      isSidebarOpen,
      toggleSidebar,
      closeSidebarOnClickOutside,
      logout,
    };
  },
};
</script>
