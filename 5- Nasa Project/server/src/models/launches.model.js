const launchesRepo = require("./launches.mongo");
const planetsRepo = require("./planets.mongo");

const launches = new Map(); //version sin persistencia

const DEFAULT_FLIGHT_NUMBER = 100;

//let latestFlightNumber = 100; //version sin persistencia

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

async function getLaunch(id) {
  // let launchie = launches.get(id);
  // console.log(launchie);
  // return launchie;
  return await launchesRepo.findOne({
    flightNumber: id,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesRepo.findOne().sort("-flightNumber"); //query que obtiene el ultimo launch
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
  const planet = await planetsRepo.findOne({
    keplerName: launch.destination,
  });

  if (!planet) {
    throw new Error("No matching planet was found!");
  }
  await launchesRepo.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["c755", "NASA"],
    flightNumber: newFlightNumber,
  });
  saveLaunch(newLaunch);
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customers: ["c755", "NASA"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }

async function deleteLaunch(id) {
  //const launch = getLaunch(id);
  // console.log(launch);
  // launch.upcoming = false;
  // launch.success = false;
  // launches.set(launch.flightNumber, launch);
  // return launch;
  const aborted = await launchesRepo.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  deleteLaunch,
  getLaunch,
};
