export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Favorite {
  id: string;
  user_id: string;
  movie_id: number;
  movie_title: string;
  movie_poster_url: string;
  created_at: string;
}