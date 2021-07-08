/**
 * Error codes of {@link SignBoardError}
 * @name ERROR_CODES
 * @memberof Constants
 * @type object
 * @property {number} WRONG_TYPE 0
 * @property {number} WRONG_OPTION 1
 * @property {number} ELEMENT_NOT_FOUND 2
 * @property {number} CANVAS_NOT_FOUND 3
 * @property {number} WEBGL_NOT_SUPPORTED 4
 * @property {number} FAILED_COMPILE_SHADER 5
 * @property {number} FAILED_COMPILE_PROGRAM 6
 * @property {number} FAILED_TO_LOAD_IMAGE 7
 * @property {number} TEXTURE_NOT_INITIALIZED 8
 */
export const CODE: {
  [key in keyof typeof MESSAGE]: number;
} = {
  WRONG_TYPE: 0,
  WRONG_OPTION: 1,
  ELEMENT_NOT_FOUND: 2,
  ELEMENT_NOT_CANVAS: 3,
  WEBGL_NOT_SUPPORTED: 4,
  FAILED_COMPILE_SHADER: 5,
  FAILED_COMPILE_PROGRAM: 6,
  FAILED_TO_LOAD_IMAGE: 7,
  TEXTURE_NOT_INITIALIZED: 8
};

export const MESSAGE = {
  WRONG_TYPE: (val: any, types: string[]) => `${val}(${typeof val}) is not a ${types.map(type => `"${type}"`).join(" or ")}.`,
  WRONG_OPTION: (val: any, optionName: string, possible: any[]) => `Given value(${val}, ${typeof val}) can't be used for option "${optionName}". Possible values are: ${possible.join(", ")}`,
  ELEMENT_NOT_FOUND: (query: string) => `Element with selector "${query}" not found.`,
  ELEMENT_NOT_CANVAS: (el: HTMLElement) => `Given element <${el.tagName}> is not a canvas.`,
  WEBGL_NOT_SUPPORTED: (msg: string) => `WebGL context creation failed with the following error - "${msg}"`,
  FAILED_COMPILE_SHADER: (msg: string | null) => `Failed compiling shader - "${msg}"`,
  FAILED_COMPILE_PROGRAM: (msg: string | null) => `Failed compiling WebGL program - "${msg}"`,
  FAILED_TO_LOAD_IMAGE: (src: string) => `Failed to load image with src - "${src}"`,
  TEXTURE_NOT_INITIALIZED: "Texture is not initialized yet"
};
