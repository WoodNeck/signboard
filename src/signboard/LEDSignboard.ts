import Renderer2D from "../renderer/Renderer2D";
import Entity from "../entity/Entity";
import { createCanvas, getGLContext } from "../utils";
import { LEDSignboardOptions } from "../types";
import * as DEFAULT from "../constant/defaults";

export default class LEDSignboard {
  private _options: LEDSignboardOptions;
  private _canvas: HTMLCanvasElement;
  private _context: WebGLRenderingContext;
  private _renderer2D: Renderer2D;
  private _entities: Entity[];

  public get canvas() { return this._canvas; }

  constructor(el: HTMLElement | string, options: Partial<LEDSignboardOptions> = {}) {
    this._canvas = createCanvas(el);
    this._context = getGLContext(this.canvas);
    this._renderer2D = new Renderer2D();
    this._options = Object.assign({...DEFAULT.LED_OPTIONS}, options);
    this._entities = [];
  }

  public add(entity: Entity) {
    this._entities.push(entity);
  }

  public remove(entity: Entity) {
    this._entities.splice(
      this._entities.findIndex(val => val === entity), 1,
    );
  }

  public render() {
    const renderer2D = this._renderer2D;
    const canvas2D = renderer2D.canvas;

    renderer2D.context.clearRect(0, 0, canvas2D.width, canvas2D.height);

    const sortedEntity = this._entities.sort((a, b) => a.depth - b.depth);
    for (const entity of sortedEntity) {
      entity.render();
    }
  }
}
