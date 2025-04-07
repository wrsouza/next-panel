import { PrismaClient } from "@prisma/client";
import { userSeeds } from "./seeds/users";
const prisma = new PrismaClient();

async function main() {
  const users = userSeeds();
  await prisma.user.createMany({
    data: users,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
