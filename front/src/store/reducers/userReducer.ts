import { authAction, authActionsEnum, authState } from "./types.ts";
import { IUser } from "../../models/IUser.ts";

const initialState: authState = {
  isLoading: false,
  isAuth: false,
  user: {} as IUser,
  error: "",
};

export const userReducer = (
  state: authState = initialState,
  action: authAction,
) => {
  switch (action.type) {
    case authActionsEnum.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
        isLoading: false,
      } as authState;

    case authActionsEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false } as authState;

    case authActionsEnum.SET_USER: {
      return { ...state, user: action.payload, isLoading: false } as authState;
    }

    case authActionsEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload } as authState;

    case authActionsEnum.SET_LIKE: {
      const newLikes = action.payload;
      const userWithLikes = { ...state.user, likes: newLikes };
      return { ...state, user: userWithLikes };
    }

    case authActionsEnum.POST_LIKE: {
      const newLike = action.payload;
      const updatedLikes = [...state.user.likes, newLike];
      const userWithLike = { ...state.user, likes: updatedLikes };
      return { ...state, user: userWithLike };
    }

    default:
      return state as authState;
  }
};
