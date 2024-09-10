import axios, { AxiosResponse } from "axios";

export default class UserService {
  static async register(
    login: string,
    password: string,
  ): Promise<AxiosResponse<any, any>> {
    try {
      console.log("регистрация");
      return await axios.post("http://localhost:8080/api/users", {
        login,
        password,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        //Выбрасываем с сообщением от сервера
        throw new Error(
          e.response?.data.message || "Произошла ошибка при регистрации",
        );
      } else {
        throw new Error("Произошла неизвестная ошибка");
      }
    }
  }

  static async avtorization(login: string, password: string) {
    try {
      console.log("avtor");
      return await axios.post("http://localhost:8080/api/users/login", {
        login,
        password,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // Если это AxiosError, выбрасываем с сообщением от сервера
        throw new Error(
          e.response?.data.message ||
            "Произошла ошибка при авторизации по паролю",
        );
      } else {
        throw new Error("Произошла неизвестная ошибка");
      }
    }
  }

  static async auth() {
    try {
      return await axios.get("http://localhost:8080/api/users/login/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // Если это AxiosError, выбрасываем с сообщением от сервера
        throw new Error(
          e.response?.data.message ||
            "Произошла ошибка при авторизации по токену",
        );
      } else {
        throw new Error("Произошла неизвестная ошибка");
      }
    }
  }
}
