/**
 * Singleton class to render in 2d context
 */
export default class Renderer2D {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  get canvas() { return this._canvas; }
  get context() { return this._context; }

  constructor() {
    this._canvas = new HTMLCanvasElement();
    this._context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }
}
