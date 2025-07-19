import { Home, Search, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileNavbar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-2 ${
            location.pathname === "/" ? "text-red-500" : "text-gray-400"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        
        <Link
          to="/search"
          className={`flex flex-col items-center gap-1 p-2 ${
            location.pathname === "/search" ? "text-red-500" : "text-gray-400"
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-xs font-medium">Search</span>
        </Link>
        
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <Menu className="w-5 h-5" />
          <span className="text-xs font-medium">Menu</span>
        </button>
      </div>
      <div className="w-1/3 h-1 bg-white rounded-full mx-auto mb-1"></div>
    </div>
  );
};

export default MobileNavbar;