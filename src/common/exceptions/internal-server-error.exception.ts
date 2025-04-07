import { Exception } from "./exception";

export class InternalServerErrorException extends Exception {
  constructor(message: string) {
    super(message, 500, "Internal Server Error");
  }
}
