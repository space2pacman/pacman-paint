class Server {
	constructor() {
		this._users = [];
	}

	addUser(user) {
		this._users.push(user);
	}

	getUsers() {
		return this._users;
	}

	onSocket(socket) {
		socket.on("requestDrawStart", this._requestDrawStart.bind(this, socket));
		socket.on("requestDrawEnd", this._requestDrawEnd.bind(this, socket));
		socket.on("cursorMove", this._cursorMove.bind(this, socket));
	}

	_requestDrawStart(socket, data) {
		socket.broadcast.emit("drawStarted", data);
		socket.emit("drawStarted", data);
	}

	_requestDrawEnd(socket) {
		socket.broadcast.emit("drawEnded");
		socket.emit("drawEnded");
	}

	_cursorMove(socket, data) {
		socket.broadcast.emit("cursorMoved", data);
	}
}

module.exports = Server;