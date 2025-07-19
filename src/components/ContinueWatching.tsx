import { useQuery } from "@tanstack/react-query";
import { getMyList, type Movie } from "@/lib/tmdb";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "./ui/image";

const ContinueWatching = () => {
  const { data: continueWatchingList } = useQuery({
    queryKey: ["continueWatching"],
    queryFn: async () => {
      // For demo purposes, we'll use the user's list as continue watching
      const myList = await getMyList();
      return myList.slice(0, 6); // Show first 6 items
    },
  });

  if (!continueWatchingList || continueWatchingList.length === 0) {
    return null;
  }

  return (
    <div className="px-[4%] mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-red-600"></div>
        <h2 className="text-xl font-semibold text-white">Continue watching</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {continueWatchingList.map((item: Movie) => (
          <Link
            key={item.id}
            to={`/${item.media_type || "movie"}/${item.id}/watch`}
            className="relative flex-shrink-0 w-64 h-36 rounded-lg overflow-hidden group cursor-pointer"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              alt={item.title || item.name || ""}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-medium text-sm truncate">
                {item.title || item.name}
              </h3>
            </div>
            {/* Progress bar simulation */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
              <div 
                className="h-full bg-red-600" 
                style={{ width: `${Math.random() * 70 + 10}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;