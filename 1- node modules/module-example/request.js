// module.exports.REQUEST_TIMEOUT = 500;
exports.REQUEST_TIMEOUT = 500; //alternativas para exportar
function encrypt(data) {
  return "encrypted";
}

exports.send = function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} to ${url}`);
};

// module.exports = {
//   send,
//   REQUEST_TIMEOUT,
// };
//el profe recomienda usar esta opción porque se ve todo en un solo lugar donde se exporta
