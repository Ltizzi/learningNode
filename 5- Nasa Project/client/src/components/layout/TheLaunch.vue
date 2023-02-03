<template>
  <form
    class="bg-black w-screen h-screen text-sky-300 flex flex-col items-center pt-10"
    @submit.prevent="submitLaunch"
  >
    <div class="form-control pb-5">
      <label for="launchDate">Launch Date</label>
      <input
        type="date"
        id="launchDate"
        name="launchDate"
        class="bg-slate-600 ml-5 p-2"
        v-model="launchDate"
      />
    </div>
    <div class="form-control pb-5">
      <label for="mission">Mission Name</label>
      <input
        type="text"
        id="mission"
        name="mission"
        class="bg-slate-600 ml-5 p-2"
        v-model="mission"
      />
    </div>
    <div class="form-control pb-5">
      <label for="rocket">Rocket Type</label>
      <input
        type="text"
        name="rocket"
        id="rocket"
        class="bg-slate-600 ml-5 p-2"
        v-model="rocket"
      />
    </div>
    <div class="form-control pb-5">
      <label for="destination">Destination Exoplanet</label>
      <select
        name="destination"
        id="destination"
        v-model="destination"
        class="ml-5 p-2"
      >
        <option
          :value="planet.keplerName"
          v-for="planet in planets"
          :key="planet.kepid"
        >
          {{ planet.keplerName }}
        </option>
      </select>
    </div>
    <button class="bg-blue-400 p-2 text-lg text-blue-100 font-bold">
      Submit
    </button>
  </form>
</template>

<script>
  import { getPlanets, postLaunch } from "../../requests.js";

  export default {
    data() {
      return {
        planets: [],
        launchDate: "",
        mission: "",
        rocket: "",
        destination: "",
      };
    },
    methods: {
      async loadPlanets() {
        this.planets = await getPlanets();
        console.log(this.planets);
      },
      submitLaunch() {
        let launch = {
          launchDate: this.launchDate,
          mission: this.mission,
          rocket: this.rocket,
          destination: this.destination,
        };
        postLaunch(launch);
      },
    },
    mounted() {
      this.loadPlanets();
    },
  };
</script>

<style></style>
