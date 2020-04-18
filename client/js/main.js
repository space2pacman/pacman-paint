let paint = new Paint(".canvas");
let cursor = new Cursor(".canvas", "img/cursor.png");
let socket = io("http://localhost:7777");

paint.on("drawStart", data => {
    socket.emit("requestDrawStart", { x: data.details.x, y: data.details.y });
})

paint.on("drawEnd", () => {
    socket.emit("requestDrawEnd");
})

cursor.on("move", data => {
	socket.emit("cursorMove", { x: data.details.x, y: data.details.y })
})

socket.on("connection", user => {
	//
})

socket.on("drawStarted", user => {
    paint.draw(user.id, user.position.draw.x, user.position.draw.y);
})

socket.on("drawEnded", user => {
    paint.drawEnd(user.id);
})

socket.on("cursorMoved", user => {
	cursor.move(user.position.cursor.x, user.position.cursor.y);
})