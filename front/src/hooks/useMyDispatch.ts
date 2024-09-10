import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActionCreators } from "../store/reducers/actionCreator";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(AuthActionCreators, dispatch);
};
