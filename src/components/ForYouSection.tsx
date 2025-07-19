import { useQuery } from "@tanstack/react-query";
import { getPopular, type Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

const ForYouSection = () => {
  const { data: forYouMovies } = useQuery({
    queryKey: ["forYou"],
    queryFn: async () => {
      const response = await getPopular("vote_average.desc");
      return response.results;
    },
  });

  if (!forYouMovies || forYouMovies.length === 0) {
    return null;
  }

  return (
    <div className="px-[4%] mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-red-600"></div>
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          For you
          <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {forYouMovies.slice(0, 16).map((movie: Movie) => (
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

export default ForYouSection;