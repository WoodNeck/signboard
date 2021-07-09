import SignBoardError from "./SignBoardError";
import SignBoard from "../SignBoard";
import Texture from "../texture/Texture";
import signboardVS from "../shader/signboard.vert";
import signboardFS from "../shader/signboard.frag";
import * as VERTEX from "../const/vertex";
import * as ERROR from "../const/error";
import { getSubImage, getWebGLContext } from "../utils";

class Renderer {
  private _signboard: SignBoard;
  private _canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext;
  private _program: WebGLProgram | null;
  private _uniforms: {
    uInvTileSize: WebGLUniformLocation | null,
    uResolution: WebGLUniformLocation | null,
    uEmission: WebGLUniformLocation | null,
    uDissipation: WebGLUniformLocation | null,
    uBulbSize: WebGLUniformLocation | null,
    uTexOffset: WebGLUniformLocation | null,
    uTexScale: WebGLUniformLocation | null,
    uScrollOffset: WebGLUniformLocation | null
  }
  private _texture: Texture | null;
  private _lastRenderTime: number;
  private _animationID: number;
  private _prevScroll: number;

  public get animating() { return this._animationID >= 0; }

  // Options
  public get canvas() { return this._canvas; }
  public get gl() { return this._gl; }

  public constructor(canvas: HTMLCanvasElement, signboard: SignBoard) {
    this._signboard = signboard;
    this._canvas = canvas;
    this._gl = getWebGLContext(canvas);
    this._program = null;
    this._texture = null;
    this._lastRenderTime = -1;
    this._animationID = -1;
    this._prevScroll = 0;
    this._uniforms = {
      uInvTileSize: null,
      uResolution: null,
      uEmission: null,
      uDissipation: null,
      uBulbSize: null,
      uTexOffset: null,
      uTexScale: null,
      uScrollOffset: null
    };
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
    this.updateUniforms();
  }

  public setTexture(texture: Texture) {
    texture.init(this._gl);
    this._texture = texture;
    this.updateTextureOffset();
  }

  public resize() {
    const canvas = this._canvas;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.updateUniforms();
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
    const texture = this._texture;

    if (!texture) {
      throw new SignBoardError(ERROR.MESSAGE.TEXTURE_NOT_INITIALIZED, ERROR.CODE.TEXTURE_NOT_INITIALIZED);
    }

    texture.upload(this._gl);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  public updateUniforms() {
    const signboard = this._signboard;
    const gl = this._gl;
    const canvas = this._canvas;
    const uniforms = this._uniforms;

    if (!this._program) return;

    gl.uniform1f(uniforms.uInvTileSize, 1 / signboard.tileSize);
    gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.uEmission, signboard.emission);
    gl.uniform1f(uniforms.uDissipation, 1 / signboard.dissipation);
    gl.uniform1f(uniforms.uBulbSize, signboard.bulbSize);

    if (this._texture) {
      this.updateTextureOffset();
    }
  }

  public updateTextureOffset() {
    const signboard = this._signboard;
    const gl = this._gl;
    const texture = this._texture;
    const uniforms = this._uniforms;

    if (!texture) {
      throw new SignBoardError(ERROR.MESSAGE.TEXTURE_NOT_INITIALIZED, ERROR.CODE.TEXTURE_NOT_INITIALIZED);
    }

    const renderingSize = { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight };
    const subImage = getSubImage(texture.size, renderingSize, signboard.objectFit, signboard.contentType);

    gl.uniform2f(uniforms.uTexOffset, subImage.x / renderingSize.width, subImage.y / renderingSize.height);
    gl.uniform2f(uniforms.uTexScale, renderingSize.width / subImage.width, renderingSize.height / subImage.height);
  }

  private _onAnimationFrame = (time: number) => {
    const signboard = this._signboard;
    const lastTime = this._lastRenderTime;
    const delta = time - lastTime;
    const updateInterval = 1000 / signboard.frameRate;

    if (delta >= updateInterval || lastTime < 0) {
      this._increaseScrollOffset();
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
      throw new SignBoardError(ERROR.MESSAGE.FAILED_COMPILE_SHADER(gl.getShaderInfoLog(shader)), ERROR.CODE.FAILED_COMPILE_SHADER);
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
      throw new SignBoardError(ERROR.MESSAGE.FAILED_COMPILE_PROGRAM(gl.getProgramInfoLog(program)), ERROR.CODE.FAILED_COMPILE_PROGRAM);
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
    gl.bufferData(gl.ARRAY_BUFFER, VERTEX.POSITION, gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(texcoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, VERTEX.TEX_COORD, gl.STATIC_DRAW);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
  }

  private _bindUniforms(program: WebGLProgram) {
    const gl = this._gl;
    const uniforms = this._uniforms;

    for (const key in uniforms) {
      uniforms[key as keyof typeof uniforms] = gl.getUniformLocation(program, key);
    }
  }

  private _increaseScrollOffset() {
    const signboard = this._signboard;
    const gl = this._gl;
    const texture = this._texture;
    const uniforms = this._uniforms;
    const scrollSpeed = signboard.scrollSpeed;

    if (scrollSpeed === 0) return;

    if (!texture) {
      throw new SignBoardError(ERROR.MESSAGE.TEXTURE_NOT_INITIALIZED, ERROR.CODE.TEXTURE_NOT_INITIALIZED);
    }

    const prevVal = this._prevScroll;
    const newVal = prevVal + scrollSpeed * (1000 / signboard.frameRate) / gl.drawingBufferWidth;

    this._prevScroll = newVal;

    gl.uniform1f(uniforms.uScrollOffset, newVal);
  }
}

export default Renderer;
