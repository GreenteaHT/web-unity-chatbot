import { useState, Suspense, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

import useCharacterStore from "../../store/useCharacterStore";
import Avatar from "./Avatar";

export default function CharacterProfile() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { characters } = useCharacterStore();

  const character = useMemo(() => {
    return Object.values(characters).find(
      (character) => character.name.toLowerCase() === name?.toLowerCase()
    );
  }, [characters, name]);

  const slides = [
    { type: "image", url: character.images[0] || "/default-thumbnail.png" },
    { type: "image", url: "/image/mike2.png" },
    { type: "vrm", url: "/model/mikhe.vrm" },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
          <button
            className="mr-4 text-gray-600 hover:text-gray-900"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={24} />
          </button>
          <span className="text-xl font-semibold text-indigo-600">
            {character.name}
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-2xl mx-auto mt-16">
        <div className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden">
          {slides[currentSlideIndex].type === "image" ? (
            <img
              src={slides[currentSlideIndex].url}
              alt={`Slide-${currentSlideIndex}`}
              className="absolute inset-0 w-full h-full object-cover bg-gray-200"
            />
          ) : (
            <Canvas
              style={{ background: "white" }}
              camera={{ position: [0, 1.3, 0.6] }}
              className="absolute inset-0"
            >
              <ambientLight intensity={0.65} />
              <spotLight position={[0, 2, -1]} intensity={0.4} />
              <Suspense fallback={null}>
                <Avatar url={slides[currentSlideIndex].url} />
              </Suspense>
              <OrbitControls target={[0, 1.3, 0]} />
            </Canvas>
          )}

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft size={24} color="white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 rounded-full backdrop-blur-sm"
          >
            <ChevronRight size={24} color="white" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlideIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-t from-white via-white/95 to-white/80 rounded-t-3xl shadow-lg border-t pb-20">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="text-gray-600">by {character.creator}</p>
            <p className="text-lg text-gray-700">{character.description}</p>
            <div className="flex flex-wrap gap-2">
              {character.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 p-4 bg-white z-20 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button
            className="w-full h-16 bg-rose-500 hover:bg-rose-600 text-white rounded-xl flex items-center justify-center space-x-2 text-lg font-medium shadow-lg transition-colors"
            onClick={() => navigate(`/character/${character.name}/chat`)}
          >
            <MessageCircle size={24} />
            <span>Start Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
