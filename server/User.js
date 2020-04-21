class User {
	constructor(id) {
		this.id = id;
		this.draw = {
			x: 0, 
			y: 0
		};
		this.cursor = {
			x: 0,
			y: 0,
			type: "arrow"
		}
		this._defaultColor = this._getColor();
		this.color = this._defaultColor;
	}

	setDrawPosition(x, y) {
		this.draw.x = x;
		this.draw.y = y;
	}

	setCursorPosition(x, y) {
		this.cursor.x = x;
		this.cursor.y = y;
	}

	setCursorType(type) {
		this.cursor.type = type;

		if(type === "eraser") {
			this.color = "rgb(255, 255, 255)";
		}

		if(type === "arrow") {
			this.color = this._defaultColor;
		}
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