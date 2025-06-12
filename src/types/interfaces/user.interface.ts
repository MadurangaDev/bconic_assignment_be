import { ILRegisterRequestDTO } from "@requests";
import { UserRole } from "../enums";

export interface IUser extends Omit<ILRegisterRequestDTO, "password"> {
  passwordHash: string;
  role: UserRole;
}
export interface IUserFromDB extends IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
