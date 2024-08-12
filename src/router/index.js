import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/LoginForm.vue";
import Register from "@/components/RegisterForm.vue";
import Customers from "@/components/CustomersList.vue";
import Orders from "@/components/OrdersList.vue";
import Categories from "@/components/CategoriesList.vue";
import Suppliers from "@/components/SuppliersList.vue";
import Products from "@/components/ProductsList.vue";
import Inventories from "@/components/InventoriesList.vue";
import AdminPanel from "@/components/AdminPanel.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/customers", component: Customers },
  { path: "/orders", component: Orders },
  { path: "/categories", component: Categories },
  { path: "/suppliers", component: Suppliers },
  { path: "/products", component: Products },
  { path: "/inventories", component: Inventories },
  { path: "/admin", component: AdminPanel },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
