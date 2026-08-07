import Button from "react-bootstrap/Button";
// import { getScores } from "../utils/Scoreboard";
import { useState, useEffect } from "react";

function Leaderboard({ scores, ...props }) {
    return (
        <div id="leaderboard" {...props}>
            <table className="table table-striped table-sm">
                <thead className="">
                    <tr id="leaderboard-header">
                        <th colSpan={4}>
                            <h2>LEADERBOARD</h2>
                        </th>
                    </tr>

                    <tr id="leaderboard-labels">
                        <th>#</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((entry, i) => (
                        <tr
                            key={i}
                            className={
                                "leaderboard-row" +
                                (entry.rank % 2 == 0 ? "-even" : "")
                            }
                        >
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
