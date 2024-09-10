import { Ilike } from "./ILikes.ts";

export interface IUser {
  login: string;
  id: number;
  likes: Ilike[];
}
