import { useQuery } from "@tanstack/react-query";
import { getTrending, type Movie } from "@/lib/tmdb";
import { Image } from "./ui/image";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const TopTenToday = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  const topTen = trending?.slice(0, 10) || [];
  const itemsPerView = 5;
  const maxIndex = Math.max(0, topTen.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  if (!topTen.length) return null;

  return (
    <div className="px-[4%] mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-bold text-white">
            <span className="text-red-600 border-2 border-red-600 px-2 py-1 text-2xl">TOP 10</span>
          </h2>
          <div className="text-white">
            <div className="text-sm font-medium">CONTENT</div>
            <div className="text-sm font-medium">TODAY</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {topTen.map((movie: Movie, index: number) => (
            <Link
              key={movie.id}
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="relative flex-shrink-0 w-1/5 group cursor-pointer"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name || ""}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              
              {/* Large Number Overlay */}
              <div className="absolute -left-4 -bottom-4 z-10">
                <span className="text-8xl font-black text-red-600 stroke-white stroke-2" style={{
                  WebkitTextStroke: "3px white",
                  textShadow: "0 0 10px rgba(0,0,0,0.8)"
                }}>
                  {index + 1}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTenToday;