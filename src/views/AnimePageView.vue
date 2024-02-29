<template>
  <div class="anime-page-container">
    <Card v-if="anime" :anime="anime" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getOneAnime } from '@/api/services.js';
import Card from '@/components/Card.vue';
export default {
  components: {
    Card,
  },
  setup() {
    const route = useRoute();
    const anime = ref(null);

    onMounted(async () => {
      const animeId = route.params.id;
      const fetchedAnime = await getOneAnime(animeId);
      anime.value = fetchedAnime.data;
    });

    return {
      anime,
    };
  },
};
</script>

<style scoped>
.anime-page-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
