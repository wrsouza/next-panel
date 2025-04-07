import { PrismaService } from "../config";

export abstract class Repository {
  constructor(protected readonly prisma: PrismaService) {}
}
