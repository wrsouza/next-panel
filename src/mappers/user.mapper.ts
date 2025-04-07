import { Prisma } from "@prisma/client";
import { IUserCreate, IUserUpdate } from "../common";

export interface IUserListType {
  skip: number;
  take: number;
  where: Prisma.UserWhereInput;
  orderBy: Prisma.UserOrderByWithRelationInput;
}

export interface IUserSelect {
  [key: string]: boolean;
}

export interface IUserWhere {
  [key: string]: {
    contains: string;
    mode: "insensitive";
  };
}

export interface IUserOrderBy {
  [key: string]: "asc" | "desc";
}

export interface IUserGetType {
  where: Prisma.UserWhereUniqueInput;
}

export interface IUserCreateType {
  data: Prisma.UserCreateInput;
}

export interface IUserUpdateType {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}

export class UserMapper {
  static validateEmail(email: string, id: string): IUserGetType {
    const where: Prisma.UserWhereUniqueInput = { email };
    if (id) {
      where["NOT"] = { id };
    }
    return { where };
  }

  static getByEmail(email: string): IUserGetType {
    return {
      where: { email, isActive: true },
    };
  }

  static get(id: string): IUserGetType {
    return {
      where: { id },
    };
  }

  static create(data: IUserCreate): IUserCreateType {
    return {
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        isActive: data.isActive,
        isAdmin: data.isAdmin,
      },
    };
  }

  static update(id: string, data: IUserUpdate): IUserUpdateType {
    return {
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        isActive: data.isActive,
        isAdmin: data.isAdmin,
      },
    };
  }

  static list(params: URLSearchParams): IUserListType {
    const where: IUserWhere = {};
    const orderBy: IUserOrderBy = {};
    const page = params.get("page") || "1";
    const rows = params.get("rows") || "10";
    const skip = (parseInt(page) - 1) * parseInt(rows);
    const take = parseInt(rows);

    const search = params.get("search");
    if (search) {
      search.split(",").forEach((filters) => {
        const [key, value] = filters.split(":");
        if (key && value) {
          where[key] = { contains: value, mode: "insensitive" };
        }
      });
    }

    const sort = params.get("sort");
    if (sort) {
      sort.split(",").forEach((filters) => {
        const [key, value] = filters.split(":");
        if (key && value) {
          orderBy[key] = value as "asc" | "desc";
        }
      });
    }

    return {
      where,
      orderBy,
      skip,
      take,
    };
  }
}
