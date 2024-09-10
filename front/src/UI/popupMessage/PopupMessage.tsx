import React from "react";
import "./Popup.css";
export enum popupStyles {
  ERROR = "error",
  MESSAGE = "message",
  SUCCES = "succes",
}
interface PopupMessageProps {
  text: string;
  typeStyle: popupStyles;
}
const PopupMessage: React.FC<PopupMessageProps> = ({ text, typeStyle }) => {
  return <div className={`popup popup--${typeStyle}`}>{text}</div>;
};

export default PopupMessage;
