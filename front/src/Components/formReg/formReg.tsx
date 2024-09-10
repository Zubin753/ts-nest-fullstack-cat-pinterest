import React, { useState } from "react";
import { popupStyles } from "../../UI/popupMessage/PopupMessage.tsx";
import "./formReg.css";

interface FormRegProps {
  textHeader: string;
  textButton: string;
  succesText: string;
  callback?: (login: string, password: string) => any;
  openModal?: (bool: boolean) => void;
  giveMes?: (text: string, style?: popupStyles) => void;
}
const FormReg: React.FC<FormRegProps> = ({
  textHeader,
  succesText,
  callback,
  textButton,
  openModal,
  giveMes,
}) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  function sendMes(text: string, style?: popupStyles) {
    if (giveMes) {
      giveMes(text, style);
    }
  }

  const act = async (login: string, password: string) => {
    if (callback) {
      try {
        await callback(login, password);
        sendMes(succesText, popupStyles.SUCCES);
        if (openModal) {
          openModal(false);
          setLogin("");
          setPassword("");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          sendMes(error.message || "Произошла ошибка");
        } else {
          sendMes("Произошла непредвиденная ошибка");
          throw new Error("Ошибка");
        }
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement> | undefined,
  ) => {
    if (event?.key === "Enter") {
      act(login, password);
    }
  };

  return (
    <div className={"reg--form"}>
      <div className={"header"}>{textHeader}</div>
      <div className={"inp--area"}>
        <input
          placeholder={"Введите логин"}
          value={login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLogin(e.target.value)
          }
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(event)
          }
        />
        <input
          className={"password"}
          placeholder={"Введите пароль"}
          value={password}
          type={"password"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(event)
          }
        />
      </div>
      <div className={"button--form"}>
        <button onClick={() => act(login, password)}>{textButton}</button>
      </div>
    </div>
  );
};

export default FormReg;
