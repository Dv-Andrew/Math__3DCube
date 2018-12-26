import { map } from '../libs/p5';
import { Cube } from './Cube';

export default class CubeAnimation {

  private _canvas: any;
  private _context: any;

  private _previousTime: number;
  private _fps: number;

  constructor(canvasSelector: string) {
    this._canvas = document.querySelector(canvasSelector);
    this._context = this._canvas.getContext('2d');
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
    this._canvas.focus();

    this.setup();
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
    this._context.save();

    this._context.translate(this._canvas.width/2, this._canvas.height/2);
    this._context.fillStyle = '#FFFFFF';

    this._context.arc(0, 0, 10, 0, Math.PI * 2);
    this._context.fill();

    this._context.restore();
  }

  draw() {

  }

  update(elapsedTime: number) {

  }
}