import { Unity, useUnityContext } from "react-unity-webgl";

function UnityPage() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "unityBuild/WebBuild.loader.js",
    dataUrl: "unityBuild/WebBuild.data",
    frameworkUrl: "unityBuild/WebBuild.framework.js",
    codeUrl: "unityBuild/WebBuild.wasm",
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Unity unityProvider={unityProvider} className="w-4/6 h-4/6" />
    </div>
  );
}

export default UnityPage;