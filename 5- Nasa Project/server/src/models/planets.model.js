const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    //usa fs para crear un stream de datos leíbles y pushearlos a un array
    //createReadStream lee la data en raw buffers of bytes
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      //la función pipe conecta una fuente de datos leible origen con una fuente de datos destino
      .pipe(
        parse({
          comment: "#", //parsea comentarios
          columns: true, //devuelve un array de js objects
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          //results.push(data)
          //
          //TODO replace below create with upsert
          //insert + update = upsert  solo inserta data en la db si no existe
          // await planets.updateOne(
          //   {
          //     keplerName: data.kepler_name,
          //     kepid: data.kepid,
          //   }, //si no existe, lo agrega, y si existe, updatea con el segundo argumento
          //   {
          //     keplerName: data.kepler_name,
          //     kepid: data.kepid,
          //   },
          //   {
          //     upsert: true, //solo se agrega si existe
          //   }
          // );
          savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const countPLanetsFound = (await getAllPlanets()).length;
        console.log(
          `We found ${countPLanetsFound} posible habitable planets! Oh my good Lord!`
        );
        console.log("Done!");
        resolve();
      });
  });
}

async function getAllPlanets() {
  //console.log("los planetas son" + results);
  //return results;
  return await planets.find(
    {},
    {
      __v: 0, //excluyen los fields generados por mongo y mongoose
      _id: 0,
    }
  ); //objeto vacio es igual a todos, sino es un filtro
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
        kepid: planet.kepid,
      }, //si no existe, lo agrega, y si existe, updatea con el segundo argumento
      {
        keplerName: planet.kepler_name,
        kepid: planet.kepid,
      },
      {
        upsert: true, //solo se agrega si existe
      }
    );
  } catch (err) {
    console.log(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
