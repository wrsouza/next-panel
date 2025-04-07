import { IUser } from "../../../common";

export class AuthResponse {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly isActive: boolean;
  readonly roles: string[];

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.isAdmin = data.isAdmin;
    this.isActive = data.isActive;
    this.roles = [];
  }
}
