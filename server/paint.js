let io = require("socket.io")(7777);
let IdFactory = require("./IdFactory");
let Server = require("./Server");
let User = require("./User");
let server = new Server(io);
let idFactory = new IdFactory();

io.on("connection", socket => {
	let user = new User(idFactory.getId());
	let data = {
		user: user.get(),
		users: server.getUsers()
	}

	server.onSocket(socket);
	server.addUser(user.get());
	socket.emit("connection", data);
});