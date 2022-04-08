<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<template>
  <div class="container">
    <p>{{ msg }}...</p>
  </div>
</template>

<style>
.container {
  text-align: center;
}
</style>
