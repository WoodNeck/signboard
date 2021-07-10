interface Texture {
  size: { width: number; height: number };
  webGLTexture: WebGLTexture | null;
  init(gl: WebGLRenderingContext): void;
  upload(gl: WebGLRenderingContext): void;
  update(src?: string): void;
}

export default Texture;
