/**
 * Special type of known error that {@link SignBoard} throws.
 * @property {number} code Error code
 * @property {string} message Error message
 * @see {@link ERROR_CODE ERROR_CODE}
 */
class SignBoardError extends Error {
  public readonly code: number;

  /**
   * @param message Error message
   * @param code Error code
   */
  constructor(message: string, code: number) {
    super(`(signboard.js) ${message}`);
    Object.setPrototypeOf(this, SignBoardError.prototype);
    this.name = "SignBoardError";
    this.code = code;
  }
}

export default SignBoardError;
