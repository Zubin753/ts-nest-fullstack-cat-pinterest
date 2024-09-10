import React, { useEffect, useState } from "react";
import { ICard } from "../models/ICard.ts";
import { useFetching } from "../hooks/useFetching.ts";
import CatsService from "../api/catsService.ts";
import debounce from "lodash.debounce";

import Loader from "../UI/loader/Loader.tsx";
import CardList from "../Components/cardList/CardList.tsx";
import MessagePage from "../Components/messagePage/MessagePage.tsx";

const AllCats: React.FC = () => {
  const [cats, setCats] = useState<ICard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [fetchCats, isLoading, error] = useFetching(async () => {
    const response = await CatsService.getCats(15, page);
    setCats((prevCats) => [...prevCats, ...response.data]);
  });

  useEffect(() => {
    console.log("fetch");
    fetchCats();
  }, [page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 500); // 1000 мс = 1 секунда

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Отменяем дебаунс при размонтировании
    };
  }, []);

  return (
    <>
      {isLoading && !cats.length && (
        <>
          <Loader text={"Загрузка"} />
        </>
      )}
      <CardList masImg={cats} />
      {!(isLoading && !cats.length) && !error.length && (
        <div className={"load--more"}>... загружаем еще котиков ...</div>
      )}
      {error && <MessagePage text={error} />}
    </>
  );
};

export default AllCats;
