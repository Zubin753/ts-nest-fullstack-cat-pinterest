import React, { useEffect, useState } from "react";
import LikeButton from "../likeButton/likeButton.tsx";
import { useTypedSelector } from "../../hooks/useSelector.ts";
import { authState } from "../../store/reducers/types.ts";
import { useAction } from "../../hooks/useMyDispatch.ts";
import { Ilike } from "../../models/ILikes.ts";
import useNotification from "../../hooks/useNotification.ts";
import PopupMessage, {
  popupStyles,
} from "../../UI/popupMessage/PopupMessage.tsx";
import CatsService from "../../api/catsService.ts";
import "./Card.css";

interface CardProps {
  id: string;
  url: string;
  setIndex: () => void;
  clearIndex: () => void;
  hoverId: string;
}
const Card: React.FC<CardProps> = ({
  id,
  url,
  setIndex,
  clearIndex,

  hoverId,
}) => {
  const user = useTypedSelector((state: authState) => state.user);
  const isAuth = useTypedSelector((state: authState) => state.isAuth);
  const { postLike } = useAction();
  const [click, setClick] = useState<boolean>(false);
  const [likes, setLikes] = useState<Ilike[]>(user.likes || ([] as Ilike[]));

  useEffect(() => {
    setLikes(user.likes || []);
  }, [user.likes]);

  const { notification, openPopup, popupText, popupStyle } = useNotification();

  return (
    <div
      className={"block--card"}
      onMouseEnter={() => setIndex()}
      onMouseLeave={() => clearIndex()}
      onClick={() => {
        if (isAuth) {
          const isLiked = likes ? likes.some((l) => l.cat_id === id) : false;
          const updatedLikes = isLiked
            ? likes.filter((l) => l.cat_id !== id)
            : [...likes, { cat_id: id, user_id: user.id } as Ilike];

          // Обновляем локальное состояние
          setLikes(updatedLikes);

          // Отправляем запрос на сервер
          if (isLiked) {
            CatsService.deleteLike(id);
            setClick(false);
          } else {
            setClick(true);
            setTimeout(() => {
              setClick(false);
            }, 1000);
            postLike(id);
          }
        } else {
          notification("Необходимо авторизоваться", popupStyles.MESSAGE);
        }
      }}
    >
      <img
        src={url}
        alt={"Котик"}
        className={hoverId === id ? "card--active" : ""}
      />
      {openPopup && <PopupMessage text={popupText} typeStyle={popupStyle} />}
      <LikeButton
        visible={hoverId === id}
        like={likes.some((l: Ilike) => l.cat_id === id)}
        click={click}
      ></LikeButton>
    </div>
  );
};

export default Card;
