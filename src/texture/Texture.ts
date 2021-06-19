interface Texture {
  init(gl: WebGLRenderingContext): void;
  upload(gl: WebGLRenderingContext): void;
}

export default Texture;
