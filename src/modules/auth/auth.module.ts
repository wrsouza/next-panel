import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "../../repositories";
import { PrismaService } from "../../config";
import { BcryptService, JwtService } from "../../utils";
import { IRouteParams } from "../../common";
import { Module } from "../module";

class AuthModule extends Module<AuthController> {
  methods() {
    return {
      GET: (...data: IRouteParams) => this.parse(...data, "getProfile"),
      POST: (...data: IRouteParams) => this.parse(...data, "signIn"),
    };
  }
}

const bcrypt = new BcryptService();
const jwt = new JwtService();
const prisma = new PrismaService();
const repository = new UserRepository(prisma);
const service = new AuthService(repository, jwt, bcrypt);
const controller = new AuthController(service);

export const authModule = new AuthModule(controller);
