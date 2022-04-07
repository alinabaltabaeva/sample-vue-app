<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/search">Search</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import "./assets/base.css";
</style>
