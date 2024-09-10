import Navbar from "./Components/navbar/Navbar.tsx";
import "./App.css";
import { useEffect, useState } from "react";

import FormReg from "./Components/formReg/formReg.tsx";
import MyModal from "./UI/modal/MyModal.tsx";
import UserService from "./api/userService.ts";
import { BrowserRouter } from "react-router-dom";
import MyRouter from "./Components/MyRouter/MyRouter.tsx";
import { useAction } from "./hooks/useMyDispatch.ts";
import PopupMessage from "./UI/popupMessage/PopupMessage.tsx";
import useNotification from "./hooks/useNotification.ts";

function App() {
  const [regModal, setRegModal] = useState(false);
  const [avtModal, setAvtModal] = useState(false);

  const { auth, authByToken } = useAction();

  useEffect(() => {
    authByToken();
  }, []);

  const { notification, openPopup, popupText, popupStyle } = useNotification();

  return (
    <div className={"main"}>
      <BrowserRouter>
        {openPopup && <PopupMessage text={popupText} typeStyle={popupStyle} />}
        <Navbar
          setReg={setRegModal}
          setAvt={setAvtModal}
          giveMes={notification}
        />
        <MyRouter />
        <MyModal active={regModal} setActive={setRegModal}>
          <FormReg
            textHeader={
              "Зарегистрируйтесь в серивсе, чтобы вы смогли лайкать котиков!"
            }
            callback={UserService.register}
            textButton={"Зарегистрироваться"}
            openModal={setRegModal}
            giveMes={notification}
            succesText={"Успешная регистрация!"}
          />
        </MyModal>
        <MyModal active={avtModal} setActive={setAvtModal}>
          <FormReg
            textHeader={"Авторизуйтесь, пожалуйста!"}
            callback={auth}
            textButton={"Войти"}
            openModal={setAvtModal}
            giveMes={notification}
            succesText={`Добро пожаловать!`}
          />
        </MyModal>
      </BrowserRouter>
    </div>
  );
}

export default App;
