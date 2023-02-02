const path = require("path");
const model = require("../models/friends.model");

function getMessages(req, res) {
  //res.send("<ul><li>helloooo Albert!!</li></ul>");

  //
  //SENDFILE del server al client
  //
  // dirname=dir actual, .. para atras, carpeta public etc
  // res.sendFile(    path.join(__dirname, "..", "public", "images", "skimountain.jpg")  );

  //render template en el endpoint
  let friend = model[model.length - 1];
  res.render("messages", {
    tittle: "Messages to my Friends",
    friend: `${friend.name}`,
  });
}

function postMsg(req, res) {
  console.log("Updating messages...");
}

module.exports = {
  getMessages,
  postMsg,
};
