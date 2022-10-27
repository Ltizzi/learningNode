//CUARTA VERSION - MVC implementation (carpetas controller y model) - ROUTERS
const express = require("express");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

const PORT = 4246;

app.use((req, res, next) => {
  const start = Date.now();
  next(); //sin la llamada a next() se interrumpe el flujo hacia el endpoint
  //response here...
  const delta = Date.now() - start; //dif de milisegundos
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use(express.json()); //parsea los json entrantes

app.use("/friends", friendsRouter); //"mounting" de friends router

app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
