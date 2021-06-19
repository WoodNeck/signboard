class ImageTexture {
  private _image: HTMLImageElement;
  private _texture: WebGLTexture | null;

  public constructor(image: HTMLImageElement) {
    this._image = image;
    this._texture = null;
  }

  public init(gl: WebGLRenderingContext) {
    this._texture = gl.createTexture();
  }

  public upload(gl: WebGLRenderingContext) {
    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
  }
}

export default ImageTexture;
