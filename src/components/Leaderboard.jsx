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
        <div className="leaderboard bg-white m-4 rounded-start-4">
            <table className="table table-striped table-sm">
                <thead className="sticky-top">
                    <tr>
                        <th colSpan={4} className="p-0 border-0">
                            <div className="bg-info p-2 m d-flex align-items-center justify-content-between">
                                <h5 className="m-0 p-0">
                                    <b>LEADERBOARD</b>
                                </h5>
                                <Button
                                    variant="outline-dark"
                                    size="sm"
                                    onClick={handleRefresh}
                                >
                                    <small>
                                        <b>REFRESH</b>
                                    </small>
                                </Button>
                            </div>
                        </th>
                    </tr>

                    <tr>
                        <th className="bg-secondary-subtle">#</th>
                        <th className="bg-secondary-subtle">Name</th>
                        <th className="bg-secondary-subtle">Score</th>
                        <th className="bg-secondary-subtle">Time</th>
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
