import Renderer from "./Renderer";
import { getGLContext } from "../utils";
import Program from "../program/Program";
import { Uniforms } from "../type/internal";

type RendererUniforms = Uniforms<"screenSize">;

export default class Renderer3D implements Renderer {
  private _canvas: HTMLCanvasElement;
  private _context: WebGLRenderingContext;
  private _program: Program | null;

  private _vertexBuffer: WebGLBuffer;
  private _indexBuffer: WebGLBuffer;
  private _texcoordBuffer: WebGLBuffer;
  private _uniforms: RendererUniforms;

  public get canvas() { return this._canvas; }
  public get context() { return this._context; }
  public get program() { return this._program; }

  public set program(val: Program | null) {
    if (val === this._program) return;

    this._program = val;

    if (val != null) {
      this._useProgram(val.program);
    } else {
      this._uniforms = {};
    }
  }

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = getGLContext(this.canvas);
    this._program = null;
    this._uniforms = {};

    const gl = this._context;
    this._vertexBuffer = gl.createBuffer()!;
    this._indexBuffer = gl.createBuffer()!;
    this._texcoordBuffer = gl.createBuffer()!;
  }

  public clear() {
    const gl = this._context;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  public beginRender() {
    if (!this._program) return;

    const gl = this._context;
    const uniforms = this._uniforms as Required<RendererUniforms>;

    gl.uniform4fv(uniforms.screenSize, [
      gl.drawingBufferWidth, gl.drawingBufferHeight,
      1 / gl.drawingBufferWidth, 1 / gl.drawingBufferHeight,
    ]);
  }

  public render() {
    const program = this._program;
    if (!program) return;

    program.update();

    const gl = this._context;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, program.vertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, program.texcoords, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, program.indices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    gl.drawElements(program.primitiveType, program.itemCount, gl.UNSIGNED_SHORT, 0);
  }

  private _useProgram(program: WebGLProgram) {
    const gl = this._context;

    gl.useProgram(program);
    this._uniforms = {
      screenSize: gl.getUniformLocation(program, "uScreenSize")!,
    };
  }
}
