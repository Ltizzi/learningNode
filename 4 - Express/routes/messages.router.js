const express = require("express");

const messagesController = require("../controllers/messages.controller");

const messagesRouter = express.Router();

messagesRouter.get("/", messagesController.getMessages); //se achica la ruta porque la referencia se hace cuando se monta
messagesRouter.post("/", messagesController.postMsg);

module.exports = messagesRouter;
