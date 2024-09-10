import axios, { AxiosResponse } from "axios";
import { ICard } from "../models/ICard.ts";
export default class CatsService {
  static async getCats(limit = 10, pages = 1): Promise<AxiosResponse<ICard[]>> {
    try {
      return await axios.get<ICard[]>(
        "https://api.thecatapi.com/v1/images/search",
        {
          headers: {
            "x-api-key":
              "live_3RNxVEvRpAtvymOBP2mZFecH1YeDn9KeNfwUWnbCveHuNmw87sMWb55xKxQPPcGM",
            "Content-Type": "application/json",
          },
          params: {
            limit: limit,
            page: pages,
          },
        },
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          e.response?.data.message ||
            "Произошла ошибка при получении изображений",
        );
      } else {
        throw new Error("Произошла неизвестная ошибка");
      }
    }
  }

  static async getLikeCat(cat_id: string): Promise<AxiosResponse<ICard[]>> {
    try {
      return await axios.get<ICard[]>(
        `https://api.thecatapi.com/v1/images/${cat_id}`,
        {
          headers: {
            "x-api-key":
              "live_3RNxVEvRpAtvymOBP2mZFecH1YeDn9KeNfwUWnbCveHuNmw87sMWb55xKxQPPcGM",
            "Content-Type": "application/json",
          },
        },
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          e.response?.data.message ||
            "Ошибка в получении лайкнутых изображений",
        );
      } else {
        throw new Error("Произошла неизвестная ошибка");
      }
    }
  }

  static async getLikesUser() {
    try {
      return axios.get("http://localhost:8080/api/likes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          e.response?.data.message || "Ошибка при получении лайков",
        );
      } else {
        if (e instanceof Error) {
          throw new Error(e.message || "Ошибка при получении лайков");
        } else {
          throw new Error("Ошибка при получении лайков");
        }
      }
    }
  }

  static async newLike(cat_id: string) {
    try {
      const date = new Date();
      return await axios.post(
        "http://localhost:8080/api/likes",
        {
          cat_id: cat_id,
          created_at: date.toISOString().split(".")[0] + "Z",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          e.response?.data.message || "Ошибка при добавлении лайка",
        );
      } else {
        if (e instanceof Error) {
          throw new Error(e.message || "Ошибка при добавлении лайка");
        }
        throw new Error("Ошибка при добавлении лайка");
      }
    }
  }

  static async deleteLike(cat_id: string) {
    try {
      return await axios.delete(`http://localhost:8080/api/likes/${cat_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          e.response?.data.message || "Ошибка при удалении лайка",
        );
      } else {
        if (e instanceof Error) {
          throw new Error(e.message || "Ошибка при удалении лайка");
        }
        throw new Error("Ошибка при удалении лайка");
      }
    }
  }
}
