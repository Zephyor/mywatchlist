import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AnimePageView from '../views/AnimePageView.vue';
import MyWatchlistView from '../views/MyWatchlistView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: MyWatchlistView,
    },
    {
      path: '/anime/:id',
      name: 'AnimePage',
      component: AnimePageView,
      props: true,
    },
  ],
});

export default router;
