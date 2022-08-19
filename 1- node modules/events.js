const EventEmitter = require("events");
const celebrity = new EventEmitter();

//subscribe to celebrity for OBserver 1
celebrity.on("wanda", function (result) {
  if (result === "hace algo" || result === "no hace nada")
    console.log("wandaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
});
celebrity.on("wanda", function (result) {
  if (result === "hace algo")
    console.log("wandaaaaaaaaaaaaa te amoooooooooooooooo");
});
celebrity.on("wanda", function (result) {
  if (result === "hace algo") console.log("que país generoso");
});
celebrity.emit("wanda", "hace algo");
celebrity.emit("wanda", "no hace nada");

process.on("beforeExit", (code) => {
  console.log("se terminó", code);
});
