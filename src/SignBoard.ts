import SignBoardError from "./core/SignBoardError";
import Renderer from "./core/Renderer";
import TextureLoader from "./core/TextureLoader";
import { Texture } from "./texture";
import { BROWSER } from "./const/event";
import { getCanvas } from "./utils";
import * as ERROR from "./const/error";
import { CONTENT_TYPE, OBJECT_FIT } from "./const/options";
import { Attributes, ValueOf } from "./types";

/**
 * @interface
 * @param {"image" | "video" | "text"} [contentType="image"] A type of content
 * @param {object} [contentAttribs={}] Additional attributes for image / video element (if you need it)
 * @param {number} [frameRate=60] A number of rendering frames per second for video / text
 * @param {boolean} [autoResize=true] Enabling this option will make SignBoard to call `resize` whenever window's `resize` event is triggered
 * @param {boolean} [autoInit=true] If `false` is given, SignBoard will not automatically initialize immediately after creating instance
 * @param {number} [tileSize=8] A size of each tile blocks, in px
 * @param {number} [emission=1.5] LED light emission modifier, bigger the brighter. `emission: 1` will render the original color of the contents
 * @param {number} [dissipation=0.5] A value indicating how fast light fades out from the center of each tiles
 * @param {number} [bulbSize=0.7] A lightbulb's size inside each tiles
 * @param {string} [objectFit="fill"] The object-fit CSS property sets how the content of a replaced element, such as an <img\> or <video\>, should be resized to fit its container.<br/>See https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit for details
 * @param {object} [textOptions={}] Canvas's 2D context attributes for customizing texts
 * @param {number | Array<number>} [textPadding=0] A padding values that will be used for rendering text
 * @param {number} [scrollSpeed=0] A horizontal scroll speed (right to left)
 * @param {boolean} [initOnFontLoad=false] A option that can be used when you're using a custom font that should be loaded before initializing.<br/>Enabling this option will make SignBoard to call `init` after when the font described in `textOptions.font` is loaded.
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
  initOnFontLoad: boolean | [boolean, string];
}

/**
 * WebGL-based LED SignBoard effect for image / video / text
 */
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
  private _initOnFontLoad: SignBoardOptions["initOnFontLoad"];
  private _textOptions: SignBoardOptions["textOptions"];
  private _textPadding: SignBoardOptions["textPadding"];
  private _scrollSpeed: number;

  public get renderer() { return this._renderer; }
  /**
   * Current src of the image/video, or text string when the `contentType` is "text"
   * @type {string}
   * @readonly
   */
  public get src() { return this._src; }
  /**
   * Whether the {@link SignBoard#init} is called
   * @type {boolean}
   * @readonly
   */
  public get initialized() { return this._initialized; }
  public get texture() { return this._texture; }

  // Options
  /**
   * Current value of the `contentType` option
   * @see {@link SignBoardOptions}
   */
  public get contentType() { return this._contentType; }
  public set contentType(val: SignBoardOptions["contentType"]) { this._contentType = val; }
  /**
   * Current value of the `contentAttribs` option
   * @see {@link SignBoardOptions}
   */
  public get contentAttribs() { return this._contentAttribs; }
  public set contentAttribs(val: SignBoardOptions["contentAttribs"]) { this._contentAttribs = val; }
  /**
   * Current value of the `autoResize` option
   * @see {@link SignBoardOptions}
   */
  public get autoResize() { return this._autoResize; }
  public set autoResize(val: boolean) { this._updateAutoResize(val); }
  /**
   * Current value of the `autoInit` option
   * @see {@link SignBoardOptions}
   * @readonly
   */
  public get autoInit() { return this._autoInit; }
  /**
   * Current value of the `frameRate` option
   * @see {@link SignBoardOptions}
   */
  public get frameRate() { return this._frameRate; }
  public set frameRate(val: number) { this._frameRate = val; }
  /**
   * Current value of the `tileSize` option
   * @see {@link SignBoardOptions}
   */
  public get tileSize() { return this._tileSize; }
  public set tileSize(val: number) {
    this._tileSize = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  /**
   * Current value of the `emission` option
   * @see {@link SignBoardOptions}
   */
  public get emission() { return this._emission; }
  public set emission(val: number) {
    this._emission = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  /**
   * Current value of the `dissipation` option
   * @see {@link SignBoardOptions}
   */
  public get dissipation() { return this._dissipation; }
  public set dissipation(val: number) {
    this._dissipation = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  /**
   * Current value of the `bulbSize` option
   * @see {@link SignBoardOptions}
   */
  public get bulbSize() { return this._bulbSize; }
  public set bulbSize(val: number) {
    this._bulbSize = val;
    this._renderer.updateUniforms();
    this._renderer.render();
  }
  /**
   * Current value of the `objectFit` option
   * @see {@link SignBoardOptions}
   */
  public get objectFit() { return this._objectFit; }
  public set objectFit(val: SignBoardOptions["objectFit"]) {
    this._objectFit = val;
    this._renderer.updateTextureOffset();
    this._renderer.render();
  }
  /**
   * Current value of the `textOptions` option
   * @see {@link SignBoardOptions}
   */
  public get textOptions() { return this._textOptions; }
  public set textOptions(val: SignBoardOptions["textOptions"]) {
    this._textOptions = val;
    this.update();
  }
  /**
   * Current value of the `textPadding` option
   * @see {@link SignBoardOptions}
   */
  public get textPadding() { return this._textPadding; }
  public set textPadding(val: SignBoardOptions["textPadding"]) {
    this._textPadding = val;
    this.update();
  }
  /**
   * Current value of the `scrollSpeed` option
   * @see {@link SignBoardOptions}
   */
  public get scrollSpeed() { return this._scrollSpeed; }
  public set scrollSpeed(val: SignBoardOptions["scrollSpeed"]) { this._scrollSpeed = val; }
  /**
   * Current value of the `initOnFontLoad` option
   * @see {@link SignBoardOptions}
   * @readonly
   */
  public get initOnFontLoad() { return this._initOnFontLoad; }

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
    scrollSpeed = 0,
    initOnFontLoad = false
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
    this._initOnFontLoad = initOnFontLoad;

    this.resize = this.resize.bind(this);

    const shouldCheckFontLoad = Array.isArray(initOnFontLoad)
      ? initOnFontLoad[0]
      : initOnFontLoad;

    if (autoInit && !shouldCheckFontLoad) {
      this.init();
    }

    if (shouldCheckFontLoad) {
      this._checkFontLoad();
    }
  }

  /**
   * Destroy the current instance, and release all resources
   * @returns {void}
   */
  public destroy() {
    this._renderer.destroy();
    this._updateAutoResize(false);
    this._initialized = false;
  }

  /**
   * Initialize SignBoard
   * @returns {Promise<SignBoard>} The current instance
   */
  public async init(): Promise<this> {
    const renderer = this._renderer;
    const textureLoader = new TextureLoader(this);

    const texture = await textureLoader.load();
    this._texture = texture;

    renderer.resize();
    renderer.init();
    renderer.setTexture(texture);

    if (this._autoResize) {
      this._autoResize = false;
      this._updateAutoResize(true);
    }

    this._initialized = true;
    this.start();

    return this;
  }

  /**
   * Resize SignBoard with the latest size of the canvas
   * @returns {SignBoard} The current instance
   */
  public resize(): this {
    const renderer = this._renderer;

    renderer.resize();
    renderer.render();

    return this;
  }

  /**
   * Start rendering
   * @returns {SignBoard} The current instance
   */
  public start(): this {
    const renderer = this._renderer;

    if (this._contentType === CONTENT_TYPE.VIDEO || this._scrollSpeed !== 0) {
      renderer.start();
    } else {
      // Render single frame
      renderer.render();
    }

    return this;
  }

  /**
   * Stop rendering
   * @returns {SignBoard} The current instance
   */
  public stop(): this {
    this._renderer.stop();
    return this;
  }

  /**
   * Update the texture
   * @param {string?} src New src to the image/video or text string if `contentType` is "text"
   * @returns {SignBoard} The current instance
   */
  public update(src?: string): this {
    const texture = this._texture;

    if (!texture) throw new SignBoardError(ERROR.MESSAGE.TEXTURE_NOT_INITIALIZED, ERROR.CODE.TEXTURE_NOT_INITIALIZED);

    texture.update(src);
    this._renderer.updateUniforms();

    return this;
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

  private _checkFontLoad() {
    const font = this._textOptions.font;
    if (!font || document.fonts.check(font)) {
      this.init();
      return;
    }

    const initOnFontLoad = this._initOnFontLoad;
    const textToCheck = Array.isArray(initOnFontLoad)
      ? initOnFontLoad[1]
      : "a";

    document.fonts.load(font, textToCheck).then(() => {
      this.init();
    });
  }
}

export default SignBoard;
