import React, { useState, useEffect, useCallback, useRef } from 'react'; // Importing hooks
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './Hero.css'; // Importing Hero.css

const Hero: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const autoSlideTimeout = useRef<NodeJS.Timeout | null>(null);

  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    refetchInterval: 1000 * 60 * 60,
  });

  // Limit movies to the first 6
  const limitedMovies = trending?.slice(0, 6) || [];
  const limitedMoviesLength = limitedMovies.length;

  const handleNext = useCallback(() => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === limitedMoviesLength - 1 ? 0 : prevIndex + 1
    );
    pauseAutoSlide();
  }, [limitedMoviesLength]);

  const handlePrevious = useCallback(() => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === 0 ? limitedMoviesLength - 1 : prevIndex - 1
    );
    pauseAutoSlide();
  }, [limitedMoviesLength]);

  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true);
    if (autoSlideTimeout.current) clearTimeout(autoSlideTimeout.current);
    autoSlideTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  }, []);

  useEffect(() => {
    if (isPaused || !limitedMovies) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isPaused, handleNext, limitedMovies]);

  if (!limitedMovies || limitedMovies.length === 0) {
    return <div>Loading...</div>;
  }

  const movie = limitedMovies[currentMovieIndex];

  return (
    <div className="hero-container relative h-[40vh] sm:h-[50vh] md:h-[48vw] lg:h-[58vw] xl:h-[60vw] w-full mb-2 group">
      <TransitionGroup className="absolute inset-0">
        <CSSTransition key={movie.id} timeout={700} classNames="slide">
          <div className="absolute inset-0">
            <div className="aspect-video">
              <Image
                src={getImageUrl(movie.backdrop_path || "/placeholder.jpg", "original")}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute inset-0 hero-gradient" />
          </div>
        </CSSTransition>
      </TransitionGroup>

      {/* Movie Details */}
      <div className="relative h-full flex items-center -translate-y-4">
        <div className="px-[4%] w-full md:max-w-[50%] space-y-2 md:space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold animate-fade-in line-clamp-2">
            {movie.title || movie.name}
          </h1>
          <p className="text-xs sm:text-sm md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3 animate-fade-in">
            {movie.overview}
          </p>
          <div className="flex gap-2 md:gap-3">
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center gap-1 md:gap-2 bg-white text-black px-2 md:px-8 py-1 md:py-3 rounded text-xs md:text-base hover:bg-gray-300 transition font-medium animate-fade-in"
              aria-label={`Play ${movie.title || movie.name}`}
            >
              <Play className="w-3 h-3 md:w-6 md:h-6 fill-current" />
              Play
            </Link>
            <button
              onClick={() => setSelectedMovie(movie)}
              className="flex items-center gap-1 md:gap-2 bg-gray-500/70 text-white px-2 md:px-8 py-1 md:py-3 rounded text-xs md:text-base hover:bg-gray-500/50 transition font-medium animate-fade-in"
              aria-label={`More information about ${movie.title || movie.name}`}
            >
              <Info className="w-3 h-3 md:w-6 md:h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div
        className="absolute left-[50%] transform -translate-x-[50%] flex gap-[8px]"
        style={{ bottom: '25%' }} // Adjusted bottom position
      >
        {limitedMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovieIndex(index)}
            className={`w-[10px] h-[10px] rounded-full ${
              index === currentMovieIndex ? "bg-white" : "bg-gray-400"
            } transition duration-300`}
            aria-label={`Go to movie ${index + 1}`}
          ></button>
        ))}
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

export default Hero;
