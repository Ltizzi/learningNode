const launchesRepo = require("./launches.mongo");
const planetsRepo = require("./planets.mongo");

const launches = new Map(); //version sin persistencia

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

//saveLaunch(launch);

//launches.set(launch.flightNumber, launch);  //version sin persistencia

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launchesRepo.find(
    {},
    {
      _id: 0, //excluyendo fields
      __v: 0,
    }
  );
}

function getLaunch(id) {
  let launchie = launches.get(id);
  console.log(launchie);
  return launchie;
}

async function saveLaunch(launch) {
  const planet = planetsRepo.findOne({
    keplerName: launch.destination,
  });
  if (!planet) {
    throw new Error("No matching planet was found!");
  }
  await launchesRepo.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
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
