let io = require("socket.io")(7777);

io.on("connection", socket => {
	socket.on("requestDrawStart", data => {
		io.emit("drawStarted", data);
	})

	socket.on("requestDrawEnd", () => {
		io.emit("drawEnded");
	})

	socket.on("cursorMove", data => {
		socket.broadcast.emit("cursorMoved", data);
	})
})