let io = require("socket.io")(7777);
let IdFactory = require("./IdFactory");
let Server = require("./Server");
let User = require("./User");
let server = new Server();
let idFactory = new IdFactory();

io.on("connection", socket => {
	let user = new User(idFactory.getId());

	server.addSocket(socket);
	server.addUser(user);
	socket.broadcast.emit("connect", user);
});