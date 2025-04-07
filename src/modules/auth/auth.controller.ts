import { authSchema, IAuth, type IRouteRequest, validate } from "../../common";
import { Controller } from "../controller";
import { AuthService } from "./auth.service";

export class AuthController extends Controller<AuthService> {
  public async getProfile(): Promise<Response> {
    try {
      const result = await this.service.getProfile();
      return this.success(result);
    } catch (err: unknown) {
      return this.error(err);
    }
  }

  @validate(authSchema)
  public async signIn(request: IRouteRequest): Promise<Response> {
    try {
      const body = request.body as IAuth;
      const result = await this.service.signIn(body);
      return this.success(result);
    } catch (err: unknown) {
      return this.error(err);
    }
  }
}
