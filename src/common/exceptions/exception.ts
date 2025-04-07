export class Exception extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(message: string, statusCode: number, statusText: string) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}
