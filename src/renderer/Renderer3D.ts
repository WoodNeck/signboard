import Renderer from "./Renderer";
import { getGLContext } from "../utils";
import Program from "../program/Program";

export default class Renderer3D implements Renderer {
  private _canvas: HTMLCanvasElement;
  private _context: WebGLRenderingContext;
  private _program: Program | null;

  public get canvas() { return this._canvas; }
  public get context() { return this._context; }
  public get program() { return this._program; }

  public set program(val: Program | null) {
    if (val === this._program) return;

    this._program = val;

    if (val != null) {
      this._context.useProgram(val.program);
    }
  }

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = getGLContext(this.canvas);
    this._program = null;
  }

  public clear() {
    const gl = this._context;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  public render() {

  }
}
