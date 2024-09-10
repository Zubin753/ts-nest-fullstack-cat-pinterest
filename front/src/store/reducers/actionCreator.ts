import { IUser } from "../../models/IUser.ts";
import {
  authActionsEnum,
  postLikeAction,
  setAuthAction,
  setErrorAction,
  setLikeAction,
  setLoadingAction,
  setUserAction,
} from "./types.ts";
import { AppDispatch } from "../index.ts";
import UserService from "../../api/userService.ts";
import CatsService from "../../api/catsService.ts";
import { Ilike } from "../../models/ILikes.ts";
import axios, { AxiosResponse } from "axios";

export const AuthActionCreators = {
  setUser: (user: IUser): setUserAction => {
    return { type: authActionsEnum.SET_USER, payload: user };
  },
  setError: (error: string): setErrorAction => {
    return { type: authActionsEnum.SET_ERROR, payload: error };
  },
  setIsAuth: (auth: boolean): setAuthAction => ({
    type: authActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (loading: boolean): setLoadingAction => ({
    type: authActionsEnum.SET_IS_LOADING,
    payload: loading,
  }),
  addLike: (like: Ilike): postLikeAction => ({
    type: authActionsEnum.POST_LIKE,
    payload: like,
  }),
  setLikes: (likes: Ilike[]): setLikeAction => ({
    type: authActionsEnum.SET_LIKE,
    payload: likes,
  }),
  getLikes: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await CatsService.getLikesUser();
      dispatch(AuthActionCreators.setLikes(response.data));
      if (response.data.length) {
        dispatch(AuthActionCreators.setError(""));
      } else {
        dispatch(AuthActionCreators.setError("Пока нет лайков"));
      }
      dispatch(AuthActionCreators.setIsLoading(false));
      return response;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        dispatch(
          AuthActionCreators.setError(
            e.response?.data.message || "Произошла ошибка при получении лайков",
          ),
        );
      } else {
        dispatch(AuthActionCreators.setError("ошибка при получении лайков"));
        throw new Error("Произошла ошибка при получении лайков");
      }
    }
  },
  auth:
    (login: string, password: string) =>
    async (dispatch: AppDispatch): Promise<AxiosResponse<any, any>> => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        const response = await UserService.avtorization(login, password);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          dispatch(AuthActionCreators.setUser(response.data.user));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(
            AuthActionCreators.setError("Некорректный логин или пароль"),
          );
        }
        dispatch(AuthActionCreators.setIsLoading(false));
        return response;
      } catch (e: unknown) {
        if (e instanceof Error) {
          dispatch(
            AuthActionCreators.setError(
              e.message || "Произошла ошибка при авторизации по токену",
            ),
          );
          throw new Error(
            e.message || "Произошла ошибка при авторизации по токену",
          );
        } else {
          dispatch(AuthActionCreators.setError("Произошла неизвестная ошибка"));
          throw new Error("Произошла неизвестная ошибка");
        }
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
  authByToken: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await UserService.auth();
      if (response?.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(AuthActionCreators.setUser(response.data.user));
        dispatch(AuthActionCreators.setIsAuth(true));
      } else {
        dispatch(AuthActionCreators.setError("Не удалось войти"));
      }
      dispatch(AuthActionCreators.setIsLoading(false));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(
          AuthActionCreators.setError(
            e.message || "Произошла ошибка при авторизации по токену",
          ),
        );
        throw new Error(
          e.message || "Произошла ошибка при авторизации по токену",
        );
      } else {
        dispatch(AuthActionCreators.setError("Произошла неизвестная ошибка"));
        throw new Error("Произошла неизвестная ошибка");
      }
    }
  },
  postLike: (cat_id: string) => async (dispatch: AppDispatch) => {
    const response = await CatsService.newLike(cat_id);
    if (response.status === 201) {
      dispatch(
        AuthActionCreators.addLike({
          cat_id: response.data.cat_id,
          user_id: response.data.user_id,
          id: response.data.id,
        } as Ilike),
      );
    } else {
      dispatch(AuthActionCreators.setError(response.data.message));
    }
    dispatch(AuthActionCreators.setIsLoading(false));
  },
};
