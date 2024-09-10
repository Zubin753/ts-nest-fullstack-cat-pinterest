import React from "react";
import "./likeButton.css";

interface LikeButtonProps {
  visible: boolean;
  click: boolean;
  like: boolean;
}
const LikeButton: React.FC<LikeButtonProps> = ({ visible, like, click }) => {
  return (
    <button
      className={[
        "button--like",
        visible && "button--like--active",
        like && "button--like--have",
        click && "button--like--click",
      ].join(" ")}
    ></button>
  );
};

export default LikeButton;
