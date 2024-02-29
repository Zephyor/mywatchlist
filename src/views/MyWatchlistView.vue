<template>
  <div class="page-container">
    <h2>My Watchlist</h2>
    <div class="anime-list" v-if="animeList.length">
      <Card v-for="anime in animeList" :key="anime.mal_id" :anime="anime" />
    </div>
    <div v-else>No anime in watchlist.</div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import Card from '@/components/Card.vue';
import { getOneAnime } from '@/api/services.js';

export default {
  components: {
    Card,
  },
  setup() {
    const state = reactive({
      animeList: [],
    });

    const fetchAnimeDetails = async () => {
      const ids = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('isInWatchlist_')) {
          const id = key.split('_')[1];
          ids.push(id);
        }
      }

      if (ids.length === 0) return;

      const animePromises = ids.map((id) => getOneAnime(id));

      try {
        const animeDetailsResponses = await Promise.all(animePromises);
        state.animeList = animeDetailsResponses.map(
          (response) => response.data
        );
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    onMounted(fetchAnimeDetails);

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f1f1f1;
  margin: 0;
  padding: 0;
}

.h2 {
  color: #f5af0d;
}
.page-container {
  padding: 20px;
}

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
