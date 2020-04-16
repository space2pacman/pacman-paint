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

socket.on("connection", data => {
	console.log(data);
})

socket.on("drawStarted", data => {
    paint.draw(data.x, data.y)
})

socket.on("drawEnded", data => {
    paint.drawEnd();
})

socket.on("cursorMoved", data => {
	cursor.move(data.x, data.y);
})