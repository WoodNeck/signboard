export default interface Program {
  readonly program: WebGLProgram;
  readonly vertices: ArrayBuffer | ArrayBufferView;
  readonly indices: Uint16Array;
  readonly texcoords: ArrayBuffer | ArrayBufferView;
  readonly itemSize: number;
  readonly itemCount: number;
  readonly primitiveType: number;
  setTexture(index: number, image: ImageData): void;
  update(): void;
}
