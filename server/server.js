class Server {
	constructor() {
		this._users = [];
		this._sockets = [];
	}

	addUser(user, socket) {
		this._users.push(user);
	}

	getUsers() {
		return this._users;
	}

	addSocket(socket) {
		this._sockets.push(socket);
		this._addSocketHandler(socket);
	}

	_addSocketHandler(socket) {
		let index = this._sockets.indexOf(socket);

		socket.on("requestDrawStart", this._requestDrawStart.bind(this, index));
		socket.on("requestDrawEnd", this._requestDrawEnd.bind(this, index));
		socket.on("cursorMove", this._cursorMove.bind(this, index));
	}

	_requestDrawStart(index, data) {
		let socket = this._sockets[index];
		let users = this.getUsers();
		let user = users[index];

		user.setDrawPosition(data.x, data.y);
		socket.broadcast.emit("drawStarted", user);
		socket.emit("drawStarted", user);
	}

	_requestDrawEnd(index) {
		let socket = this._sockets[index];
		let users = this.getUsers();
		let user = users[index];

		socket.broadcast.emit("drawEnded", user);
		socket.emit("drawEnded", user);
	}

	_cursorMove(index, data) {
		let socket = this._sockets[index];
		let users = this.getUsers();
		let user = users[index];

		user.setCursorPosition(data.x, data.y);
		socket.broadcast.emit("cursorMoved", user);
	}
}

module.exports = Server;