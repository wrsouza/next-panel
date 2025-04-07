import { Exception } from "./exception";

export class UnauthorizedException extends Exception {
  constructor(message: string) {
    super(message, 403, "Unauthorized");
  }
}
