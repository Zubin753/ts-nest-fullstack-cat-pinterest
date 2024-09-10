import React from "react";

interface MessagePageProps {
  text: string;
}
const MessagePage: React.FC<MessagePageProps> = ({ text }) => {
  return (
    <div>
      <div className={"info--parent"}>
        <div className={"info--message"}>{text}</div>
      </div>
    </div>
  );
};

export default MessagePage;
