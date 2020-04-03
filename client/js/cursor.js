class Cursor {
	constructor(element, image) {
        this._image = new Image(12, 19);
        this._image.classList.add("cursor");
        this._image.src = image;
        this._onMove = null;
		this._init();
	}

	on(event, callback) {
        window.addEventListener(event, callback);
    }

	move(x, y) {
		this._image.style.left = x + "px";
		this._image.style.top = y + "px";
    }

	_init() {
		this._image.addEventListener("load", () => {
			document.body.appendChild(this._image);
		})
		
		document.body.addEventListener("mousemove", event => {
			this._onMove.details = { x: event.offsetX, y: event.offsetY }
			dispatchEvent(this._onMove);
		})

		this._onMove = new CustomEvent("move");
	}
}