<template>
  <div class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="login" class="login-form">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="input-field"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input-field"
      />
      <button type="submit" class="submit-button">Login</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
}

.login-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.input-field {
  width: 80%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  outline: none;
  background-color: white;
}

.input-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(38, 143, 255, 0.2);
}

.submit-button {
  width: 70%;
  padding: 0.75rem;
  border: none;
  border-radius: 50px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const login = async () => {
      await store.dispatch("login", {
        username: username.value,
        password: password.value,
      });
      router.push("/products");
    };

    return { username, password, login };
  },
};
</script>
