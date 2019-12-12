import Renderer from "./Renderer";
import Entity from "../entity/Entity";
import { WritableKeys } from "ts-essentials";

export default class Renderer2D implements Renderer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  get canvas() { return this._canvas; }
  get result() { return this._context.getImageData(0, 0, this._canvas.width, this._canvas.height); }

  constructor() {
    const canvas = document.createElement("canvas");

    this._canvas = canvas;
    this._context = canvas.getContext("2d") as CanvasRenderingContext2D;
    document.body.appendChild(this._canvas);
  }

  public clear(): void {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  public render(entities: Entity[]): void {
    entities.forEach(entity => {
      entity.render({
        context2D: this._context,
        preserve: this._preserve,
      });
    });
  }

  private _preserve = (
    keys: Array<WritableKeys<CanvasRenderingContext2D>>,
    callback: () => void,
  ) => {
    const context = this._context;
    const originalVals = keys.map(key => context[key]);

    callback();

    keys.forEach((key, idx) => {
      context[key] = originalVals[idx] as never;
    });
  }
}
