const http = require("http");

const PORT = 4246;

// PRIMERA VERSION - server que atiende una simple request
// const server = http.createServer((req, res) => {
//   //crea el server con una callback function
//   res.writeHead(200, {
//     //construye los headers de la response, con codigo 200
//     "Content-Type": "application/json",
//   });
//   res.end(
//     JSON.stringify({
//       id: 1,
//       name: "Sir Isaac Newton",
//     })
//   ); // termina y manda la response
// });

const server = http.createServer();

//SEGUNDA VERSION
server.on("request", (req, res) => {
  if (req.url === "/friends") {
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    // });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        id: 1,
        name: "Sir Isaac Newton",
      })
    );
  } else if (req.url === "/messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body> ");
    res.write("<h1> Hi Isaac! </h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
