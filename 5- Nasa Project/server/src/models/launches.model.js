// const launches = require("./launches.mongo");

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customers: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function getLaunch(id) {
  let launchie = launches.get(id);
  console.log(launchie);
  return launchie;
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["c755", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function deleteLaunch(id) {
  const launch = getLaunch(id);
  console.log(launch);
  launch.upcoming = false;
  launch.success = false;
  launches.set(launch.flightNumber, launch);
  return launch;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
  getLaunch,
};
