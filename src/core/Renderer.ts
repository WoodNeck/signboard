import SignBoardError from "./SignBoardError";
import Texture from "../texture/Texture";
import signboardVS from "../shader/signboard.vert";
import signboardFS from "../shader/signboard.frag";
import * as ATTRIBUTE from "../const/attribute";
import * as ERROR from "../const/error";
import { getWebGLContext } from "../utils";

interface RendererOptions {
  frameRate: number;
  tileSize: number;
  emission: number;
  bulbSize: number;
}

class Renderer {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext;
  private _program: WebGLProgram | null;
  private _uniforms: {
    uInvTileSize: WebGLUniformLocation | null,
    uResolution: WebGLUniformLocation | null,
    uEmission: WebGLUniformLocation | null,
    uBulbSize: WebGLUniformLocation | null
  }
  private _texture: Texture | null;
  private _lastRenderTime: number;
  private _animationID: number;

  // Options
  private _frameRate: number;
  private _tileSize: number;
  private _emission: number;
  private _bulbSize: number;

  public get canvas() { return this._canvas; }
  public get gl() { return this._gl; }

  public get frameRate() { return this._frameRate; }
  public set frameRate(val: number) { this._frameRate = val; }
  public get tileSize() { return this._tileSize; }
  public set tileSize(val: number) {
    this._tileSize = val;
    this._updateUniforms();
    this.render();
  }
  public get emission() { return this._emission; }
  public set emission(val: number) {
    this._emission = val;
    this._updateUniforms();
    this.render();
  }
  public get bulbSize() { return this._bulbSize; }
  public set bulbSize(val: number) {
    this._bulbSize = val;
    this._updateUniforms();
    this.render();
  }

  public constructor(canvas: HTMLCanvasElement, {
    frameRate,
    tileSize,
    emission,
    bulbSize
  }: RendererOptions) {
    this._canvas = canvas;
    this._gl = getWebGLContext(canvas);
    this._program = null;
    this._texture = null;
    this._lastRenderTime = -1;
    this._animationID = -1;
    this._uniforms = {
      uInvTileSize: null,
      uResolution: null,
      uEmission: null,
      uBulbSize: null
    };

    // Options
    this._frameRate = frameRate;
    this._tileSize = tileSize;
    this._emission = emission;
    this._bulbSize = bulbSize;
  }

  public destroy() {
    this.stop();

    this._texture = null;
    this._gl.deleteProgram(this._program);
  }

  public init() {
    const gl = this._gl;
    const program = this._createWebGLProgram();

    this._program = program;

    gl.useProgram(program);
    this._bindAttributes(program);
    this._bindUniforms(program);
    this._updateUniforms();
  }

  public setTexture(texture: Texture) {
    texture.init(this._gl);
    this._texture = texture;
  }

  public resize() {
    const canvas = this._canvas;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this._updateUniforms();
  }

  /**
   */
  public start() {
    this._animationID = requestAnimationFrame(this._onAnimationFrame);
  }

  /**
   * Stop animation
   */
  public stop() {
    cancelAnimationFrame(this._animationID);
    this._animationID = -1;
    this._lastRenderTime = -1;
  }

  /**
   * Render a single frame
   */
  public render() {
    const gl = this._gl;

    this._texture!.upload(this._gl);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  private _onAnimationFrame = (time: number) => {
    const lastTime = this._lastRenderTime;
    const timeDiff = time - lastTime;
    const updateInterval = 1000 / this._frameRate;

    if (timeDiff >= updateInterval || lastTime < 0) {
      this.render();
      this._lastRenderTime = lastTime + updateInterval;
    }

    this._animationID = requestAnimationFrame(this._onAnimationFrame);
  }

  private _compileShader(src: string, type: WebGLRenderingContextBase["VERTEX_SHADER"] | WebGLRenderingContextBase["FRAGMENT_SHADER"]) {
    const gl = this._gl;
    const shader = gl.createShader(type)!;

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new SignBoardError(ERROR.MESSAGES.FAILED_COMPILE_SHADER(gl.getShaderInfoLog(shader)), ERROR.CODES.FAILED_COMPILE_SHADER);
    }

    return shader;
  }

  private _createWebGLProgram() {
    const gl = this._gl;

    const program = gl.createProgram()!;
    const vs = this._compileShader(signboardVS, gl.VERTEX_SHADER);
    const fs = this._compileShader(signboardFS, gl.FRAGMENT_SHADER);

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter( program, gl.LINK_STATUS)) {
      throw new SignBoardError(ERROR.MESSAGES.FAILED_COMPILE_PROGRAM(gl.getProgramInfoLog(program)), ERROR.CODES.FAILED_COMPILE_PROGRAM);
    }

    return program;
  }

  private _bindAttributes(program: WebGLProgram) {
    const gl = this._gl;
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const texcoordLocation = gl.getAttribLocation(program, "aTexCoord");

    const positionBuffer = gl.createBuffer();
    const texcoordBuffer = gl.createBuffer();

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ATTRIBUTE.POSITION, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(texcoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ATTRIBUTE.TEX_COORD, gl.STATIC_DRAW);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
  }

  private _bindUniforms(program: WebGLProgram) {
    const gl = this._gl;

    this._uniforms = {
      uInvTileSize: gl.getUniformLocation(program, "uInvTileSize"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uEmission: gl.getUniformLocation(program, "uEmission"),
      uBulbSize: gl.getUniformLocation(program, "uBulbSize")
    }
  }

  private _updateUniforms() {
    const gl = this._gl;
    const canvas = this._canvas;
    const uniforms = this._uniforms;

    if (!this._program) return;

    gl.uniform1f(uniforms.uInvTileSize, 1 / this._tileSize);
    gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.uEmission, this._emission);
    gl.uniform1f(uniforms.uBulbSize, this._bulbSize);
  }
}

export default Renderer;
