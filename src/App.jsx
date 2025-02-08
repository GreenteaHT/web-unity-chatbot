import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<MainPage />} />
    </Routes>
  );
}
