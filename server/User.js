class User {
	constructor() {
		this._user = null;
		this._init();
	}

	_getColor() {
		let r = this._getRandomNumber(255);
		let g = this._getRandomNumber(255);
		let b = this._getRandomNumber(255);

		return `rgb(${r}, ${g}, ${b})`;
	}

	_getRandomNumber(max) {
		return Math.floor(Math.random() * max + 1);
	}

	_init() {
		let user = {
			id: 0,
			color: this._getColor(),
			position: {
				x: 0,
				y: 0
			}
		}

		this._user = user;
	}
}

module.exports = User;