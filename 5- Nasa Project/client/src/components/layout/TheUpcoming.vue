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
          <th class="border border-double border-sky-400 ... p-5">Control</th>
        </tr>
      </thead>
      <tbody class="table-row-group">
        <tr
          v-for="mission in upcommingMissions"
          :key="mission.flightNumber"
          class="table-row"
        >
          <td
            class="border border-double border-sky-400 ... table-cell text-center p-5"
          >
            {{ mission.flightNumber }}
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
            <button
              class="bg-red-600 text-yellow-200 p-5"
              @click="deleteLaunch(mission.flightNumber)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getAllLaunches, deleteLaunch } from "../../requests";
  export default {
    data() {
      return {
        upcommingMissions: [],
      };
    },
    methods: {
      async loadLaunches() {
        let allLaunches = await getAllLaunches();
        let filteredLaunches = allLaunches.filter(
          (launch) => launch.upcoming == true
        );
        this.upcommingMissions = filteredLaunches;
      },
      async deleteLaunch(id) {
        console.log(id);

        deleteLaunch(id);
        this.upcommingMissions = this.upcommingMissions.filter(
          (mission) => mission.flightNumber != id
        );
      },
    },
    created() {
      this.loadLaunches();
    },
  };
</script>

<style></style>
