class IdFactory {
	constructor() {
		this._id = 0;
	}

	getId() {
		this._id++;

		return this._id;
	}
}

module.exports = IdFactory;