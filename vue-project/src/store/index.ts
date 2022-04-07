import { createStore } from "vuex";

const BASE_URL = "https://g.tenor.com/v1/";
const API_KEY = "Q8XYO9QRKQAP";
const MEDIA_FILTER = "minimal";
const LIMIT = 50;

const store = createStore({
  state: {
    trendingGifs: [],
    searchedGifs: [],
    status: {
      searchedGifs: {
        loading: false,
        error: false,
      },
    },
  },
  mutations: {
    SET_TRENDING_GIFS(state, data) {
      state.trendingGifs = data;
    },
    SET_SEARCHED_GIFS(state, data) {
      state.searchedGifs = data;
    },
    // I wanted to use defineAsyncComponent() for loading/error states
    // instead of SET_LOADING (but didn't make it)
    SET_LOADING(state, status) {
      state.status.searchedGifs.loading = status;
    },
  },
  actions: {
    async fetchTrendingGifs({ commit }) {
      const url = `${BASE_URL}trending?key=${API_KEY}&media_filter=${MEDIA_FILTER}&limit=${LIMIT}`;

      try {
        const response = await fetch(url);
        const { results } = await response.json();
        commit("SET_TRENDING_GIFS", results);
      } catch (error) {
        console.warn(error);
      }
    },
    async searchGifs({ commit }, { query }) {
      const url = `${BASE_URL}search?key=${API_KEY}&q=${query}&media_filter=${MEDIA_FILTER}&limit=${LIMIT}`;

      commit("SET_LOADING", true);
      try {
        const response = await fetch(url);
        const { results } = await response.json();
        commit("SET_SEARCHED_GIFS", results);
        commit("SET_LOADING", false);
      } catch (error) {
        console.warn(error);
      }
    },
  },
  getters: {
    getTrendingGifs: (state) => state.trendingGifs,
    getSearchedGifs: (state) => state.searchedGifs,
    getSearchLoadingStatus: (state) => state.status.searchedGifs.loading,
  },
  modules: {},
});

export default store;
