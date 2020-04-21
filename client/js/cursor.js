class Cursor {
	constructor() {
        this._cursors = [];
        this._onMove = null;
        this._onChangeCursor = null;
		this._init();
	}

	add(userId, color) {
		let icon = document.createElement("i");

		icon.setAttribute("type", "arrow");
		icon.classList.add("cursor");
		icon.style.color = color;

		this._cursors[userId] = { 
			x: 0, 
			y: 0,
			icon
		}

		document.body.appendChild(this._cursors[userId].icon);
	}

	on(event, callback) {
        window.addEventListener(event, callback);
    }

	move(userId, x, y) {
		this._cursors[userId].x = x;
		this._cursors[userId].y = y;
		this._cursors[userId].icon.style.left = this._cursors[userId].x + "px";
		this._cursors[userId].icon.style.top = this._cursors[userId].y + "px";
    }

    change(userId, type) {
   		this._cursors[userId].icon.setAttribute("type", type);
    }

    _onMouse(event) {
    	let type;
    	let RIGHT_MOUSE_BUTTON = 2;

        if(event.button === RIGHT_MOUSE_BUTTON) {
	    	if(event.type === "mousedown") {
	    		type = "eraser";
	    	}

	    	if(event.type === "mouseup") {
	    		type = "arrow";
	    	}

            this._onChangeCursor.details = { button: type };
            dispatchEvent(this._onChangeCursor);
        }
    }

	_init() {
		document.body.addEventListener("mousemove", event => {
			this._onMove.details = { x: event.offsetX, y: event.offsetY }
			dispatchEvent(this._onMove);
		})
		document.body.addEventListener("mousedown", this._onMouse.bind(this));
		document.body.addEventListener("mouseup", this._onMouse.bind(this));

		this._onMove = new CustomEvent("move");
		this._onChangeCursor = new CustomEvent("changeCursor");
	}
}