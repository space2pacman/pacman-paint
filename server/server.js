class Server {
	constructor(io) {
		this._io = io;
		this._users = [];
		this._init();
	}

	addUser() {

	}

	_onSocket(socket) {
		socket.on("requestDrawStart", this._requestDrawStart.bind(this));
		socket.on("requestDrawEnd", this._requestDrawEnd.bind(this));
		socket.on("cursorMove", this._cursorMove.bind(this, socket));
	}

	_requestDrawStart(data) {
		this._io.emit("drawStarted", data);
	}

	_requestDrawEnd() {
		this._io.emit("drawEnded");
	}

	_cursorMove(socket, data) {
		socket.broadcast.emit("cursorMoved", data);
	}

	_init() {
		this._io.on("connection", this._onSocket.bind(this));
	}
}

module.exports = Server;