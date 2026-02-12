export default class LeadError extends Error {
  public code: string | undefined;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;

    Object.setPrototypeOf(this, LeadError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LeadError);
    }
  }
}
