import { createCanvas, getGLContext } from "../utils";

export default class LEDSignboard {
  private _canvas: HTMLCanvasElement;
  private _context: WebGLRenderingContext;

  public get canvas() { return this._canvas; }

  constructor(el: HTMLElement | string) {
    this._canvas = createCanvas(el);
    this._context = getGLContext(this.canvas);
  }
}
