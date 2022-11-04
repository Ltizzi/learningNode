const express = require("express");

const { httpGetAllPlanets } = require("./planets.controller"); //podes traer los metodos de a uno

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
