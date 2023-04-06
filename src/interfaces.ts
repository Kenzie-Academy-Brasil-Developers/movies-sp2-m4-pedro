import { QueryResult } from "pg";

export interface IMovies {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type IMoviesRequest = Omit<IMovies, "id">;

export type IMovieResult = QueryResult<IMovies>;
