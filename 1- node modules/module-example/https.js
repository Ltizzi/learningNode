const { send } = require("./internals/request"); //asi se importan modulos en node
const { read } = require("./internals/response");
//const internals = require("./internals"); //se importa una carpeta entera a través de index.js
// const { send, read } = require("./internals");

//con const {send } puedo evitar el request.send en la funcion de abajo

function makeRequest(url, data) {
  //request.send(url, data);

  // internals.request.send(url, data);
  // return internals.response.read();
  send(url, data);
  return read();
}

const responseData = makeRequest("https://google.com", "hi");
console.log(responseData);

//para usar ECMASCript modules hay que cambiar las extension a .mjs
