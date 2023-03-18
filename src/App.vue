<template>
  <Header />
  <router-view />
</template>
<script>
import Header from "./layouts/Header.vue";
export default {
  name: "app",
  components: {
    Header,
  },
};
</script>
<style></style>
