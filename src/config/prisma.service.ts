import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
    console.log("Prisma connected");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log("Prisma disconnected");
  }
}
