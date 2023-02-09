const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
require("dotenv").config();

const PORT = process.env.PORT;

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const app = express();

app.use(helmet()); //right up the top

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true; //TODO
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
}
//pre auth
app.get("/auth/google", (req, res) => {});

//post auth
app.get("/auth/google/callback", (req, res) => {});

//generic logout endpoint
app.get("/auth/logout", (req, res) => {});

//se puede pasar middlewared en los endpoints y funcionan en secuencia, se pueden agregar varios
app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your personal secret value is 42!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
  });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}...`);
// });
