import Button from "react-bootstrap/Button";
import { getScores } from "../utils/Scoreboard";
import { useState, useEffect } from "react";

function Leaderboard(props) {
    const [scores, setScores] = useState([]);

    const handleRefresh = async () => {
        const updated = await getScores();
        setScores(updated);
    };

    useEffect(() => {
        getScores().then((data) => setScores(data));
    }, []);
    return (
        <div className="leaderboard bg-white p-4 rounded-start-4">
            <div className="row align-items-center">
                <div className="col-4"></div>
                <div className="col-4">
                    <h5 className="m-0 p-0">
                        <b>LEADERBOARD</b>
                    </h5>
                </div>
                <div className="col-4">
                    <Button variant="outline-secondary" onClick={handleRefresh}>
                        <small>
                            <b>REFRESH</b>
                        </small>
                    </Button>
                </div>
            </div>
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
