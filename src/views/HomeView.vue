<template>
  <div>
    <div class="anime-list">
      <Card
        v-for="anime in filteredAnimeList"
        :key="anime.mal_id"
        :anime="anime"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import Card from '@/components/Card.vue';
import { fetchTopAnimeList } from '@/api/services.js';
import { useSearchStore } from '@/stores/store';

export default {
  components: {
    Card,
  },
  data() {
    return {
      animeList: [],
    };
  },
  computed: {
    filteredAnimeList() {
      const searchStore = useSearchStore();
      const query = searchStore.searchQuery.toLowerCase();
      if (!query) return this.animeList;
      return this.animeList.filter((anime) =>
        anime.title.toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    try {
      this.animeList = await fetchTopAnimeList();
    } catch (error) {
      console.error('Error fetching anime list:', error);
    }
  },
};
</script>

<style scoped>
.anime-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.anime-card {
  border: 1px solid #f5af0d;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 1rem;
}
</style>
