import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre, getTVShows, type MovieResponse } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

const genres = [
  { id: "comedy", name: "Comedy", tmdbId: "35" },
  { id: "action", name: "Action", tmdbId: "28" },
  { id: "horror", name: "Horror", tmdbId: "27" },
  { id: "romance", name: "Romance", tmdbId: "10749" },
  { id: "scifi", name: "SciFi", tmdbId: "878" },
  { id: "drama", name: "Drama", tmdbId: "18" },
  { id: "animation", name: "Animation", tmdbId: "16" },
];

const DiscoverByGenres = () => {
  const [selectedGenre, setSelectedGenre] = useState("comedy");

  const { data: genreMovies } = useQuery({
    queryKey: ["genreMovies", selectedGenre],
    queryFn: async () => {
      const genre = genres.find(g => g.id === selectedGenre);
      if (!genre) return { results: [] };
      return getMoviesByGenre(genre.tmdbId);
    },
  });

  return (
    <div className="px-[4%] mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-red-600"></div>
        <h2 className="text-2xl font-semibold text-white">Discover by genres</h2>
      </div>
      
      {/* Genre Tabs */}
      <div className="flex gap-6 mb-8 overflow-x-auto scrollbar-hide">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`text-sm font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
              selectedGenre === genre.id
                ? "text-red-600 border-red-600"
                : "text-gray-400 border-transparent hover:text-white"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {genreMovies?.results?.slice(0, 16).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name || ""}
            poster_path={movie.poster_path}
            media_type="movie"
            overview={movie.overview}
            backdrop_path={movie.backdrop_path}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverByGenres;