export default interface Renderer {
  readonly canvas: HTMLCanvasElement;
  clear(): void;
}
