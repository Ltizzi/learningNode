const { get } = require("https"); // ecmascript 6, en lugar de hacer const http, se pasa un objeto con el metodo q se va a usar
//si cambio el request por get, no necesito el req.end() para llamar
const req = get("https://www.google.com", (response) => {
  //   console.log(response);
  response.on("data", (chunk) => {
    console.log(`Data chunk: ${chunk}`);
  });
  response.on("end", () => {
    console.log("no more data");
  });
});

//req.end(); //con end se envia la request
