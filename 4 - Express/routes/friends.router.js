const express = require("express");
const friendsController = require("../controllers/friends.controller");

const friendsRouter = express.Router(); //crea router para friends

friendsRouter.use((req, res, next) => {
  console.log("ip address: ", req.ip);
  next();
});

friendsRouter.post("/", friendsController.postFriend); // se elimina el /friends del endpoint
friendsRouter.get("/", friendsController.getFriends);
friendsRouter.get("/:friendId", friendsController.getFriendById);

module.exports = friendsRouter;
