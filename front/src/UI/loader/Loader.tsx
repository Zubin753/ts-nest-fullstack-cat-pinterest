import React from "react";
import "../../App.css";
import "./Loader.css";
interface LoaderProps {
  text: string;
}
const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className={"loader--parent"}>
      <div className={"loader"}></div>
      <h1 className={"text--loader"}>{text}</h1>
    </div>
  );
};

export default Loader;
