export default interface Program {
  readonly program: WebGLProgram;
  setTexture(index: number, image: ImageData): void;
}
