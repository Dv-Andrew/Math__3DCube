import { Vector } from "../libs/Vector";
import { Matrix } from "../libs/Matrix";

export class Cube {

  private _3dEdges: Vector[] = []; //X, Y, Z
  private _2dEdges: Vector[] = []; //X, Y

  private _2dPosition = new Vector(0, 0, 0);

  constructor(
    private _context: CanvasRenderingContext2D,
    private _3dPosition: Vector,
    private _size: Vector
  ) {

    this._3dEdges[0] = new Vector([- (_size.getX() / 2), + (_size.getY() / 2), + (_size.getZ() / 2)]); // front top left
    this._3dEdges[1] = new Vector([+ (_size.getX() / 2), + (_size.getY() / 2), + (_size.getZ() / 2)]); // front top right
    this._3dEdges[2] = new Vector([+ (_size.getX() / 2), - (_size.getY() / 2), + (_size.getZ() / 2)]); // front bottom right
    this._3dEdges[3] = new Vector([- (_size.getX() / 2), - (_size.getY() / 2), + (_size.getZ() / 2)]); // front bottom left
    this._3dEdges[4] = new Vector([- (_size.getX() / 2), + (_size.getY() / 2), - (_size.getZ() / 2)]); // back top left
    this._3dEdges[5] = new Vector([+ (_size.getX() / 2), + (_size.getY() / 2), - (_size.getZ() / 2)]); // back top right
    this._3dEdges[6] = new Vector([+ (_size.getX() / 2), - (_size.getY() / 2), - (_size.getZ() / 2)]); // back bottom right
    this._3dEdges[7] = new Vector([- (_size.getX() / 2), - (_size.getY() / 2), - (_size.getZ() / 2)]); // back bottom left
  }

  draw() {
    let ctx = this._context;

    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;

    ctx.save();
    ctx.translate(this._2dPosition.getX(), this._2dPosition.getY());

    for (let i of this._2dEdges) {
      ctx.beginPath();
      ctx.arc(i.getX(), i.getY(), 3, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    for (let i = 0; i < 4; i++) {
      this.connect(ctx, i, (i + 1) % 4);
      this.connect(ctx, i + 4, ((i + 1) % 4) + 4);
      this.connect(ctx, i, i + 4);
    }

    ctx.restore();
  }

  update(elapsedTime: number) {
    this.projected2d();
  }

  projected2d() {

    let projectionMatrix: number[][] =
      [
        [1, 0, 0],
        [0, 1, 0]
      ];

    for (let i = 0; i < this._3dEdges.length; i++) {

      let matrix = Matrix.mul(projectionMatrix, <number[][]><unknown>this._3dEdges[i].toArray(2));
      this._2dEdges[i] = new Vector(matrix);
    }

    this._2dPosition.set(Matrix.mul(projectionMatrix, <number[][]><unknown>this._3dPosition.toArray(2)));
  }

  rotate(angle: number, direction: string = 'x') {
    let rotateX: number[][] =
      [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
      ];
    let rotateY: number[][] =
      [
        [Math.cos(angle), 0, -Math.sin(angle)],
        [0, 1, 0],
        [Math.sin(angle), 0, Math.cos(angle)]
      ];
    let rotateZ: number[][] =
      [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
      ];

    let rotationMatrix: number[][];
    if (direction == 'x') rotationMatrix = rotateX;
    if (direction == 'y') rotationMatrix = rotateY;
    if (direction == 'z') rotationMatrix = rotateZ;

    for (let i = 0; i < this._3dEdges.length; i++) {
      let matrix = Matrix.mul(rotationMatrix, <number[][]><unknown>this._3dEdges[i].toArray(2));
      this._3dEdges[i].set(matrix);
    }
  }

  connect(ctx: CanvasRenderingContext2D, p1: number, p2: number) {
    ctx.beginPath();
    ctx.moveTo(this._2dEdges[p1].getX(), this._2dEdges[p1].getY());
    ctx.lineTo(this._2dEdges[p2].getX(), this._2dEdges[p2].getY());
    ctx.closePath();
    ctx.stroke();
  }
}