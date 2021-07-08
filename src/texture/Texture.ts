interface Texture {
  size: { width: number; height: number };
  init(gl: WebGLRenderingContext): void;
  upload(gl: WebGLRenderingContext): void;
}

export default Texture;
