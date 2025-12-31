import { useState } from "react";
import axios from "axios";

const choices = ["stone", "paper", "scissors"];

function getWinner(a, b) {
  if (a === b) return "Tie";
  if (
    (a === "stone" && b === "scissors") ||
    (a === "scissors" && b === "paper") ||
    (a === "paper" && b === "stone")
  ) return "Player 1";
  return "Player 2";
}

export default function Game() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [round, setRound] = useState(1);
  const [data, setData] = useState([]);

  const play = (a, b) => {
    if (round > 6) return;
    const win = getWinner(a, b);
    setData([...data, { round, a, b, win }]);
    setRound(round + 1);
  };

  const saveGame = async () => {
    const s1 = data.filter(x => x.win === "Player 1").length;
    const s2 = data.filter(x => x.win === "Player 2").length;
    const winner = s1 > s2 ? p1 : s2 > s1 ? p2 : "Tie";

    await axios.post("http://localhost:5000/api/games", {
      player1: p1,
      player2: p2,
      rounds: data,
      winner
    });

    alert("Game Saved Successfully!");
  };

  return (
    <div className="game-box">

      <div className="match-header">
  <div className="player-card">
    <span className="label">Player 1</span>
    <input
      placeholder="Enter name"
      value={p1}
      onChange={e => setP1(e.target.value)}
    />
  </div>

  <div className="vs-badge">VS</div>

  <div className="player-card">
    <span className="label">Player 2</span>
    <input
      placeholder="Enter name"
      value={p2}
      onChange={e => setP2(e.target.value)}
    />
  </div>
</div>
      <div className="round-title">
        🎯 Round {round <= 6 ? round : "Completed"}
      </div>

      {round <= 6 && (
        <div className="buttons">
          {choices.map(a =>
            choices.map(b => (
              <button key={a + b} onClick={() => play(a, b)}>
                {a} vs {b}
              </button>
            ))
          )}
        </div>
      )}
      <div className="result">
        {data.map(x => (
          <div key={x.round}>
            <b>Round {x.round}</b>: {x.a} vs {x.b} →{" "}
            <span style={{ color: "#38bdf8" }}>{x.win}</span>
          </div>
        ))}
      </div>

      {round > 6 && (
        <button className="finish-btn" onClick={saveGame}>
          🏁 Finish & Save
        </button>
      )}
    </div>
  );
}
