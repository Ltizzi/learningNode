const express = require("express");
// const cluster = require("cluster");
// const os = require("os");

const app = express();

//blocking function -

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}
// real life implementations q blockean:
//JSON.stringify()
//JSON.parse()
// Array.sort()

app.get("/", (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  //delay the response
  delay(4000);
  res.send(`Ding ding ding!! ${process.pid}`);
});

// if (cluster.isPrimary) {
//   console.log("Master has been started...");
//   const NUM_WORKERS = os.cpus().length;
//   console.log(`The number of logic cores is ${NUM_WORKERS}`);
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     cluster.fork();
//   }
// } else {
//   console.log("Worker proccess started...");
//   app.listen(3000); //solo corre como worker proccess
// }

console.log("Running server.js...");
console.log("Worker procces started.");
app.listen(3000);
