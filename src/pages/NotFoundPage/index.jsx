import { useNavigate } from "react-router-dom";
import NavigationBar from "@/components/NavigationBar";

export default function NotFoundPage({ type }) {
  const navigate = useNavigate();

  const message =
    type === "character"
      ? "The character you are looking for does not exist."
      : "Page not found.";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <span className="text-xl font-bold text-indigo-600">tsunagi.ai</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto flex flex-col items-center justify-center space-y-6 px-4">
        <h1 className="text-5xl font-bold text-gray-700 text-center">
          {message}
        </h1>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Go Back to Previous Page
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Return to Home Page
          </button>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
}
