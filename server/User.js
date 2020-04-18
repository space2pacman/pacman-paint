class User {
	constructor(id) {
		this.id = id;
		this.position = {
			draw: { x: 0, y: 0 },
			cursor: { x: 0, y: 0 }
		};
		this.color = this._getColor();
	}

	setDrawPosition(x, y) {
		this.position.draw.x = x;
		this.position.draw.y = y;
	}

	setCursorPosition(x, y) {
		this.position.cursor.x = x;
		this.position.cursor.y = y;
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
}

module.exports = User;