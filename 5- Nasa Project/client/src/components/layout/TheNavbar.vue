<template>
  <nav class="w-screen bg-gray-900 m-0 pt-5 pb-5">
    <ul class="flex flex-auto flex-row items-center w-screen justify-around">
      <li class="text-blue-400 bg-black text-lg">NASA Mission Control</li>
      <li class="text-blue-400 bg-black text-lg">
        <router-link to="/launch">Launch</router-link>
      </li>
      <li class="text-blue-400 bg-black text-lg">
        <router-link to="/upcoming">Upcoming</router-link>
      </li>
      <li class="text-blue-400 bg-black text-lg">
        <router-link to="/history"> History</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {};
</script>

<style scoped></style>
