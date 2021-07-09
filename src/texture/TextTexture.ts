import SignBoard, { SignBoardOptions } from "../SignBoard";
import { parsePadding } from "../utils";
import Texture from "./Texture";

class TextTexture implements Texture {
  private _signboard: SignBoard;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _texture: WebGLTexture | null;

  public get size() { return {
    width: this._canvas.width,
    height: this._canvas.height
  }}

  public constructor(signboard: SignBoard) {
    this._signboard = signboard;
    this._canvas = document.createElement("canvas");
    this._context = this._canvas.getContext("2d")!;
    this._texture = null;
  }

  public init(gl: WebGLRenderingContext) {
    const signboard = this._signboard;
    const text = signboard.src;
    const canvas = this._canvas;
    const context = this._context;
    const options = {
      font: "32pt serif",
      textAlign: "left",
      fillStyle: "red",
      textBaseline: "top",
      ...signboard.textOptions
    } as Required<SignBoardOptions["textOptions"]>;

    this._texture = gl.createTexture();

    for (const key in options) {
      (context as any)[key] = (options as any)[key];
    }

    const textPadding = parsePadding(signboard.textPadding);
    const textSize = context.measureText(text);

    canvas.width = textSize.actualBoundingBoxRight - textSize.actualBoundingBoxLeft
      + textPadding[1] + textPadding[3];
    canvas.height = (textSize.actualBoundingBoxDescent - textSize.actualBoundingBoxAscent)
      + textPadding[0] + textPadding[2];

    for (const key in options) {
      (context as any)[key] = (options as any)[key];
    }

    context.fillText(text, textPadding[3], textPadding[0]);
  }

  public upload(gl: WebGLRenderingContext) {
    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas);
  }
}

export default TextTexture;
