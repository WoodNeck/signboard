import Renderer from "./core/Renderer";
import TextureLoader from "./core/TextureLoader";
import { Texture } from "./texture";
import { BROWSER } from "./const/event";
import { getCanvas } from "./utils";
import { CONTENT_TYPE, OBJECT_FIT } from "./const/external";
import { Attributes, ValueOf } from "./types";

/**
 * @interface
 * @param {"image" | "video" | "text"} [contentType="image"]
 * @param {object} [contentAttribs={}]
 * @param {number} [frameRate=60]
 * @param {boolean} [autoResize=true]
 * @param {boolean} [autoInit=true]
 * @param {number} [tileSize=8]
 * @param {number} [emission=1.5]
 * @param {number} [dissipation=0.5]
 * @param {number} [bulbSize=0.7]
 * @param {string} [objectFit="fill"]
 * @param {object} [textOptions={}]
 */
export interface SignBoardOptions {
  contentType: ValueOf<typeof CONTENT_TYPE>;
  contentAttribs: Partial<Attributes<HTMLImageElement> | Attributes<HTMLMediaElement>>;
  frameRate: number;
  autoResize: boolean;
  autoInit: boolean;
  tileSize: number;
  emission: number;
  dissipation: number;
  bulbSize: number;
  objectFit: ValueOf<typeof OBJECT_FIT>;
  textOptions: Partial<Attributes<CanvasRenderingContext2D>>;
  textPadding: number | number[];
  scrollSpeed: number;
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
  private _frameRate: number;
  private _tileSize: number;
  private _emission: number;
  private _dissipation: number;
  private _bulbSize: number;
  private _objectFit: ValueOf<typeof OBJECT_FIT>;
  private _textOptions: SignBoardOptions["textOptions"];
  private _textPadding: SignBoardOptions["textPadding"];
  private _scrollSpeed: number;

  public get renderer() { return this._renderer; }
  public get src() { return this._src; }
  public get initialized() { return this._initialized; }
  public get texture() { return this._texture; }

  // Options
  public get contentType() { return this._contentType; }
  public set contentType(val: SignBoardOptions["contentType"]) { this._contentType = val; }
  public get contentAttribs() { return this._contentAttribs; }
  public set contentAttribs(val: SignBoardOptions["contentAttribs"]) { this._contentAttribs = val; }
  public get autoResize() { return this._autoResize; }
  public set autoResize(val: boolean) { this._updateAutoResize(val); }
  public get autoInit() { return this._autoInit; }
  public set autoInit(val: boolean) { this._autoInit = val; }
  public get frameRate() { return this._frameRate; }
  public set frameRate(val: number) { this._frameRate = val; }
  public get tileSize() { return this._tileSize; }
  public set tileSize(val: number) {
    this._tileSize = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  public get emission() { return this._emission; }
  public set emission(val: number) {
    this._emission = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  public get dissipation() { return this._dissipation; }
  public set dissipation(val: number) {
    this._dissipation = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  public get bulbSize() { return this._bulbSize; }
  public set bulbSize(val: number) {
    this._bulbSize = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  public get objectFit() { return this._objectFit; }
  public set objectFit(val: SignBoardOptions["objectFit"]) {
    this._objectFit = val;
    this._renderer.updateTextureOffset();
    this._renderer.render();
  }
  public get textOptions() { return this._textOptions; }
  public set textOptions(val: SignBoardOptions["textOptions"]) { this._textOptions = val; }
  public get textPadding() { return this._textPadding; }
  public set textPadding(val: SignBoardOptions["textPadding"]) { this._textPadding = val; }
  public get scrollSpeed() { return this._scrollSpeed; }
  public set scrollSpeed(val: SignBoardOptions["scrollSpeed"]) { this._scrollSpeed = val; }

  /**
   * @param {string|HTMLElement} canvas CSS query selector or canvas element
   * @param {string} src Source URL to the image / video
   * @param {SignBoardOptions} options An options object
   */
  public constructor(canvas: string | HTMLElement, src: string, {
    contentType = CONTENT_TYPE.IMAGE,
    contentAttribs = {},
    autoResize = true,
    autoInit = true,
    frameRate = 60,
    tileSize = 8,
    emission = 1.5,
    dissipation = 0.5,
    bulbSize = 0.7,
    objectFit = OBJECT_FIT.FILL,
    textOptions = {},
    textPadding = 0,
    scrollSpeed = 0
  }: Partial<SignBoardOptions> = {}) {
    // Core components
    this._renderer = new Renderer(getCanvas(canvas), this);
    this._src = src;
    this._texture = null;

    // Internal States
    this._initialized = false;

    // Bind options
    this._contentType = contentType;
    this._contentAttribs = contentAttribs;
    this._autoResize = autoResize;
    this._autoInit = autoInit;
    this._frameRate = frameRate;
    this._tileSize = tileSize;
    this._emission = emission;
    this._dissipation = dissipation;
    this._bulbSize = bulbSize;
    this._objectFit = objectFit;
    this._textOptions = textOptions;
    this._textPadding = textPadding;
    this._scrollSpeed = scrollSpeed;

    this.resize = this.resize.bind(this);

    this.init();
  }

  public async init() {
    const renderer = this._renderer;
    const textureLoader = new TextureLoader(this);

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

    if (this._contentType === CONTENT_TYPE.VIDEO || this._scrollSpeed !== 0) {
      renderer.start();
    } else {
      // Render single frame
      renderer.render();
    }
  }

  public stop() {
    this._renderer.stop();
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
