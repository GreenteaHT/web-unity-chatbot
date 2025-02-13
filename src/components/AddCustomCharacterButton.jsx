import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AddCustomCharacterButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/character/create");
  };

  return (
    <button
      className="absolute right-4 w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
      onClick={handleClick}
    >
      <Plus color="#fff" width={32} height={32} />
    </button>
  );
}
