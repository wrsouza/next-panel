import { IUser } from "../common";
import {
  IUserCreateType,
  IUserGetType,
  IUserListType,
  IUserUpdateType,
} from "../mappers";
import { Repository } from "./repository";

export class UserRepository extends Repository {
  async list(data: IUserListType): Promise<[IUser[], number]> {
    return await this.prisma.$transaction([
      this.prisma.user.findMany(data),
      this.prisma.user.count({ where: data.where }),
    ]);
  }

  async create(data: IUserCreateType): Promise<IUser> {
    return this.prisma.user.create(data);
  }

  async get(data: IUserGetType): Promise<IUser | null> {
    return this.prisma.user.findUnique(data);
  }

  async update(data: IUserUpdateType): Promise<IUser> {
    return this.prisma.user.update(data);
  }

  async delete(data: IUserGetType): Promise<IUser> {
    return this.prisma.user.delete(data);
  }
}
