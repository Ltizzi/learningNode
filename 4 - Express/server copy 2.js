//SEGUNDA VERSION - ROUTING
const express = require("express");

const app = express();

const PORT = 4246;

const friends = [
  {
    id: 0,
    name: "Albert Einstein",
  },
  {
    id: 1,
    name: "Sir Isaac Newton",
  },
  {
    id: 2,
    name: "Leonardo Terlizzi",
  },
];

app.get("/friends", (req, res) => {
  res.json(friends); // la data va a ser tratada como json si o si
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = Number(req.params.friendId); // el objeto params accede a los params de la request
  const friend = friends[friendId];
  if (friend) {
    //si existe se envia la info del amigo y envía un 200
    res.status(200).json(friend);
  } else {
    //se devuelve un 404 con un json
    res.status(404).json({
      error: "Friend does not exist",
    });
  }
});

app.get("/messages", (req, res) => {
  res.send("<ul><li>helloooo Albert!!</li></ul>");
});

app.post("/messages", (req, res) => {
  console.log("Updating messages...");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
