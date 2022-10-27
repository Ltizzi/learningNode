const model = require("../models/friends.model");

function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Name can't be null",
    }); //con return se evita la ejecucion del bloque siguiente al condicional
  }
  const newFriend = {
    id: model.length,
    name: req.body.name,
  };
  model.push(newFriend);
  res.json(newFriend);
}

function getFriends(req, res) {
  res.json(model); // la data va a ser tratada como json si o si
}

function getFriendById(req, res) {
  const friendId = Number(req.params.friendId); // el objeto params accede a los params de la request
  const friend = model[friendId];
  if (friend) {
    //si existe se envia la info del amigo y envía un 200
    res.status(200).json(friend);
  } else {
    //se devuelve un 404 con un json
    res.status(404).json({
      error: "Friend does not exist",
    });
  }
}

module.exports = {
  postFriend,
  getFriends,
  getFriendById,
};
