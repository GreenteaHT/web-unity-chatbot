import { useLocation, useNavigate } from "react-router-dom";
import { House, Search, MessageSquareText, User } from "lucide-react";

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateHome = () => {
    if (location.pathname === "/home") {
      window.location.reload();
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200">
      <div className="max-w-2xl mx-auto flex items-center justify-around py-2">
        <button className="p-2" onClick={handleNavigateHome}>
          <House width={24} height={24} />
        </button>
        <button className="p-2">
          <Search width={24} height={24} />
        </button>
        <button className="p-2" onClick={() => navigate("/myChat")}>
          <MessageSquareText width={24} height={24} />
        </button>
        <button className="p-2" onClick={() => navigate("/userProfile")}>
          <User width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
