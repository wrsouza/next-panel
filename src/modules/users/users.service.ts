import {
  IUserCreate,
  IUserUpdate,
  BadRequestException,
  NotFoundException,
} from "../../common";
import { UserMapper } from "../../mappers";
import { UserRepository } from "../../repositories";
import { BcryptService } from "../../utils";
import { UserResponse, UserPaginateResponse } from "./responses";

export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly bcrypt: BcryptService
  ) {}

  public async list(params: URLSearchParams): Promise<UserPaginateResponse> {
    const [data, total] = await this.repository.list(UserMapper.list(params));
    return new UserPaginateResponse({ data, total, params });
  }

  public async create(data: IUserCreate): Promise<UserResponse> {
    await this.validateEmailExists(data.email);
    data.password = this.bcrypt.encrypt(data.password);
    const user = await this.repository.create(UserMapper.create(data));
    return new UserResponse(user);
  }

  private async validateEmailExists(
    email: string,
    id: string = ""
  ): Promise<void> {
    const user = await this.repository.get(UserMapper.validateEmail(email, id));
    if (user) {
      throw new BadRequestException("E-mail already exists");
    }
  }

  public async getById(id: string): Promise<UserResponse> {
    const user = await this.repository.get(UserMapper.get(id));
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return new UserResponse(user);
  }

  public async update(id: string, data: IUserUpdate): Promise<UserResponse> {
    if (data.email) {
      await this.validateEmailExists(data.email, id);
    }
    if (data?.password) {
      data.password = this.bcrypt.encrypt(data.password);
    }
    const user = await this.repository.update(UserMapper.update(id, data));
    return new UserResponse(user);
  }

  public async destroy(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.delete(UserMapper.get(id));
  }
}
