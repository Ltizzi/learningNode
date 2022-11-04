<template>
  <div class="w-screen p-0 m-0">
    <the-navbar class="w-full"></the-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import TheNavbar from "./components/layout/TheNavbar.vue";

  export default {
    name: "Nasa Project",
    components: {
      TheNavbar,
    },
  };
</script>

<style scoped></style>
