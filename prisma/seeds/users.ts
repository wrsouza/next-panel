import { faker } from "@faker-js/faker";
import { BcryptService } from "../../src/utils/bcrypt/bcrypt.service";
import { Prisma } from "@prisma/client";

export function userSeeds(): Prisma.UserCreateInput[] {
  const bcrypt = new BcryptService();
  const rows: Prisma.UserCreateInput[] = [];
  let count = 50;
  while (count >= 0) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    rows.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName,
        lastName,
        provider: "gmail.com",
      }),
      password: bcrypt.encrypt("password"),
      isAdmin: faker.datatype.boolean(),
      isActive: faker.datatype.boolean(),
    });
    count--;
  }
  return rows;
}
