import { IUserPaginate } from "../../../common";
import { UserResponse } from "./user.response";

export class UserPaginateResponse {
  readonly search: string;
  readonly page: number;
  readonly tpages: number;
  readonly rows: number;
  readonly sort: string;
  readonly total: number;
  readonly data: UserResponse[];

  constructor({ params, data, total }: IUserPaginate) {
    this.search = params.get("search") || "";
    this.page = parseInt(params.get("page") || "1");
    this.rows = parseInt(params.get("rows") || "10");
    this.total = total;
    this.tpages =
      this.total % this.rows === 0
        ? this.total / this.rows
        : Math.floor(this.total / this.rows) + 1;
    this.sort = params.get("sort") || "";
    this.data = data.map((user) => new UserResponse(user));
  }
}
