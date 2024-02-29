<template>
  <div class="header">
    <header>
      <router-link to="/" class="header-title">
        <h1>AniList Bis</h1>
      </router-link>
      <div>
        <router-link to="/watchlist" class="view-list-btn"
          >My watchlist</router-link
        >
      </div>
    </header>
    <div class="search-bar">
      <SearchBar />
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
  name: 'Header',
  components: { SearchBar },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  background-color: #22303b; 
  color: #f5af0d; 
  padding: 1rem;
  width: 100%;
}

.header-title {
  text-decoration: none; 
  color: #f5af0d; 
}

header {
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-wrap: wrap; 
}

.header div:first-child {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}


.header h1 {
  margin: 0;
}

body,
html {
  margin: 0;
  padding: 0;
}

.search-bar {
  display: flex;
  justify-content: flex-end; 
  margin-right: 2rem;
}
.view-list-btn {
  padding: 8px 16px; 
  margin-left: 20px;
  font-size: 1rem;
  color: #f5af0d; 
  background-color: #1a2a33; 
  border: 1px solid #f5af0d;
  border-radius: 4px;
  text-decoration: none; 
  cursor: pointer;
  transition: background-color 0.2s ease;
  right: 0;
}

.view-list-btn:hover {
  background-color: #f5af0d; 
  color: #22303b;
}
</style>
