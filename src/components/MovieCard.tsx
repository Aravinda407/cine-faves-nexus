import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/lib/tmdb";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { user } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites(user?.id);
  const navigate = useNavigate();

  const handleFavoriteToggle = async () => {
    if (!user) return;

    const posterUrl = movie.poster_path ? getImageUrl(movie.poster_path) : "";
    
    if (isFavorite(movie.id)) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie.id, movie.title, posterUrl);
    }
  };

  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[2/3] relative">
        <img
          src={movie.poster_path ? getImageUrl(movie.poster_path) : "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2"
          onClick={handleFavoriteToggle}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorite(movie.id) ? "fill-destructive text-destructive" : ""}`}
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <Button size="sm" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;