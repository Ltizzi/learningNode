<template>
  <div class="bg-black h-auto pt-10">
    <table
      class="table table-auto bg-black w-10/12 text-sky-300 items-center m-auto"
    >
      <thead class="table-header-group">
        <tr class="table-row">
          <th class="border border-double border-sky-400 ... p-5">No.</th>
          <th class="border border-double border-sky-400 ... p-5">Date</th>
          <th class="border border-double border-sky-400 ... p-5">Mission</th>
          <th class="border border-double border-sky-400 ... p-5">Rocket</th>
          <th class="border border-double border-sky-400 ... p-5">
            Destination
          </th>
          <th class="border border-double border-sky-400 ... p-5">Customers</th>
        </tr>
      </thead>
      <tbody class="table-row-group">
        <tr
          v-for="mission in missionHistorial"
          :key="mission.flightNumber"
          class="table-row"
        >
          <td
            class="border border-double border-sky-400 ... table-cell text-center p-5"
          >
            <span :style="{ color: mission.success ? 'greenyellow' : 'red' }">
              {{ mission.flightNumber }}
            </span>
          </td>
          <td
            class="border border-double border-sky-400 ... table-cell text-center p-5"
          >
            {{ new Date(mission.launchDate).toDateString() }}
          </td>
          <td
            class="border border-double border-sky-400 ... table-cell text-center p-5"
          >
            {{ mission.mission }}
          </td>
          <td
            class="border border-double border-sky-400 ... table-cell text-center p-5"
          >
            {{ mission.rocket }}
          </td>
          <td
            class="border border-double border-sky-400 ... table-cell text-center p-5"
          >
            {{ mission.destination }}
          </td>
          <td
            class="border border-double border-sky-400 ... table-cell text-center p-5"
          >
            {{ mission.customers?.join(", ") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getAllLaunches } from "../../requests";
  export default {
    data() {
      return {
        missionHistorial: [],
      };
    },
    methods: {
      async loadLaunches() {
        let missions = await getAllLaunches();
        this.missionHistorial = missions.sort((a, b) => {
          return a.flightNumber - b.flightNumber;
        });
      },
    },
    mounted() {
      this.loadLaunches();
    },
  };
</script>

<style></style>
