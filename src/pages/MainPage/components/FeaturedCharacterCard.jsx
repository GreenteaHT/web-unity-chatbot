import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_URL } from "@/utils/constants";

export default function FeaturedCharacterCard({ character }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex-none w-full snap-center cursor-pointer"
      onClick={() => navigate(`/character/${character.name}/profile`)}
    >
      <div className="bg-white rounded-lg shadow-sm">
        <div className="h-64 bg-gray-200 w-full rounded-t-lg">
          <img
            src={character.images?.[0] || DEFAULT_IMAGE_URL}
            alt={character.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-semibold">{character.name}</h3>
            <span className="text-sm text-gray-500">{character.creator}</span>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed line-clamp-5">
            {character.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {character.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-s font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
