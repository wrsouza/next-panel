import { Controller } from "../controller";
import { UsersService } from "./users.service";
import {
  type IRouteRequest,
  IUserCreate,
  IUserUpdate,
  userCreateSchema,
  userUpdateSchema,
} from "../../common";
import { UserResponse, UserPaginateResponse } from "./responses";
import { validate } from "../../common/decorators";

export class UsersController extends Controller<UsersService> {
  public async list(req: IRouteRequest): Promise<Response> {
    try {
      const query = req.query;
      const result = await this.service.list(query);
      return this.success<UserPaginateResponse>(result);
    } catch (err: unknown) {
      return this.error(err);
    }
  }

  @validate(userCreateSchema)
  public async create(req: IRouteRequest): Promise<Response> {
    try {
      const body = req.body as IUserCreate;
      const result = await this.service.create(body);
      return this.success<UserResponse>(result, 201);
    } catch (err: unknown) {
      return this.error(err);
    }
  }

  public async show(req: IRouteRequest): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await this.service.getById(id);
      return this.success<UserResponse>(result);
    } catch (err: unknown) {
      return this.error(err);
    }
  }

  @validate(userUpdateSchema)
  public async update(req: IRouteRequest): Promise<Response> {
    try {
      const { id } = req.params;
      const body = req.body as IUserUpdate;
      const result = await this.service.update(id, body);
      return this.success<UserResponse>(result);
    } catch (err: unknown) {
      return this.error(err);
    }
  }

  public async destroy(req: IRouteRequest): Promise<Response> {
    try {
      const { id } = req.params;
      await this.service.destroy(id);
      return this.success();
    } catch (err: unknown) {
      return this.error(err);
    }
  }
}
