import { IPayload } from "./jwt.interface";
import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = "JWT_SECRET";
const JWT_EXPIRES = "1800s";

export class JwtService {
  sign(payload: IPayload) {
    return sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });
  }

  verify(accessToken: string) {
    return verify(accessToken, JWT_SECRET);
  }
}
