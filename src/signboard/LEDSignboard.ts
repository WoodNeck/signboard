import Entity from "../entity/Entity";
import Renderer2D from "../renderer/Renderer2D";
import Renderer3D from "../renderer/Renderer3D";
import { createCanvas } from "../utils";
import { LEDSignboardOptions } from "../type/external";
import * as DEFAULT from "../constant/default";

export default class LEDSignboard {
  private _options: LEDSignboardOptions;
  private _canvas: HTMLCanvasElement;
  private _renderer2D: Renderer2D;
  private _renderer3D: Renderer3D;
  private _entities: Entity[];
  private _rafId: number;
  private _animating: boolean;

  constructor(el: HTMLElement | string, options: Partial<LEDSignboardOptions> = {}) {
    this._canvas = createCanvas(el);

    this._renderer2D = new Renderer2D();
    this._renderer3D = new Renderer3D(this._canvas);

    this._options = Object.assign({...DEFAULT.LED_OPTIONS}, options);
    this._entities = [];

    this._rafId = -1;
    this._animating = false;
  }

  public add(entity: Entity | Entity[]): void {
    if (Array.isArray(entity)) {
      this._entities.push(...entity);
    } else {
      this._entities.push(entity);
    }

    if (!this._animating) {
      this.render();
    }
  }

  public remove(entity: Entity): void {
    this._entities.splice(
      this._entities.findIndex(val => val === entity), 1,
    );
  }

  public start(): void {
    this._animating = true;

    this._rafId = requestAnimationFrame(this._renderLoop);
  }

  public stop(): void {
    cancelAnimationFrame(this._rafId);
    this._animating = false;
    this._rafId = -1;
  }

  public render(): void {
    this._beginRender();
    this._draw2D();
    this._beginDraw3D();
    this._draw3D();
  }

  private _beginRender(): void {
    const options = this._options;
    const renderer2D = this._renderer2D;
    const renderer3D = this._renderer3D;
    const canvas3D = this._canvas;
    const canvas2D = renderer2D.canvas;

    if (options.width) {
      canvas3D.width = options.width;
      canvas2D.width = options.width;
    }
    if (options.height) {
      canvas3D.height = options.height;
      canvas2D.height = options.height;
    }

    renderer2D.clear();
    renderer3D.clear();
  }

  private _draw2D(): void {
    const renderer2D = this._renderer2D;

    // Render all sorted entities by depth(ascending)
    const sortedEntities = this._entities.sort((a, b) => a.depth - b.depth);
    renderer2D.render(sortedEntities);
  }

  private _beginDraw3D(): void {
    const renderer2D = this._renderer2D;

    // Get rendering result as a texture
    const renderResult = renderer2D.result;
  }

  private _draw3D(): void {
    // Render to gl, then apply LED post process
  }

  private _renderLoop = () => {
    this.render();
    this._rafId = requestAnimationFrame(this._renderLoop);
  }
}
