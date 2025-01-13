import { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const { isLoaded, loadingProgression, unityProvider } = useUnityContext({
    loaderUrl: "unityBuild/WebBuild.loader.js",
    dataUrl: "unityBuild/WebBuild.data",
    frameworkUrl: "unityBuild/WebBuild.framework.js",
    codeUrl: "unityBuild/WebBuild.wasm",
  });

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prev) => [...prev, { sender: "You", text: inputMessage }]);
      setInputMessage("");
    }
  };

  const handleInputMessage = (event) => {
    setInputMessage(event.target.value);
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white text-lg">
          Loading... {Math.round(loadingProgression * 100)}%
        </div>
      )}
      <div className="flex w-4/6 h-4/6 shadow-lg bg-white">
        <Unity unityProvider={unityProvider} className="w-full h-full" />

        <div className="w-1/3 p-4 bg-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded bg-white mb-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-2 text-black">
                <strong>{message.sender}:</strong> <span>{message.text}</span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputMessage}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnityPage;
