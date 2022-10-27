const path = require("path");

function getMessages(req, res) {
  //res.send("<ul><li>helloooo Albert!!</li></ul>");
  // dirname=dir actual, .. para atras, carpeta public etc
  res.sendFile(
    path.join(__dirname, "..", "public", "images", "skimountain.jpg")
  );
}

function postMsg(req, res) {
  console.log("Updating messages...");
}

module.exports = {
  getMessages,
  postMsg,
};
