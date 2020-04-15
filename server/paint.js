let io = require("socket.io")(7777);
let Server = require("./Server");
let User = require("./User");
let server = new Server(io);