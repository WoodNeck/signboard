import Renderer2D from "../renderer/Renderer2D";

export interface EntityRenderingContext {
  context2D: CanvasRenderingContext2D;
  preserve: Renderer2D["_preserve"];
}

export type Uniforms<T extends string> = {
  [K in T]?: WebGLUniformLocation
};
