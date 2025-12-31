import { Routes, Route, Link } from "react-router-dom";
import Game from "./pages/Game";
import History from "./pages/History";
import "./style.css";

export default function App() {
  return (
    <div className="app">
      <h1>🎮 Stone Paper Scissors Game</h1>

      <nav>
        <Link to="/">Game</Link>
        <Link to="/history">History</Link>
      </nav>

      <div className="page-center">
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}
