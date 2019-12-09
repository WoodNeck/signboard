import Program from "./Program";
import vsSource from "../shader/pass.vs";
import fsSource from "../shader/round-pixelate.fs";
import { createProgram } from "../utils";

const vertices = new Float32Array([
  -1, -1, 0,
  1, -1, 0,
  -1, 1, 0,
  1, 1, 0,
]);

const indices = new Uint16Array([
  0, 1, 2, 3,
]);

/**
 * Round pixelater program for rendering pixelated result
 */
export default class RoundPixelater implements Program {
  public readonly itemSize = 3;
  public readonly itemCount = 4;
  public readonly primitiveType = WebGLRenderingContext.TRIANGLE_STRIP;

  private _gl: WebGLRenderingContext;
  private _program: WebGLProgram;
  private _texture: WebGLTexture;

  public get program() { return this._program; }
  public get vertices() { return vertices; }
  public get indices() { return indices; }
  public get texcoords() { return vertices; }

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this._program = createProgram(gl, vsSource, fsSource);
    this._texture = gl.createTexture()!;
  }

  // Set texture regardless of index
  public setTexture(_index: number, image: ImageData) {
    const gl = this._gl;

    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  public update() {
    if (!this._texture) return;

    const gl = this._gl;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.uniform1i(gl.getUniformLocation(this._program, "uTex0"), 0);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}