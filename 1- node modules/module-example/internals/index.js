// const request = require("./request");
// const response = require("./response");

// module.exports = {
//   REQUEST_TIMEOUT: request.REQUEST_TIMEOUT,
//   send: request.send,
//   read: response.read,
// };

module.exports = {
  ...require("./request"),
  ...require("./response"),
};

//uso o no uso index.js?
// some loves it and some hates it
//simplifica pero a la vez requiere un trabajito extra
//es preferible no usar index.js, es mejor usar la ruta directa
//puede traer confusion inesperada
