const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();

const PORT = process.env.PORT;

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback", //callback endpoint
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

//se puede usar para verificar password y usuario en otro tipo de auth
function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile:", profile);
  done(null, profile);
}

//configurar la estrategia del passport
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

const app = express();

app.use(helmet()); //right up the top

app.use(passport.initialize());

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
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"], //el alcance de lo q da google de data -puede ser profile tambien
  }),
  (req, res) => {}
);

//post auth
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure", //url si failea el login
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    //res.redirect()
    console.log("Google called us back!");
  }
);

//generic logout endpoint
app.get("/auth/logout", (req, res) => {});

//se puede pasar middlewared en los endpoints y funcionan en secuencia, se pueden agregar varios
app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your personal secret value is 42!");
});

app.get("/failure", (req, res) => {
  return res.send("Failed to login!");
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
