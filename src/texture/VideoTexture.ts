import Texture from "./Texture";

class VideoTexture implements Texture {
  private _video: HTMLVideoElement;
  private _texture: WebGLTexture | null;

  public get webGLTexture() { return this._texture; }
  public get size() { return {
    width: this._video.videoWidth,
    height: this._video.videoHeight
  }}

  public constructor(video: HTMLVideoElement) {
    this._video = video;
    this._texture = null;
  }

  public init(gl: WebGLRenderingContext) {
    this._texture = gl.createTexture();
    this._video.play();
  }

  public upload(gl: WebGLRenderingContext) {
    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._video);
  }

  public update(src?: string) {
    if (!src) return;

    const video = this._video;

    video.src = src;
    video.play();
  }
}

export default VideoTexture;
