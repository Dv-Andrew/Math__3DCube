import { Vector } from '../libs/Vector';
import { Cube } from './Cube';
import { Matrix } from '../libs/Matrix';

export default class CubeAnimation {

  private _canvas: any;
  private _context: any;

  private _previousTime: number;
  private _fps: number;

  private _cube: Cube;

  private _controls = {
    l: false,
    r: false,
    t: false,
    b: false,
    rl: false,
    rr: false
  };

  constructor(canvasSelector: string) {
    this._canvas = document.querySelector(canvasSelector);
    this._context = this._canvas.getContext('2d');
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
    this._canvas.focus();

    this.setup();
    this._canvas.addEventListener("keydown", this.keyDown.bind(this), true);
    this._canvas.addEventListener("keyup", this.keyUp.bind(this), true);
    window.requestAnimationFrame(this.frame.bind(this));
  }

  frame(timestamp: number) {
    if (!this._previousTime) {
      this._previousTime = timestamp;
    }
    let elapsedTime = timestamp - this._previousTime;
    this._previousTime = timestamp;
    this._fps = 1000 / elapsedTime;

    this.update(elapsedTime / 1000);
    this.draw();

    window.requestAnimationFrame(this.frame.bind(this));
  }


  setup() {
    let cubeCenter = new Vector(this._canvas.width / 2, this._canvas.height / 2, 0);
    let cubeSize = new Vector(200, 200, 200);
    this._cube = new Cube(this._context, cubeCenter, cubeSize);
  }

  draw() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._cube.draw();
  }

  update(elapsedTime: number) {
    this._cube.update(elapsedTime);

    if (this._controls.t) this._cube.rotate(-2 * elapsedTime, 'x');
    if (this._controls.b) this._cube.rotate(2 * elapsedTime, 'x');
    if (this._controls.l) this._cube.rotate(-2 * elapsedTime, 'y');
    if (this._controls.r) this._cube.rotate(2 * elapsedTime, 'y');
    if (this._controls.rr) this._cube.rotate(2 * elapsedTime, 'z');
    if (this._controls.rl) this._cube.rotate(-2 * elapsedTime, 'z');
  }

  // Controls:
  keyDown(event: any) {
    this.keyHandler(event, true);
  }
  keyUp(event: any) {
    this.keyHandler(event, false);
  }
  keyHandler(event: any, value: boolean) {
    let key = event.key || event.keyCode;
    let nothingHandled = false;
    switch (key) {
      case "ArrowLeft":
      case 37:
        this._controls.l = value;
        break;
      case "ArrowUp":
      case 38:
        this._controls.t = value;
        break;
      case "ArrowRight":
      case 39:
        this._controls.r = value;
        break;
      case "ArrowDown":
      case 40:
        this._controls.b = value;
        break;

      case "a":
      case 65:
        this._controls.l = value;
        break;
      case "w":
      case 87:
        this._controls.t = value;
        break;
      case "d":
      case 68:
        this._controls.r = value;
        break;
      case "s":
      case 83:
        this._controls.b = value;
        break;
      case "q":
      case 81:
        this._controls.rl = value;
        break;
      case "e":
      case 69:
        this._controls.rr = value;
        break;

      default:
        nothingHandled = true;
    }
    if (!nothingHandled) {
      event.preventDefault();
    }
  }

}