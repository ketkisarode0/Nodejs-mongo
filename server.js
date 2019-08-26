const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3022;

const server = http.createServer(app);
console.log("Running on port 3022");

server.listen(port);
