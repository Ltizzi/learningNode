const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  return res.status(200).json(getAllPlanets()); //el status 200 es default pero hay q configurarlo
}

module.exports = {
  httpGetAllPlanets,
};
