import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import { ArrowLeft } from "lucide-react";
import useCharacterStore from "@/store/useCharacterStore";

export default function UnityPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { characters } = useCharacterStore();

  const character = useMemo(() => {
    return Object.values(characters).find(
      (character) => character.name.toLowerCase() === name?.toLowerCase()
    );
  }, [characters, name]);

  const { isLoaded, loadingProgression, unityProvider, unload } =
    useUnityContext({
      loaderUrl: "/unityBuild/WebBuild.loader.js",
      dataUrl: "/unityBuild/WebBuild.data",
      frameworkUrl: "/unityBuild/WebBuild.framework.js",
      codeUrl: "/unityBuild/WebBuild.wasm",
    });

  useEffect(() => {
    return () => {
      unload();
    };
  }, [unload]);

  return (
    <div className="bg-white min-h-screen relative">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
          <button
            className="mr-4 text-gray-600 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={24} />
          </button>
          <span className="text-xl font-semibold text-indigo-600">
            {character.name}
          </span>
        </div>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80 text-white text-lg">
          Loading... {Math.round(loadingProgression * 100)}%
        </div>
      )}

      <div className="pt-16 pb-8 flex justify-center">
        <div className="w-full max-w-2xl h-[calc(100vh-6rem)] bg-gray-200 relative rounded-lg shadow-md">
          <Unity unityProvider={unityProvider} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
