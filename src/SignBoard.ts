import Renderer from "./core/Renderer";
import TextureLoader from "./core/TextureLoader";
import { Texture } from "./texture";
import { BROWSER } from "./const/event";
import { getCanvas } from "./utils";
import { CONTENT_TYPE, OBJECT_FIT } from "./const/external";
import { Attributes, ValueOf } from "./types";

/**
 * @interface
 * @param {"image" | "video"} [contentType="image"]
 * @param {object} [contentAttribs={}]
 * @param {number} [frameRate=60]
 * @param {boolean} [autoResize=true]
 * @param {number} [tileSize=8]
 * @param {number} [emission=1.5]
 * @param {number} [dissipation=0.5]
 * @param {number} [bulbSize=0.7]
 * @param {string} [objectFit="fill"]
 */
export interface SignBoardOptions {
  contentType: ValueOf<typeof CONTENT_TYPE>;
  contentAttribs: Partial<Attributes<HTMLImageElement> | Attributes<HTMLMediaElement>>;
  frameRate: number;
  tileSize: number;
  emission: number;
  dissipation: number;
  bulbSize: number;
  objectFit: ValueOf<typeof OBJECT_FIT>;
  autoResize: boolean;
  autoInit: boolean;
}

class SignBoard {
  private _renderer: Renderer;
  private _texture: Texture | null;
  private _src: string;
  private _initialized: boolean;

  // Options
  private _contentType: SignBoardOptions["contentType"];
  private _contentAttribs: SignBoardOptions["contentAttribs"];
  private _autoResize: boolean;
  private _autoInit: boolean;

  public get renderer() { return this._renderer; }
  public get src() { return this._src; }
  public get initialized() { return this._initialized; }
  public get texture() { return this._texture; }

  // Options
  public get contentType() { return this._contentType; }
  public set contentType(val: SignBoardOptions["contentType"]) { this._contentType = val; }
  public get frameRate() { return this._renderer.frameRate; }
  public set frameRate(val: number) { this._renderer.frameRate = val; }
  public get tileSize() { return this._renderer.tileSize; }
  public set tileSize(val: number) { this._renderer.tileSize = val; }
  public get objectFit() { return this._renderer.objectFit; }
  public set objectFit(val: SignBoardOptions["objectFit"]) { this._renderer.objectFit = val; }
  public get autoResize() { return this._autoResize; }
  public set autoResize(val: boolean) { this._updateAutoResize(val); }
  public get autoInit() { return this._autoInit; }
  public set autoInit(val: boolean) { this._autoInit = val; }

  /**
   * @param {string|HTMLElement} canvas CSS query selector or canvas element
   * @param {string} src Source URL to the image / video
   * @param {SignBoardOptions} options An options object
   */
  public constructor(canvas: string | HTMLElement, src: string, {
    contentType = CONTENT_TYPE.IMAGE,
    contentAttribs = {},
    frameRate = 60,
    tileSize = 8,
    emission = 1.5,
    dissipation = 0.5,
    bulbSize = 0.7,
    objectFit = OBJECT_FIT.FILL,
    autoResize = true,
    autoInit = true
  }: Partial<SignBoardOptions> = {}) {
    // Core components
    this._renderer = new Renderer(getCanvas(canvas), {
      frameRate,
      tileSize,
      emission,
      dissipation,
      bulbSize,
      objectFit
    });
    this._src = src;
    this._texture = null;

    // Internal States
    this._initialized = false;

    // Bind options
    this._contentType = contentType;
    this._contentAttribs = contentAttribs;
    this._autoResize = autoResize;
    this._autoInit = autoInit;

    this.resize = this.resize.bind(this);

    this.init();
  }

  public async init() {
    const renderer = this._renderer;
    const textureLoader = new TextureLoader(this._src, this._contentType, this._contentAttribs);

    const texture = await textureLoader.load();
    this._texture = texture;

    renderer.resize();
    renderer.init();
    renderer.setTexture(texture);

    this.start();

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

  public start() {
    const renderer = this._renderer;

    if (this._contentType === CONTENT_TYPE.VIDEO) {
      renderer.start();
    } else {
      // Render single frame
      renderer.render();
    }
  }

  public stop() {

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
