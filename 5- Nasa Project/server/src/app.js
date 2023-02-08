const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan"); //logs

const api = require("./routes/api");
// const planetsRouter = require("./routes/planets/planets.router");
// const launchesRouter = require("./routes/launches/launches.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
); //habilita cors para ese origin

app.use(morgan("combined")); //logs

app.use(express.json()); //parsea cualquier json entrante
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get("/launch", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/v1", api);
// app.use("/planets", planetsRouter);
// app.use("/launches", launchesRouter);

module.exports = app;
