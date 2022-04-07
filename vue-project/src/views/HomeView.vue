<script>
import LoadingMessage from "../components/LoadingMessage.vue";

export default {
  components: {
    LoadingMessage,
  },
  data() {
    return { title: "Trending GIFs" };
  },
  computed: {
    trendingGifs() {
      return this.$store.getters.getTrendingGifs;
    },
  },
  created() {
    this.$store.dispatch("fetchTrendingGifs");
  },
};
</script>

<template>
  <div>
    <h1 class="header">{{ title }}</h1>
    <div v-if="this.trendingGifs.length">
      <div
        v-for="item in this.trendingGifs"
        :key="item.id"
        class="gif-container"
      >
        <img
          :src="item.media[0].tinygif.url"
          alt="item.content_description"
          class="image"
        />
      </div>
    </div>
    <div v-else><LoadingMessage :msg="`Loading ${title}`" /></div>
  </div>
</template>
