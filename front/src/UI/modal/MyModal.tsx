import React, { ReactNode } from "react";
import cl from "./MyModal.module.css";

interface MyModalProps {
  active: boolean;
  setActive: (e: boolean) => void;
  children: ReactNode;
}
const MyModal: React.FC<MyModalProps> = ({ active, setActive, children }) => {
  const rootClasses = [cl.otherArea];
  if (active) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setActive(false)}>
      <div className={cl.mainArea} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default MyModal;
