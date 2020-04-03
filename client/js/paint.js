class Paint {
    constructor(element) {
        this._canvas = document.querySelector(element);
        this._ctx = this._canvas.getContext("2d");
        this._flag = false;
        this._x = null;
        this._y = null;
        this._onDrawStart = null;
        this._onDrawEnd = null;
        this._init();
    }

    on(event, callback) {
        window.addEventListener(event, callback);
    }

    draw(x, y) {
        if(!this._x) this._x = x;
        if(!this._y) this._y = y;

        this._ctx.beginPath();
        this._ctx.moveTo(this._x, this._y);
        this._ctx.lineTo(x, y);
        this._ctx.strokeStyle = 2;
        this._ctx.lineWidth = 4;
        this._ctx.stroke();
        this._ctx.closePath();
        this._x = x;
        this._y = y;
    }

    drawEnd() {
        this._x = null;
        this._y = null;
    }

    _onMouseDown(event) {
        this._x = event.offsetX;
        this._y = event.offsetY;
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
        this._x = null;
        this._y = null;
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
        this._onDrawStart = new CustomEvent("drawStart");
        this._onDrawEnd = new CustomEvent("drawEnd");
        this._setSize();
        window.addEventListener("resize", this._setSize.bind(this));
    }
}