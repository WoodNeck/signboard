class SignBoardError extends Error {
  constructor(
    public message: string,
    public code: number) {
    super(`(signboard.js) ${message}`);
    Object.setPrototypeOf(this, SignBoardError.prototype);
    this.name = "SignBoardError";
  }
}

export default SignBoardError;
