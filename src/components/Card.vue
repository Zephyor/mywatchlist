<template>
  <div class="anime-card" @click="navigateToAnimePage">
    <img
      :src="anime.images.jpg.image_url"
      :alt="anime.title"
      class="anime-image"
      @error="imageError"
      @load="imageLoaded"
      v-if="imageStatus !== 'error'"
    />
    <div v-else class="image-placeholder">Image Not Available</div>
    <div class="anime-info">
      <h3 class="anime-title">{{ anime.title }}</h3>
      <p class="anime-synopsis" v-if="anime.synopsis">{{ anime.synopsis }}</p>
      <p class="anime-synopsis" v-else>No synopsis available.</p>
      <div class="rating-container" @click.stop>
        <span
          v-for="star in 5"
          :key="star"
          class="star"
          @click="setRating(star)"
        >
          {{ rating >= star ? '★' : '☆' }}
        </span>
      </div>
      <div class="buttons">
        <button @click.stop="toggleWatchlist" class="watchlist-btn">
        {{ watchlistButtonText }}
        </button>
        <button @click.stop="toggleSeen" class="seen-btn">
          {{ seenButton }}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { useWatchlistStore } from '@/stores/store.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Card',
  props: {
    anime: {
      type: Object,
      required: true,
      validator(value) {
        return !!value.images && !!value.title;
      },
    },
  },
  setup(props) {
    const router = useRouter();
    const watchlistStore = useWatchlistStore();
    const rating = ref(0);
    const isSeen = ref(false);
    const animeId = props.anime.mal_id;

    const isInWatchlist = ref(false);
    if (localStorage.getItem(`isInWatchlist_${animeId}`)) {
      isInWatchlist.value = JSON.parse(
        localStorage.getItem(`isInWatchlist_${animeId}`)
      );
    }
    watch(isInWatchlist, (newValue) => {
      localStorage.setItem(
        `isInWatchlist_${animeId}`,
        JSON.stringify(newValue)
      );
    });

    if (localStorage.getItem(`isSeen_${animeId}`)) {
      isSeen.value = JSON.parse(localStorage.getItem(`isSeen_${animeId}`));
    }
    watch(isSeen, (newValue) => {
      localStorage.setItem(`isSeen_${animeId}`, JSON.stringify(newValue));
    });

    function toggleSeen() {
      isSeen.value = !isSeen.value;
    }

    const seenButton = computed(() => {
      return isSeen.value ? 'Mark as Unseen' : 'Mark as Seen';
    });

    function toggleWatchlist() {
      if (isInWatchlist.value) {
        watchlistStore.removeFromWatchlist(props.anime.mal_id);
      } else {
        watchlistStore.addToWatchlist(props.anime.mal_id);
      }
      isInWatchlist.value = !isInWatchlist.value;
    }

    function navigateToAnimePage() {
      router.push({ name: 'AnimePage', params: { id: props.anime.mal_id } });
    }

    if (localStorage.getItem(`rating_${animeId}`)) {
      rating.value = parseInt(localStorage.getItem(`rating_${animeId}`));
    }

    watch(rating, (newRating) => {
      localStorage.setItem(`rating_${animeId}`, newRating);
    });

    function setRating(star) {
      rating.value = star;
    }

    const watchlistButtonText = computed(() => {
      return isInWatchlist.value ? 'Remove from Watchlist' : 'Add to Watchlist';
    });

    return {
      isInWatchlist,
      toggleWatchlist,
      watchlistButtonText,
      setRating,
      rating,
      navigateToAnimePage,
      isSeen,
      toggleSeen,
      seenButton
    };
  },
  data() {
    return {
      imageStatus: 'loading',
    };
  },
  methods: {
    imageLoaded() {
      this.imageStatus = 'loaded';
    },
    imageError() {
      this.imageStatus = 'error';
    },
  },
});
</script>

<style scoped>
.anime-card {
  display: flex;
  border: 1px solid #f5af0d;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 2rem;
}

.anime-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.anime-media {
  flex-shrink: 0;
}

.rating-container {
  display: inline-flex;
  margin-right: 8px;
  cursor: pointer;
}

.star {
  color: gold;
  margin-right: 4px;
  font-size: 1.5rem;
}
.anime-image {
  width: auto;
  height: 100%;
  display: block;
}

.anime-info {
  padding: 16px;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 100%; 
}

.anime-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #f5af0d;
}

.anime-synopsis {
  margin-top: 8px;
  font-size: 1rem;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.seen-btn, .watchlist-btn {
  padding: 10px 20px;
  font-size: 0.7rem;
  color: #22303b;
  background-color: #f5af0d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.seen-btn:hover {
  background-color: #c48807;
}
.watchlist-btn:hover {
  background-color: #c48807;
}
</style>
