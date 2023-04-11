import { BASE_URL, ANIME_ENDPOINT } from "../constants";
export const fetchAnime = async (query) => {
  const params = new URLSearchParams(query);
  const result = await fetch(`${BASE_URL}${ANIME_ENDPOINT}?${params}`);
  const anime = await result.json();
  return anime.data;
};
