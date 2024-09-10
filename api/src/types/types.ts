export interface IToken {
  token: string;
}

export interface Ilike {
  id: number;
  cat_id: string;
}
export interface IUserAndLikes {
  token: string;
  user: {
    login: string;
    id: number;
    likes: Ilike[];
  };
}
