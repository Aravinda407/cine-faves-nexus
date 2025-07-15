import { Movie, MovieResponse } from "@/types/movie";

const TMDB_API_KEY = "your_api_key_here"; // Users will need to add their own API key
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    
    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    // Return mock data if API fails
    return mockMovies;
  }
};

export const getMovieById = async (id: number): Promise<Movie | null> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
};

export const getImageUrl = (path: string) => {
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};

// Mock data for testing when API key is not available
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    vote_average: 9.3,
    release_date: "1994-09-23",
    genre_ids: [18, 80]
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    vote_average: 9.2,
    release_date: "1972-03-14",
    genre_ids: [18, 80]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkufdvl1g9YTfF1VzCOJe1THKj.jpg",
    vote_average: 9.0,
    release_date: "2008-07-16",
    genre_ids: [28, 80, 18]
  }
];