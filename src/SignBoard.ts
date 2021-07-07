import Renderer from "./core/Renderer";
import TextureLoader from "./core/TextureLoader";
import { Texture } from "./texture";
import { BROWSER } from "./const/event";
import { getCanvas } from "./utils";
import { CONTENT_TYPE } from "./const/external";
import { ValueOf } from "./types";

/**
 * @interface
 * @param {"image" | "video"} [contentType="image"]
 * @param {number} [frameRate=60]
 * @param {boolean} [autoResize=true]
 * @param {number} [tileSize=8]
 * @param {number} [emission=1]
 * @param {number} [bulbSize=0.7]
 */
interface SignBoardOptions {
  contentType: ValueOf<typeof CONTENT_TYPE>;
  frameRate: number;
  autoResize: boolean;
  tileSize: number;
  emission: number;
  bulbSize: number;
}

class SignBoard {
  private _renderer: Renderer;
  private _texture: Texture | null;
  private _src: string;
  private _initialized: boolean;

  // Options
  private _contentType: ValueOf<typeof CONTENT_TYPE>;
  private _autoResize: boolean;

  public get renderer() { return this._renderer; }
  public get src() { return this._src; }
  public get initialized() { return this._initialized; }

  // Options
  public get texture() { return this._texture; }
  public get contentType() { return this._contentType; }
  public set contentType(val: ValueOf<typeof CONTENT_TYPE>) { this._contentType = val; }
  public get frameRate() { return this._renderer.frameRate; }
  public set frameRate(val: number) { this._renderer.frameRate = val; }
  public get tileSize() { return this._renderer.tileSize; }
  public set tileSize(val: number) { this._renderer.tileSize = val; }
  public get autoResize() { return this._autoResize; }
  public set autoResize(val: boolean) { this._updateAutoResize(val); }

  /**
   *
   * @param {string|HTMLElement} canvas CSS query selector or canvas element
   * @param {string} src Source URL to the image / video
   * @param {SignBoardOptions} options An options object
   */
  public constructor(canvas: string | HTMLElement, src: string, {
    contentType = CONTENT_TYPE.IMAGE,
    frameRate = 60,
    autoResize = true,
    tileSize = 8,
    emission = 1,
    bulbSize = 0.7
  }: Partial<SignBoardOptions> = {}) {
    // Core components
    this._renderer = new Renderer(getCanvas(canvas), {
      frameRate,
      tileSize,
      emission,
      bulbSize
    });
    this._src = src;
    this._texture = null;

    // Internal States
    this._initialized = false;

    // Bind options
    this._contentType = contentType
    this._autoResize = autoResize;

    this.resize = this.resize.bind(this);

    this.init();
  }

  public async init() {
    const renderer = this._renderer;
    const textureLoader = new TextureLoader(this._src, this._contentType);

    const texture = await textureLoader.load();
    this._texture = texture;

    renderer.resize();
    renderer.init();
    renderer.setTexture(texture);

    if (this._contentType === CONTENT_TYPE.VIDEO) {
      renderer.start();
    } else {
      // Render single frame
      renderer.render();
    }

    if (this._autoResize) {
      this._autoResize = false;
      this._updateAutoResize(true);
    }
    this._initialized = true;
  }

  public resize() {
    const renderer = this._renderer;

    renderer.resize();
    renderer.render();
  }

  private _updateAutoResize(newVal: boolean) {
    const prevVal = this._autoResize;

    if (prevVal === newVal) return;

    if (newVal) {
      window.addEventListener(BROWSER.RESIZE, this.resize);
    } else {
      window.removeEventListener(BROWSER.RESIZE, this.resize);
    }

    this._autoResize = newVal;
  }
}

export default SignBoard;
