const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(`${__dirname}/data/db.json`);
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST" && req.originalUrl === "/usuarios") {
    // Generar el ID automáticamente
    req.body.id = Date.now();
    // Generar la fecha de última conexión automáticamente
    req.body.ultimaVezEnLinea = new Date().toISOString();
      req.body.flag = true;
  }
  next();
});
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

server.use(router);
server.use(middlewares);

server.listen(port, () => {
    console.log("JSON Server is running");
});
