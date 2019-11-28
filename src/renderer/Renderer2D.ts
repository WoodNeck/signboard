/**
 * Singleton class to render in 2d context
 */
export default class Renderer2D {
  public static getInstance() {
    const instance = new Renderer2D();
    Renderer2D.getInstance = () => instance;
  }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private constructor() {
    this.canvas = new HTMLCanvasElement();
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }
}
