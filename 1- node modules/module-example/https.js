const { send } = require("./request"); //asi se importan modulos en node
const { read } = require("./response");

//con const {send } puedo evitar el request.send en la funcion de abajo

function makeRequest(url, data) {
  //request.send(url, data);
  send(url, data);
  return read();
}

const responseData = makeRequest("https://google.com", "hi");
console.log(responseData);
