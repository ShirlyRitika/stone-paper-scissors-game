import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [games, setGames] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:5000/api/games");
    setGames(res.data);
  };

  const deleteHistory = async () => {
    if (!confirm("Are you sure you want to delete all history?")) return;

    await axios.delete("http://localhost:5000/api/games");
    setGames([]);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="game-box">
      <h2>Game History</h2>

      {games.length > 0 && (
        <button className="finish-btn" onClick={deleteHistory}>
          🧹 Clear History
        </button>
      )}

      <div className="result">
        {games.map(g => (
          <div key={g._id}>
            <strong>{g.player1}</strong> vs <strong>{g.player2}</strong>
            <div>
              Winner: <span style={{ color: "#38bdf8" }}>{g.winner}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
