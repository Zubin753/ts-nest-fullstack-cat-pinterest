import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/useSelector.ts";
import { authState } from "../../store/reducers/types.ts";
import { useAction } from "../../hooks/useMyDispatch.ts";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../router/router.ts";
import { popupStyles } from "../../UI/popupMessage/PopupMessage.tsx";
import "./Navbar.css";

interface NavbarProps {
  setReg: (e: boolean) => void;
  setAvt: (e: boolean) => void;
  giveMes?: (text: string, style?: popupStyles) => void;
}
const Navbar: React.FC<NavbarProps> = ({ setReg, setAvt, giveMes }) => {
  const isAuth = useTypedSelector((state: authState) => state.isAuth);
  const user = useTypedSelector((state: authState) => state.user);
  const router = useNavigate();
  const { logout } = useAction();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleMenuClick = (index: number) => {
    setActiveIndex(index);
  };

  const { getLikes } = useAction();

  return (
    <div className={"navbar--horizont"}>
      <div className={"left--block--menu"}>
        <div
          className={[
            "navbar--menu",
            activeIndex === 0 && "navbar--menu--active",
          ].join(" ")}
          onClick={() => {
            handleMenuClick(0);
            router("");
          }}
        >
          Все котики
        </div>
        <div
          className={[
            "navbar--menu",
            activeIndex === 1 && "navbar--menu--active",
          ].join(" ")}
          onClick={async () => {
            {
              if (isAuth) {
                await getLikes();
                handleMenuClick(1);
                router(RouteNames.LikeCats);
              } else {
                if (giveMes) {
                  giveMes("Сначала необходимо авторизоваться");
                }
              }
            }
          }}
        >
          Любимые котики
        </div>
      </div>

      <div className={"right--block--menu"}>
        <div
          className={["navbar--menu"].join(" ")}
          onClick={() => {
            {
              !isAuth && setAvt(true);
            }
          }}
        >
          {(!isAuth && "Войти") || user.login}
        </div>

        <div
          className={["navbar--menu"].join(" ")}
          onClick={() => {
            {
              (!isAuth && setReg(true)) || logout();
            }
          }}
        >
          {(!isAuth && "Зарегистрироваться") || "Выйти"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
