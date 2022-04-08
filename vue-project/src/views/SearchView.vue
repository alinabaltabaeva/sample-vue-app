<script>
import LoadingMessage from "../components/LoadingMessage.vue";

export default {
  components: {
    LoadingMessage,
  },
  data() {
    return { inputQuery: "" };
  },
  computed: {
    searchedGifs() {
      return this.$store.getters.getSearchedGifs;
    },
    isLoading() {
      return this.$store.getters.getSearchLoadingStatus;
    },
  },
  watch: {
    // whenever inputQuery changes, this function will run with 200ms delay
    inputQuery() {
      setTimeout(() => {
        this.$store.dispatch("searchGifs", { query: this.inputQuery });
      }, 200);
    },
  },
};
</script>

<template>
  <div>
    <div class="input-container">
      <h1 class="header">Search for GIFs</h1>
      <input
        type="text"
        v-model.trim="inputQuery"
        placeholder="Search.."
        class="input"
      />
    </div>

    <div class="output-container">
      <p v-if="inputQuery.length === 0" />
      <div v-else-if="isLoading">
        <LoadingMessage :msg="`Searching for ${inputQuery}`" />
      </div>
      <div
        v-else-if="inputQuery.length"
        v-for="item in this.searchedGifs"
        :key="item.id"
        class="gif-container"
      >
        <img
          :src="item.media[0].tinygif.url"
          :alt="item.content_description"
          class="image"
        />
      </div>
    </div>
  </div>
</template>
