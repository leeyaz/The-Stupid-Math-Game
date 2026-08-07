import Button from "react-bootstrap/Button";
// import { getScores } from "../utils/Scoreboard";
import { useState, useEffect } from "react";

function Leaderboard(props) {
    //    const [scores, setScores] = useState([]);

    // const handleRefresh = async () => {
    //     const updated = await getScores();
    //     setScores(updated);
    // };

    //  useEffect(() => {
    //      getScores().then((data) => setScores(data));
    //  }, []);

    // console.log(scores);
    return (
        <div className="leaderboard ">
            <table className="table table-sm">
                <thead className="">
                    <tr className="leaderboard-header">
                        <th colSpan={4} className="p-0 border-0">
                            <div className="bg-info p-2 m d-flex align-items-center justify-content-between">
                                <h5 className="m-0 p-0">
                                    <b>LEADERBOARD</b>
                                </h5>
                            </div>
                        </th>
                    </tr>

                    <tr className="leaderboard-body">
                        <th className="bg-secondary-subtle">#</th>
                        <th className="bg-secondary-subtle">Name</th>
                        <th className="bg-secondary-subtle">Score</th>
                        <th className="bg-secondary-subtle">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.scores.map((entry, i) => (
                        <tr key={i} className={"leaderboard-row" + (entry.rank % 2 == 0 ? "-even" : "")}>
                            <td>{entry.rank}</td>
                            <td className="text-break">
                                {entry.name.slice(0, 39)}
                            </td>
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
