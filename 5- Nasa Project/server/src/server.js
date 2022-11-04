const http = require("http");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);

const PORT = process.env.PORT || 4246; //checkea en el enviroment si hay puerto sino usa 4246-en el package.json

//await no puede ser usado sin una function async por eso se crea la function startserver y se mete el await dentro
async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}...`);
  });
}

startServer();
