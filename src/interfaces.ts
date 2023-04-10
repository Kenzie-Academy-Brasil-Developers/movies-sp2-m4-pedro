type TMovies = {
  id: number;
  name: string;
  category: string;
  duration: string;
  price: string;
};

type TMoviesRequest = Omit<TMovies, "id">;

export { TMovies, TMoviesRequest };
