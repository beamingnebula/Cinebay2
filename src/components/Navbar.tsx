import { Search, User, History, Heart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchContent } from "@/lib/tmdb";
import { toast } from "sonner";
import MovieDetailsModal from "./MovieDetailsModal";
import CategoriesMenu from "./CategoriesMenu";
import MobileMenu from "./MobileMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string | null;
  media_type: string;
  number_of_episodes?: number;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data: searchResults } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchContent(searchQuery),
    enabled: searchQuery.length > 2,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    navigate(path);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.length >= 2) {
      handleNavigation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.querySelector<HTMLInputElement>('.search-input')?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const showMyList = () => {
    navigate("/my-list");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-black tracking-wider">
            CINEBAY
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Home Button */}
            <Link 
              to="/" 
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors"
            >
              <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-red-600 rounded-sm"></div>
              </div>
              Home
            </Link>
            
            {/* Browse Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-gray-300 text-sm font-medium">
                Browse
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black/95 text-white border-gray-800">
                <DropdownMenuItem onClick={() => handleNavigation("/category/movie")} className="cursor-pointer hover:bg-gray-800">
                  Movies
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/category/tv")} className="cursor-pointer hover:bg-gray-800">
                  TV Shows
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/category/kdrama")} className="cursor-pointer hover:bg-gray-800">
                  K-Dramas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/category/anime")} className="cursor-pointer hover:bg-gray-800">
                  Anime
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu */}
          <MobileMenu />
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative search-container">
            <div className="flex items-center">
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input bg-black/80 text-white px-4 py-2 rounded-l border-r border-gray-700 w-[140px] sm:w-[200px] md:w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyDown={handleSearchKeyPress}
                  autoFocus
                />
              )}
              <button
                className={`p-2 ${isSearchOpen ? 'bg-black/80 rounded-r' : 'rounded'} hover:bg-white/10 transition-colors`}
                onClick={toggleSearch}
                title="Toggle search"
              >
                <Search className="w-5 h-5 text-white hover:text-gray-300" />
              </button>
            </div>
            {isSearchOpen && searchResults && searchResults.length > 0 && searchQuery.length > 2 && (
              <div className="absolute top-full right-0 mt-2 w-screen sm:w-full max-w-[90vw] sm:max-w-none bg-black/95 rounded-lg shadow-lg z-[100] max-h-[60vh] overflow-y-auto border border-gray-800">
                <div className="p-3 border-b border-gray-800">
                  <button
                    onClick={() => handleNavigation(`/search?q=${encodeURIComponent(searchQuery)}`)}
                    className="w-full text-left text-sm text-blue-400 hover:text-blue-300"
                  >
                    See all results for "{searchQuery}"
                  </button>
                </div>
                {searchResults.slice(0, 5).map((result: any) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-800/50 cursor-pointer transition-colors border-b border-gray-800 last:border-none"
                    onClick={() => handleMovieSelect(result)}
                  >
                    {result.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                        alt={result.title || result.name}
                        className="w-12 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-800 rounded flex items-center justify-center text-gray-500">No Image</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{result.title || result.name}</p>
                      <p className="text-gray-400 text-sm truncate">
                        {result.media_type === 'movie' ? 'Movie' : 'TV Show'}
                        {result.media_type === 'tv' && result.number_of_episodes && (
                          <span className="ml-2">({result.number_of_episodes} episodes)</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* History */}
          <button 
            className="hidden md:flex items-center gap-2 text-white hover:text-gray-300 text-sm"
            title="History"
          >
            <History className="w-5 h-5" />
            History
          </button>

          {/* Watchlist */}
          <button 
            onClick={showMyList}
            className="hidden md:flex items-center gap-2 text-white hover:text-gray-300 text-sm"
            title="Watchlist"
          >
            <Heart className="w-5 h-5" />
            Watchlist
          </button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm hover:bg-red-700 transition-colors">
                U
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-black/90 text-white border-gray-700">
              <DropdownMenuItem onClick={showMyList} className="cursor-pointer hover:bg-gray-800">My List</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Account settings coming soon!")} className="cursor-pointer hover:bg-gray-800">Account Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation("/legal")} className="cursor-pointer hover:bg-gray-800">Legal Disclaimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;