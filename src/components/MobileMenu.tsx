import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "./CategoriesMenu";

const CategorySection = ({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: typeof categories.movies;
  onNavigate: (path: string) => void;
}) => (
  <div className="p-4 border-b border-gray-800">
    <h3 className="text-sm font-semibold text-gray-400 mb-2">{title}</h3>
    {items.map((category) => (
      <button
        key={category.id}
        onClick={() => onNavigate(`/category/${category.id}`)}
        className="w-full text-left py-2 text-white hover:text-gray-300"
      >
        {category.name}
      </button>
    ))}
  </div>
);

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black z-50 transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-gray-800">
                <button
                  onClick={() => handleNavigation("/")}
                  className="w-full text-left py-3 text-white hover:text-gray-300"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation("/category/tv")}
                  className="w-full text-left py-3 text-white hover:text-gray-300"
                >
                  TV Shows
                </button>
                <button
                  onClick={() => handleNavigation("/category/movie")}
                  className="w-full text-left py-3 text-white hover:text-gray-300"
                >
                  Movies
                </button>
              </div>

              {/* Movie Categories */}
              <CategorySection
                title="Movies"
                items={categories.movies}
                onNavigate={handleNavigation}
              />

              {/* TV Show Categories */}
              <CategorySection
                title="TV Shows"
                items={categories.shows}
                onNavigate={handleNavigation}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
