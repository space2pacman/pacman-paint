let io = require("socket.io")(7777);

io.on("connection", socket => {
	socket.on("requestDraw", data => {
		io.emit("draw", data);
	})
})