const { parse } = require("csv-parse");
const fs = require("fs");
const results = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

//usa fs para crear un stream de datos leíbles y pushearlos a un array
//createReadStream lee la data en raw buffers of bytes
fs.createReadStream("kepler_data.csv")
  //la función pipe conecta una fuente de datos leible origen con una fuente de datos destino
  .pipe(
    parse({
      comment: "#", //parsea comentarios
      columns: true, //devuelve un array de js objects
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) results.push(data);
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(
      results.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log("");
    console.log(
      `We found ${results.length} posible habitable planets! Oh my good Lord!`
    );
    console.log("Done!");
  });
