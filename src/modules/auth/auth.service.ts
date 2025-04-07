import { cookies } from "next/headers";
import { UserRepository } from "../../repositories";
import { BcryptService, IPayload, JwtService } from "../../utils";
import { AuthProfileResponse } from "./responses/auth-profile.response";
import { UserMapper } from "../../mappers";
import { ResponseErrorEnum } from "../../common/enums";
import {
  BadRequestException,
  UnauthorizedException,
} from "../../common/exceptions";
import { AuthResponse } from "./responses/auth.response";
import { IAuth, IUser } from "../../common";

export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwt: JwtService,
    private readonly bcrypt: BcryptService
  ) {}

  public async getProfile(): Promise<AuthProfileResponse> {
    const accessToken = await this.getAccessToken();
    const payload = await this.getPayload(accessToken);
    const user = await this.getUserWithPayload(payload);
    return new AuthProfileResponse(user);
  }

  private async getAccessToken(): Promise<string> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    if (!accessToken) {
      throw new UnauthorizedException("no access token");
    }
    return accessToken.value;
  }

  private async getPayload(accessToken: string): Promise<IPayload> {
    const payload = this.jwt.verify(accessToken);
    if (!payload) {
      await this.clearAccessToken();
      throw new UnauthorizedException("access token invalid");
    }
    return payload as IPayload;
  }

  private async clearAccessToken() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
  }

  private async getUserWithPayload(payload: IPayload) {
    const user = await this.repository.get(UserMapper.get(payload.sub));
    if (!user) {
      throw new BadRequestException("email or password invalid");
    }
    return user;
  }

  public async signIn(body: IAuth): Promise<AuthResponse> {
    const user = await this.getUserByEmail(body.email);
    this.checkPasswordIsValid(body.password, user.password);
    await this.setAccessToken(user);
    return new AuthResponse(user);
  }

  private async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.repository.get(UserMapper.getByEmail(email));
    if (!user) {
      throw new BadRequestException(ResponseErrorEnum.AUTH_INVALID);
    }
    return user;
  }

  private checkPasswordIsValid(password: string, hashPassword: string) {
    const isValid = this.bcrypt.compare(password, hashPassword);
    if (!isValid) {
      throw new BadRequestException(ResponseErrorEnum.AUTH_INVALID);
    }
  }

  private async setAccessToken(user: IUser) {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
      roles: [
        "users:list",
        "users:create",
        "users:read",
        "users:update",
        "users:delete",
      ],
    };
    const accessToken = this.jwt.sign(payload);
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken);
  }
}
