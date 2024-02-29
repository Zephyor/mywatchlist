import { defineStore } from 'pinia';

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    watchlist: [],
  }),
  actions: {
    addToWatchlist(animeId) {
      if (!this.watchlist.includes(animeId)) {
        this.watchlist.push(animeId);
      }
    },
    removeFromWatchlist(animeId) {
      this.watchlist = this.watchlist.filter((id) => id !== animeId);
    },
    isInWatchlist(animeId) {
      return this.watchlist.includes(animeId);
    },
  },
});

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: '',
  }),
  actions: {
    setSearchQuery(newQuery) {
      this.searchQuery = newQuery;
    },
  },
});
