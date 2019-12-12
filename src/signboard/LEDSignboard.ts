import Entity from "../entity/Entity";
import Renderer2D from "../renderer/Renderer2D";
import Renderer3D from "../renderer/Renderer3D";
import RoundPixelater from "../program/RoundPixelater";
import { createCanvas, getElement } from "../utils";
import { LEDSignboardOptions } from "../type/external";
import * as DEFAULT from "../constant/default";

export default class LEDSignboard {
  private _options: LEDSignboardOptions;
  private _refEl: HTMLElement;
  private _renderer2D: Renderer2D;
  private _renderer3D: Renderer3D;
  private _entities: Entity[];
  private _rafId: number;
  private _animating: boolean;
  private _first: boolean;

  get animating() { return this._animating; }

  constructor(el: HTMLElement | string, options: Partial<LEDSignboardOptions> = {}) {
    const refEl = getElement(el);
    const canvas3D = createCanvas(refEl);

    this._refEl = refEl;
    this._options = Object.assign({...DEFAULT.LED_OPTIONS}, options);
    this._renderer2D = new Renderer2D();
    this._renderer3D = new Renderer3D(canvas3D);

    this.resize();

    this._renderer3D.program = new RoundPixelater(this._renderer3D.context);

    this._entities = [];
    this._rafId = -1;
    this._animating = false;

    this._first = true;
  }

  public resize() {
    const options = this._options;
    const renderer2D = this._renderer2D;
    const renderer3D = this._renderer3D;
    const canvas2D = renderer2D.canvas;
    const canvas3D = renderer3D.canvas;

    if (options.width) {
      canvas3D.width = options.width;
      canvas2D.width = options.width;
    }
    if (options.height) {
      canvas3D.height = options.height;
      canvas2D.height = options.height;
    }

    if (!options.width || !options.height) {
      const refEl = this._refEl;
      const width = refEl.offsetWidth;
      const height = refEl.offsetHeight;

      canvas3D.width = width;
      canvas3D.height = height;
      canvas2D.width = width;
      canvas2D.height = height;
    }
  }

  public add(entity: Entity | Entity[]): this {
    if (Array.isArray(entity)) {
      this._entities.push(...entity);
    } else {
      this._entities.push(entity);
    }

    return this;
  }

  public remove(entity: Entity): this {
    this._entities.splice(
      this._entities.findIndex(val => val === entity), 1,
    );

    return this;
  }

  public start(): this {
    this._animating = true;
    this._rafId = requestAnimationFrame(this._renderLoop);
    return this;
  }

  public stop(): this {
    cancelAnimationFrame(this._rafId);
    this._animating = false;
    this._rafId = -1;
    return this;
  }

  public render(): this {
    this._beginRender();
    this._draw2D();
    this._draw3D();
    return this;
  }

  private _beginRender(): void {
    const renderer2D = this._renderer2D;
    const renderer3D = this._renderer3D;

    renderer2D.clear();
    renderer3D.clear();
  }

  private _draw2D(): void {
    const renderer2D = this._renderer2D;

    // Render all sorted entities by depth(ascending)
    const sortedEntities = this._entities.sort((a, b) => a.depth - b.depth);
    renderer2D.render(sortedEntities);

    if (this._first) {
      this._first = false;
    }
  }

  private _draw3D(): void {
    // Get rendering result as a texture
    const renderer3D = this._renderer3D;
    const renderResult2D = this._renderer2D.result;

    if (!renderer3D.program) return;

    renderer3D.program.setTexture(0, renderResult2D);
    renderer3D.beginRender();
    renderer3D.render();
  }

  private _renderLoop = () => {
    this.render();
    this._rafId = requestAnimationFrame(this._renderLoop);
  }
}
