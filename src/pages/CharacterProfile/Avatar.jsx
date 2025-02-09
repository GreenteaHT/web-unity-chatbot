import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";

export default function Avatar({ url }) {
  const { camera } = useThree();
  const avatarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [modelScene, setModelScene] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      url,
      (gltf) => {
        const vrm = gltf.userData.vrm;
        avatarRef.current = vrm;

        vrm.scene.rotation.y = Math.PI;
        vrm.lookAt.target = camera;

        camera.position.set(0, 1.5, 1);
        camera.lookAt(1, 1, 1);

        setModelScene(vrm.scene);
      },
      (xhr) => {
        setProgress((xhr.loaded / xhr.total) * 100);
      },
      (error) => {
        console.error("Failed to load VRM:", error);
      }
    );
  }, [url, camera]);

  useFrame((state, delta) => {
    if (avatarRef.current) {
      avatarRef.current.update(delta);
      const time = state.clock.getElapsedTime();
      const blinkValue = Math.abs(Math.sin(time * 1));
      avatarRef.current.expressionManager.setValue("blink", blinkValue);
    }
  });

  return (
    <>
      {!modelScene && (
        <Html center>
          <div className="text-black bg-white bg-opacity-80 px-4 py-2 rounded">
            {progress.toFixed(1)}% loaded
          </div>
        </Html>
      )}

      {modelScene && <primitive object={modelScene} />}
    </>
  );
}
