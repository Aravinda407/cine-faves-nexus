import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Favorite } from "@/types/movie";
import { useToast } from "@/hooks/use-toast";

export const useFavorites = (userId?: string) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFavorites = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (movieId: number, movieTitle: string, posterUrl: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("favorites")
        .insert({
          user_id: userId,
          movie_id: movieId,
          movie_title: movieTitle,
          movie_poster_url: posterUrl
        });

      if (error) throw error;
      
      await fetchFavorites();
      toast({
        title: "Success",
        description: "Movie added to favorites"
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const removeFromFavorites = async (movieId: number) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId);

      if (error) throw error;
      
      await fetchFavorites();
      toast({
        title: "Success",
        description: "Movie removed from favorites"
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(fav => fav.movie_id === movieId);
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchFavorites
  };
};