import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMovieById, getImageUrl } from "@/lib/tmdb";
import { Movie } from "@/types/movie";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites(user?.id);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      try {
        const movieData = await getMovieById(parseInt(id));
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!user || !movie) return;

    const posterUrl = movie.poster_path ? getImageUrl(movie.poster_path) : "";
    
    if (isFavorite(movie.id)) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie.id, movie.title, posterUrl);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading movie details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movies
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={movie.poster_path ? getImageUrl(movie.poster_path) : "/placeholder.svg"}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={handleFavoriteToggle}
                className="ml-4"
              >
                <Heart 
                  className={`h-5 w-5 mr-2 ${isFavorite(movie.id) ? "fill-destructive text-destructive" : ""}`}
                />
                {isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {movie.overview}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Release Date</h3>
              <p className="text-muted-foreground">
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;