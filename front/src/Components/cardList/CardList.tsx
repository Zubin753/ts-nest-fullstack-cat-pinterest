import React, { useState } from "react";
import Card from "../card/Card.tsx";
import { ICard } from "../../models/ICard.ts";
import "./CardList.css";
interface CardListProps {
  masImg: ICard[];
}
const CardList: React.FC<CardListProps> = ({ masImg }) => {
  const [hoveredIndex, setHoveredIndex] = useState("");

  return (
    <div className={"cards--parent"}>
      {masImg.map((i) => (
        <Card
          setIndex={() => {
            setHoveredIndex(i.id);
          }}
          clearIndex={() => setHoveredIndex("")}
          hoverId={hoveredIndex}
          key={i.id}
          id={i.id}
          url={i.url}
        />
      ))}
    </div>
  );
};

export default CardList;
