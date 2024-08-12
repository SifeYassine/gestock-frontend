<template>
  <div class="search-bar">
    <input
      v-model="query"
      @keyup.enter="search"
      type="text"
      placeholder="Search..."
      class="search-input"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SearchBar",
  emits: ["search"],
  setup(props, { emit }) {
    const query = ref("");

    function search() {
      emit("search", query.value);
    }

    return {
      query,
      search,
    };
  },
};
</script>
