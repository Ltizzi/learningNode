const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); //logs

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
); //habilita cors para ese origin

app.use(morgan("combined")); //logs

app.use(express.json()); //parsea cualquier json entrante
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

module.exports = app;
