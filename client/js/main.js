let paint = new Paint(".canvas");
let cursor = new Cursor();
let socket = io("http://localhost:7777");

cursor.on("move", data => {
	socket.emit("requestCursorMove", { x: data.details.x, y: data.details.y })
})

cursor.on("changeCursor", data => {
	socket.emit("requestChangeCursor", data.details.button);
})

paint.on("drawStart", data => {
    socket.emit("requestDrawStart", { x: data.details.x, y: data.details.y });
})

paint.on("drawEnd", () => {
    socket.emit("requestDrawEnd");
})

socket.on("connected", (user, users) => {
	users.forEach(item => {
		cursor.add(item.id, item.color);
	})
})

socket.on("joined", user => {
	cursor.add(user.id, user.color);
})

socket.on("drawStarted", user => {
    paint.draw(user.id, user.lineWidth, user.color, user.draw.x, user.draw.y);
})

socket.on("drawEnded", user => {
    paint.drawEnd(user.id);
})

socket.on("cursorMoved", user => {
	cursor.move(user.id, user.cursor.x, user.cursor.y);
})

socket.on("cursorChanged", user => {
	cursor.change(user.id, user.cursor.type);
})