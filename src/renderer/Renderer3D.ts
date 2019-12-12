import Renderer from "./Renderer";
import { getGLContext } from "../utils";
import Program from "../program/Program";
import { Uniforms, Attributes } from "../type/internal";

type RendererAttribs = Attributes<"aVPos" | "aTCrd">;
type RendererUniforms = Uniforms<"uScreenSize">;

export default class Renderer3D implements Renderer {
  private _canvas: HTMLCanvasElement;
  private _context: WebGLRenderingContext;
  private _program: Program | null;

  private _vertexBuffer: WebGLBuffer;
  private _indexBuffer: WebGLBuffer;
  private _texcoordBuffer: WebGLBuffer;
  private _attribs: RendererAttribs;
  private _uniforms: RendererUniforms;

  public get canvas() { return this._canvas; }
  public get context() { return this._context; }
  public get program() { return this._program; }

  public set program(val: Program | null) {
    if (val === this._program) return;

    this._program = val;

    if (val != null) {
      this._useProgram(val);
    } else {
      this._attribs = {};
      this._uniforms = {};
    }
  }

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = getGLContext(this.canvas);
    this._program = null;
    this._attribs = {};
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
    const program = this._program;
    if (!program) return;

    const gl = this._context;
    const attribs = this._attribs as Required<RendererAttribs>;
    const uniforms = this._uniforms as Required<RendererUniforms>;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);

    // Set attribs
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.vertexAttribPointer(attribs.aVPos, program.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribs.aVPos);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoordBuffer);
    gl.vertexAttribPointer(attribs.aTCrd, program.itemSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribs.aTCrd);

    // Set uniforms
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    gl.uniform4fv(uniforms.uScreenSize, [
      width, height, 1 / width, 1 / height,
    ]);
  }

  public render() {
    const program = this._program;
    if (!program) return;

    program.update();

    const gl = this._context;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.drawElements(program.primitiveType, program.itemCount, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  private _useProgram(prog: Program) {
    const { program } = prog;
    const gl = this._context;

    gl.useProgram(program);

    this._uniforms = {
      uScreenSize: gl.getUniformLocation(program, "uScreenSize")!,
    };
    this._attribs = {
      aVPos: gl.getAttribLocation(program, "aVPos")!,
      aTCrd: gl.getAttribLocation(program, "aTCrd")!,
    };

    this._fillBuffers(prog);
  }

  private _fillBuffers(program: Program) {
    const gl = this._context;

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, program.vertices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, program.texcoords, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, program.indices, gl.STATIC_DRAW);
  }
}
