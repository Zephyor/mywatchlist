import axios from 'axios';

export async function fetchTopAnimeList() {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/top/anime`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching anime list:', error);
    return [];
  }
}

export async function getOneAnime(animeId) {
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return null;
  }
}
