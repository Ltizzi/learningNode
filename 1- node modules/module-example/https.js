// const { send } = require("./internals/request"); //asi se importan modulos en node
// const { read } = require("./internals/response");
const internals = require("./internals"); //se importa una carpeta entera a través de index.js

//con const {send } puedo evitar el request.send en la funcion de abajo

function makeRequest(url, data) {
  //request.send(url, data);
  // send(url, data);
  // return read();
  internals.request.send(url, data);
  return internals.response.read();
}

const responseData = makeRequest("https://google.com", "hi");
console.log(responseData);

//para usar ECMASCript modules hay que cambiar las extension a .mjs
