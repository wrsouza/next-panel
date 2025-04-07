import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserRepository } from "../../repositories";
import { IRouteParams } from "../../common";
import { BcryptService } from "../../utils";
import { Module } from "../module";
import { PrismaService } from "../../config";

class UsersModule extends Module<UsersController> {
  methods(hasId: boolean = false) {
    if (hasId) {
      return {
        GET: (...data: IRouteParams) => this.parse(...data, "show"),
        PUT: (...data: IRouteParams) => this.parse(...data, "update"),
        DELETE: (...data: IRouteParams) => this.parse(...data, "destroy"),
      };
    }

    return {
      GET: (...data: IRouteParams) => this.parse(...data, "list"),
      POST: (...data: IRouteParams) => this.parse(...data, "create"),
    };
  }
}

const prisma = new PrismaService();
const bcrypt = new BcryptService();
const repository = new UserRepository(prisma);
const service = new UsersService(repository, bcrypt);
const controller = new UsersController(service);

export const usersModule = new UsersModule(controller);
