const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/new", httpAddNewLaunch);
launchesRouter.delete("/delete/:id", httpDeleteLaunch);

module.exports = launchesRouter;
