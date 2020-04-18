let paint = new Paint(".canvas");
let cursor = new Cursor(".canvas", "img/cursor.png");
let socket = io("http://localhost:7777");

cursor.on("move", data => {
	socket.emit("cursorMove", { x: data.details.x, y: data.details.y })
})

paint.on("drawStart", data => {
    socket.emit("requestDrawStart", { x: data.details.x, y: data.details.y });
})

paint.on("drawEnd", () => {
    socket.emit("requestDrawEnd");
})

socket.on("connected", (user, users) => {
	users.forEach(item => {
		if(user.id === item.id) {
			cursor.add(item.id, false);
		} else {
			cursor.add(item.id);
		}
	})
})

socket.on("joined", user => {
	cursor.add(user.id);
})

socket.on("drawStarted", user => {
    paint.draw(user.id, user.position.draw.x, user.position.draw.y);
})

socket.on("drawEnded", user => {
    paint.drawEnd(user.id);
})

socket.on("cursorMoved", user => {
	cursor.move(user.id, user.position.cursor.x, user.position.cursor.y);
})