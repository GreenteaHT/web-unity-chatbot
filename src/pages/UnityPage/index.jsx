import { Unity, useUnityContext } from "react-unity-webgl";

function UnityPage() {
  const { isLoaded, loadingProgression, unityProvider } = useUnityContext({
    loaderUrl: "unityBuild/WebBuild.loader.js",
    dataUrl: "unityBuild/WebBuild.data",
    frameworkUrl: "unityBuild/WebBuild.framework.js",
    codeUrl: "unityBuild/WebBuild.wasm",
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white text-lg">
          Loading... {Math.round(loadingProgression * 100)}%
        </div>
      )}
      <div className="flex w-4/6 h-4/6 shadow-lg bg-white">
        <Unity unityProvider={unityProvider} className="w-full h-full" />
      </div>
    </div>
  );
}

export default UnityPage;