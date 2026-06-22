import { saveScore, getScores } from "../utils/Scoreboard";
import { useState, useEffect } from "react";

function Leaderboard(props) {
    const [scores, setScores] = useState([]);
    const [playerName, setPlayerName] = useState("");

    const handleAddScore = async () => {
        if (playerName && lastScore != null) {
            await saveScore(playerName, lastScore);
            const updated = await getScores();
            setScores(updated);
        }
    };

    useEffect(() => {
        getScores().then((data) => setScores(data));
    }, []);
    return (
        <div className="leaderboard bg-white p-4">
            <h5>SCOREBOARD</h5>
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((entry, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{entry.name}</td>
                            <td>{entry.score}</td>
                            <td>{entry.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
