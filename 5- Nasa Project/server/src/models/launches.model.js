const launchesRepo = require("./launches.mongo");
const planetsRepo = require("./planets.mongo");
const axios = require("axios");

//const launches = new Map(); //version sin persistencia

const DEFAULT_FLIGHT_NUMBER = 100;

//let latestFlightNumber = 100; //version sin persistencia

// const launch = {
//   flightNumber: 100, //flight_number
//   mission: "Kepler Exploration X", //name
//   rocket: "Explorer IS1", // rocket.name
//   launchDate: new Date("December 27, 2030"), //date_local
//   destination: "Kepler-442 b", //not applicable
//   customers: ["NASA", "ZTM"], //payload.customers
//   upcoming: true, //upcoming
//   success: true, //success
// };

//saveLaunch(launch);

//launches.set(launch.flightNumber, launch);  //version sin persistencia

async function getAllLaunches(skip, limit) {
  // return Array.from(launches.values());
  return await launchesRepo
    .find(
      {},
      {
        _id: 0, //excluyendo fields
        __v: 0,
      }
    )
    .sort({ flightNumber: 1 }) //sort de la paginacion, atributo con 1 o -1 para asc o desc
    .skip(skip) //pagination setup
    .limit(limit);
}

async function getLaunch(id) {
  // let launchie = launches.get(id);
  // console.log(launchie);
  // return launchie;
  return await findLaunch({
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
  const planet = await planetsRepo.findOne({
    keplerName: launch.destination,
  });

  if (!planet) {
    throw new Error("No matching planet was found!");
  }
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

async function findLaunch(filter) {
  return await launchesRepo.findOne(filter);
}

async function populateLaunches() {
  console.log("Downloading launch data...");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if (response.status !== 200) {
    console.log("Problem downloadin launch data");
    throw new Error("Launch data download failed!");
  }
  const launchDocs = response.data.docs;
  launchDocs.forEach(async (launchDoc) => {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  });
}

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch data already loaded");
    return;
  } else populateLaunches();
}

module.exports = {
  getAllLaunches,
  // addNewLaunch,
  scheduleNewLaunch,
  deleteLaunch,
  getLaunch,
  loadLaunchData,
};
