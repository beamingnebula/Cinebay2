import { useState, useEffect } from "react";
import { Play, Info, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

const MobileHero = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    refetchInterval: 1000 * 60 * 60,
  });

  const limitedMovies = trending?.slice(0, 6) || [];
  const movie = limitedMovies[currentMovieIndex];

  useEffect(() => {
    if (!limitedMovies.length) return;

    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === limitedMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [limitedMovies.length]);

  if (!movie) {
    return <div className="h-screen bg-black"></div>;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path || movie.poster_path || "/placeholder.jpg", "original")}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-12 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-red-500 text-2xl font-black tracking-wider">Cineby</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-white">
            <Settings className="w-6 h-6" />
          </button>
          <button className="p-2 text-white">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Movie Content */}
      <div className="absolute bottom-32 left-0 right-0 px-6 z-10">
        <div className="space-y-4">
          {/* Movie Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {movie.title || movie.name}
          </h1>

          {/* Movie Info */}
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-1">
              <span className="text-red-500">★</span>
              <span className="font-medium">{movie.vote_average?.toFixed(1)}/10</span>
            </div>
            <span>{movie.release_date?.split("-")[0] || "2024"}</span>
            <span className="px-2 py-1 bg-white/20 rounded text-sm">
              {movie.media_type === "tv" ? "TV Show" : "Movie"}
            </span>
            <span className="px-2 py-1 bg-white/20 rounded text-sm">HD</span>
          </div>

          {/* Description */}
          <p className="text-white/90 text-sm leading-relaxed line-clamp-4 max-w-lg">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg"
            >
              <Play className="w-8 h-8 text-black fill-black ml-1" />
            </Link>
            <button
              onClick={() => setSelectedMovie(movie)}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium"
            >
              <Info className="w-5 h-5" />
              See More
            </button>
          </div>
        </div>
      </div>

      {/* TOP 10 Section Preview */}
      <div className="absolute bottom-16 left-6 right-6 z-10">
        <div className="flex items-center gap-4">
          <div className="text-red-500 font-black text-2xl tracking-wider">
            TOP10
          </div>
          <div className="text-white text-sm">
            <div className="font-medium">CONTENT</div>
            <div className="font-medium">TODAY</div>
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MobileHero;