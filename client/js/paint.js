class Paint {
    constructor(element) {
        this._canvas = document.querySelector(element);
        this._ctx = this._canvas.getContext("2d");
        this._flag = false;
        this._x = [];
        this._y = [];
        this._onDrawStart = null;
        this._onDrawEnd = null;
        this._init();
    }

    on(event, callback) {
        window.addEventListener(event, callback);
    }

    draw(userId, color, x, y) {
        if(!this._x[userId]) this._x[userId] = x;
        if(!this._y[userId]) this._y[userId] = y;

        this._ctx.beginPath();
        this._ctx.strokeStyle = color;
        this._ctx.moveTo(this._x[userId], this._y[userId]);
        this._ctx.lineTo(x, y);
        this._ctx.strokeStyle = 2;
        this._ctx.lineWidth = 4;
        this._ctx.stroke();
        this._ctx.closePath();
        this._x[userId] = x;
        this._y[userId] = y;
    }

    drawEnd(userId) {
        this._x[userId] = null;
        this._y[userId] = null;
    }

    _onMouseDown() {
        this._flag = true;
    }

    _onMouseMove(event) {
        if(this._flag) {
            this._onDrawStart.details = { x: event.offsetX, y: event.offsetY};
            dispatchEvent(this._onDrawStart);
        }
    }

    _onMouseUp(event) {
        this._flag = false;
        dispatchEvent(this._onDrawEnd);
    }

    _setSize() {
        this._canvas.width = window.innerWidth - 2;
        this._canvas.height = window.innerHeight - 2;
    }

    _init() {
        this._canvas.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._canvas.addEventListener("mousemove", this._onMouseMove.bind(this));
        this._canvas.addEventListener("mouseup", this._onMouseUp.bind(this));
        this._canvas.addEventListener("contextmenu", e => e.preventDefault());
        this._onDrawStart = new CustomEvent("drawStart");
        this._onDrawEnd = new CustomEvent("drawEnd");
        this._setSize();
        window.addEventListener("resize", this._setSize.bind(this));
    }
}