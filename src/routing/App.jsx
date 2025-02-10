import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainPage from "../pages/MainPage";
import CreateCharacter from "../pages/CreateCharacter";
import CharacterProfile from "../pages/CharacterProfile";
import UnityPage from "../pages/UnityPage";
import UserProfilePage from "../pages/UserProfilePage";
import MyChatPage from "../pages/MyChatPage";
import NotFoundPage from "../pages/NotFoundPage";
import CharacterWrapper from "./wrappers/CharacterWrapper";
import { validateCharacter } from "./loaders/validateCharacter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <MainPage />,
  },
  {
    path: "/userProfile",
    element: <UserProfilePage />,
  },
  {
    path: "/myChat",
    element: <MyChatPage />,
  },
  {
    path: "/character",
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "create",
        element: <CreateCharacter />,
      },
      {
        path: ":name",
        loader: validateCharacter,
        element: <CharacterWrapper />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <CharacterProfile /> },
          { path: "chat", element: <UnityPage /> },
        ],
      },
      {
        path: "not-found",
        element: <NotFoundPage type="character" />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage type="general" />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
