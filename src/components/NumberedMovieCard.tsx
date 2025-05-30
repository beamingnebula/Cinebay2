import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

interface NumberedMovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  media_type?: string;
  overview?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  index: number;
  recently_added?: boolean;
}

const NumberedMovieCard = ({
  id,
  title,
  poster_path,
  media_type = "movie",
  index,
  release_date,
  vote_average,
  recently_added,
  ...rest
}: NumberedMovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "/placeholder.svg";

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average ? Number((vote_average).toFixed(1)) : null;

  useEffect(() => {
    if (index === 9) {
      // Target the span containing the number
      const spanElement = document.querySelector(`.numbered-card-${index} span`);

      if (spanElement) {
        // Get the text content of the span
        const text = spanElement.textContent;

        // Clear the span's content
        spanElement.textContent = '';

        // Create the '1' and '0' elements
        const oneElement = document.createElement('span');
        oneElement.textContent = '1';
        oneElement.style.position = 'relative';

        const zeroElement = document.createElement('span');
        zeroElement.textContent = '0';
        zeroElement.style.position = 'relative';
        zeroElement.style.left = '-0.27em'; // Adjust the overlap here

                spanElement.style.position = 'relative';
                spanElement.style.left = '24%';
        // Append the elements to the span
        spanElement.appendChild(oneElement);
        spanElement.appendChild(zeroElement);
      }
    }
  }, [index]);

  return (
    <>
      <div
        className="relative group flex h-full w-full items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Aligned Number with Dark Mode Support */}
        <div
          className={`absolute inset-0 flex items-end justify-end cursor-pointer numbered-card-${index}`} // Added cursor-pointer and numbered-card class
          style={{
            right: "44%", // NUMBER HORIZONTAL POSITION
            bottom: "-4%", // NUMBER VERTICAL POSITION
          }}
          onClick={handleCardClick} // Make the number container clickable
        >
          <span
            className={`text-[77px] sm:text-[117px] font-black leading-none transition-all duration-300 ${
              isHovered ? "scale-100" : "scale-90"
            }`}
            style={{
              color: isHovered ? "#DC2626" : "rgba(51, 51, 51, 0.8)", // Change color on hover
              WebkitTextStroke: "2px #DC2626",
              textShadow: "0 0 8px #DC2626",
              userSelect: "none", // Prevent text selection
              position: 'relative', // Enable absolute positioning of the '0'
            }}
          >
            {index + 1}
          </span>
        </div>

        {/* Movie Poster - Animation Disabled */}
        <div className="relative z-10 ml-auto w-[56%]">
          <div
            onClick={handleCardClick}
            className="cursor-pointer overflow-hidden rounded-lg" // Removed transition-transform and hover:scale-105
          >
            <Image
              src={imageUrl}
              alt={title}
              className="aspect-[2/3] w-full object-cover"
              priority={index < 3}
            />

            {/* Recently Added Badge */}
            {recently_added && (
              <div className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
                Recently Added
              </div>
            )}

            {/* Info Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
              <span className="mb-2 line-clamp-2 text-xs font-semibold text-white sm:text-sm">
                {title}
              </span>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                {rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{rating}</span>
                  </div>
                )}
                {year && <span>{year}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MovieDetailsModal
        movie={{
          id,
          title,
          poster_path,
          media_type,
          release_date,
          vote_average,
          ...rest,
        }}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default NumberedMovieCard;
