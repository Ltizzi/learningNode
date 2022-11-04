const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
  getLaunch,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  // return res.status(200).json(Array.from(launches.values()));
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "launch data cant be null",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (
    launch.launchDate.toString() === "Invalid Date" ||
    isNaN(launch.launchDate.valueOf())
  ) {
    return res.status(400).json({
      error: "invalid launch date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!getLaunch(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = deleteLaunch(launchId);
  res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
};
