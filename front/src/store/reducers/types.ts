import { IUser } from "../../models/IUser.ts";
import { Ilike } from "../../models/ILikes.ts";

export interface authState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;
}

export enum authActionsEnum {
  SET_AUTH = "SET_AUTH",
  SET_ERROR = "SET_ERROR",
  SET_USER = "SET_USER",
  SET_IS_LOADING = "SET_IS_LOADING",
  POST_LIKE = "POST_LIKE",
  SET_LIKE = "SET_LIKE",
}

export interface setAuthAction {
  type: authActionsEnum.SET_AUTH;
  payload: boolean;
}

export interface setErrorAction {
  type: authActionsEnum.SET_ERROR;
  payload: string;
}

export interface setUserAction {
  type: authActionsEnum.SET_USER;
  payload: IUser;
}

export interface setLoadingAction {
  type: authActionsEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface postLikeAction {
  type: authActionsEnum.POST_LIKE;
  payload: Ilike;
}

export interface setLikeAction {
  type: authActionsEnum.SET_LIKE;
  payload: Ilike[];
}
export type authAction =
  | setErrorAction
  | setUserAction
  | setAuthAction
  | setLoadingAction
  | postLikeAction
  | setLikeAction;
