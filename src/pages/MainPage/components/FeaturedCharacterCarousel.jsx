import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeaturedCharacterCard from "./FeaturedCharacterCard";

export default function FeaturedCharacterCarousel({ characters }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = characters.length;

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
      >
        {characters.map(([key, character]) => (
          <div key={key} className="w-full flex-shrink-0">
            <FeaturedCharacterCard character={character} />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft color="white" size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/20 rounded-full backdrop-blur-sm"
      >
        <ChevronRight color="white" size={24} />
      </button>
    </div>
  );
}
