import Renderer from "./Renderer";
import { getGLContext } from "../utils";

export default class Renderer3D implements Renderer {
  private _canvas: HTMLCanvasElement;
  private _context: WebGLRenderingContext;

  public get canvas() { return this._canvas; }

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = getGLContext(this.canvas);
  }

  public clear() {
    const gl = this._context;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
}
