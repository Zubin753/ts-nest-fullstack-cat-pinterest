import { useEffect, useState } from "react";
import { popupStyles } from "../UI/popupMessage/PopupMessage.tsx";

const useNotification = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupStyle, setPopupStyle] = useState<popupStyles>(popupStyles.ERROR);

  const notification = (
    text: string,
    style: popupStyles = popupStyles.ERROR,
  ) => {
    setPopupText(text);
    setPopupStyle(style);
    setOpenPopup(true);
  };

  useEffect(() => {
    if (openPopup) {
      const timer = setTimeout(() => {
        setOpenPopup(false);
      }, 2500);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании или изменении openPopup
    }
  }, [openPopup]);

  return { notification, openPopup, popupText, popupStyle };
};

export default useNotification;
