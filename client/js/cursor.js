class Cursor {
	constructor(element, image) {
        this._image = image;
        this._cursors = [];
        this._onMove = null;
		this._init();
	}

	add(userId, show = true) {
		let image = new Image(12, 19);

		image.classList.add("cursor");
		image.src = this._image;

		this._cursors[userId] = { 
			x: 0, 
			y: 0,
			image
		}

		if(show) {
			this._cursors[userId].image.addEventListener("load", () => {
				document.body.appendChild(this._cursors[userId].image);
			})
		}
	}

	on(event, callback) {
        window.addEventListener(event, callback);
    }

	move(userId, x, y) {
		this._cursors[userId].x = x;
		this._cursors[userId].y = y;
		this._cursors[userId].image.style.left = this._cursors[userId].x + "px";
		this._cursors[userId].image.style.top = this._cursors[userId].y + "px";
    }

	_init() {
		document.body.addEventListener("mousemove", event => {
			this._onMove.details = { x: event.offsetX, y: event.offsetY }
			dispatchEvent(this._onMove);
		})

		this._onMove = new CustomEvent("move");
	}
}