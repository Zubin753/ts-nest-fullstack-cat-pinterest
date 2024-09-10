import React, { useEffect, useState } from "react";
import Loader from "../UI/loader/Loader.tsx";
import CardList from "../Components/cardList/CardList.tsx";
import { ICard } from "../models/ICard.ts";
import { useFetching } from "../hooks/useFetching.ts";
import CatsService from "../api/catsService.ts";
import { useTypedSelector } from "../hooks/useSelector.ts";
import { authState } from "../store/reducers/types.ts";
import MessagePage from "../Components/messagePage/MessagePage.tsx";
import debounce from "lodash.debounce";

const LikeCats: React.FC = () => {
  const likes = useTypedSelector((state: authState) => state.user.likes);
  const itemsPerPage = 15;
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState<ICard[]>([]);

  const transformToICard = (obj: any): ICard => {
    return {
      id: obj.id,
      url: obj.url,
    };
  };

  const [fetchCats, isLoading, error] = useFetching(async () => {
    if (likes) {
      const responses = await Promise.all(
        likes
          .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
          .map((like) => CatsService.getLikeCat(like.cat_id)),
      );
      const fetchedCats = responses.map((response) =>
        transformToICard(response.data),
      );
      setCats((prevCats) => [...prevCats, ...fetchedCats]);
    } else {
      setCats([] as ICard[]);
    }
  });

  useEffect(() => {
    fetchCats().then();
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
        <div className={"load--more"}>
          {(page + 1) * itemsPerPage >= likes.length
            ? "... ваши любимые котики кончились ..."
            : "... загружаем еще котиков ..."}
        </div>
      )}
      {error && <MessagePage text={error} />}
    </>
  );
};

export default LikeCats;
