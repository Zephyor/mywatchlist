<template>
  <input
    class="custom-input"
    type="text"
    v-model="searchQuery"
    @input="updateSearchQuery"
    placeholder="Search anime by name..."
  />
</template>

<script>
import { useSearchStore } from '@/stores/store.js'; 

export default {
  setup() {
    const searchStore = useSearchStore();
    const searchQuery = searchStore.searchQuery; 

    const updateSearchQuery = (event) => {
      searchStore.setSearchQuery(event.target.value); 
    };

    return {
      searchQuery,
      updateSearchQuery,
    };
  },
};
</script>

<style scoped>
.custom-input {
  background-color: #30414f;
  color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 16px;
  width: 300px;
  box-sizing: border-box; 
}


.custom-input:focus {
  outline: none;
  border-color: #f5af0d;
}
</style>
