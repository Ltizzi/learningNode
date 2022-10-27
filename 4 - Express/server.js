//QUINTA VERSION - serving static website - TEMPLATES - layouts
const express = require("express");

const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

app.set("view engine", "hbs"); // .set para configurar el view engine -hbs-
app.set("views", path.join(__dirname, "views")); // set para decir en q carpeta están las views, se usa path y join

const PORT = 4246;

// test middleware
app.use((req, res, next) => {
  const start = Date.now();
  next(); //sin la llamada a next() se interrumpe el flujo hacia el endpoint
  //response here...
  const delta = Date.now() - start; //dif de milisegundos
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use("/site", express.static(path.join(__dirname, "public"))); //hosting files, en este caso un html
app.use(express.json()); //parsea los json entrantes

app.get("/", (req, res) => {
  res.render("index", {
    title: "papita pa el loro",
    caption: "aaaaaaaaaaaaa q frioo locoo",
  });
}); //se renderiza el template de hbs en la carpeta views con estas propiedades
app.use("/friends", friendsRouter); //"mounting" de friends router
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
