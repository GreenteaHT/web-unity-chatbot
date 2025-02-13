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

import useCharacterStore from "@/store/useCharacterStore";
import Avatar from "./Avatar";
import { DEFAULT_IMAGE_URL } from "@/utils/constants.js";

export default function CharacterProfile() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { characters } = useCharacterStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const character = useMemo(() => {
    return Object.values(characters).find(
      (character) => character.name.toLowerCase() === name?.toLowerCase()
    );
  }, [characters, name]);

  const slides = [
    ...(character.images?.map((image) => ({
      type: "image",
      url: image,
    })) || [{ type: "image", url: DEFAULT_IMAGE_URL }]),
    ...(character.vrmUrl ? [{ type: "vrm", url: character.vrmUrl }] : []),
  ];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900">
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

      <div className="fixed inset-0 z-0 flex justify-center">
        <div className="w-full max-h-max p-5 max-w-2xl mt-16 relative aspect-square bg-white overflow-hidden">
          {slides[currentSlideIndex].type === "image" ? (
            <img
              src={slides[currentSlideIndex].url}
              alt={`Slide-${currentSlideIndex}`}
              className="rounded-lg shadow-md object-cover"
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

          {slides.length > 1 && (
            <>
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
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto aspect-square"></div>
      <div className="relative z-10 pt-20">
        <div className="mx-auto max-w-2xl bg-white/70 backdrop-blur-sm rounded-t-3xl shadow-lg border-t pb-28 px-4 pt-6 ">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <p className="text-gray-600">by {character.creator}</p>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-lg text-gray-700 whitespace-pre-wrap">
                {character.description}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Background Story</h2>
              <p className="min-h-20 text-lg text-gray-700 whitespace-pre-wrap">
                {character.backgroundStory}
              </p>
            </div>
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
