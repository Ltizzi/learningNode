const http = require("http");

require("dotenv").config();
//const mongoose = require("mongoose");
const { mongoConnect } = require("./services/mongo");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const server = http.createServer(app);

const PORT = process.env.PORT || 4246; //checkea en el enviroment si hay puerto sino usa 4246-en el package.json

// const MONGO_URL =
//   "mongodb+srv://ltizzi:7EVjF4msWxdkeNOH@nasaproject.coux5sz.mongodb.net/nasa?retryWrites=true&w=majority";

// mongoose.connection.once("open", () => {
//   console.log("MongoDB connection ready!");
// });

// mongoose.connection.on("error", (err) => {
//   console.error(err);
// });

// mongoose.set("strictQuery", false);

//await no puede ser usado sin una function async por eso se crea la function startserver y se mete el await dentro
async function startServer() {
  // await mongoose.connect(MONGO_URL);
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}...`);
  });
}

startServer();
