import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_URL } from "@/utils/constants";

export default function RecentlyAddedCharacterCard({ character }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex space-x-4 bg-white rounded-lg shadow-sm p-3 cursor-pointer"
      onClick={() => navigate(`/character/${character.name}/profile`)}
    >
      <img
        src={character.images?.[0] || DEFAULT_IMAGE_URL}
        alt={character.name}
        className="w-16 h-16 object-cover rounded-md"
      />

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{character.name}</h3>
          <span className="text-xs text-gray-500">{character.creator}</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {character.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {character.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
