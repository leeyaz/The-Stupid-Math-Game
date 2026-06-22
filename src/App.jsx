import Calculator from "./components/Calculator";
import { GetDailyNumbers } from "./utils/DailyNumbers";
import { saveScore, getScores } from "./utils/Scoreboard";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const { start, continuing, target } = GetDailyNumbers();
    const [scores, setScores] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [lastScore, setLastScore] = useState(null);

    const handleAddScore = async () => {
        if (playerName && lastScore != null) {
            await saveScore(playerName, lastScore);
            const updated = await getScores();
            setScores(updated);
        }
    }

    useEffect(() => {
        getScores().then((data) => setScores(data));
    }, []);

    return (
        <div className="container">
            <div className="title">
                <h1>
                    <b>STUPID MATH</b>
                    <span style={{ fontSize: "10px" }}> the </span>
                    <b>GAME</b>™
                </h1>
            </div>

            {/*at the centre*/}
            <Calculator onSetLastScore={setLastScore}/>

            {/*on the left top, tells user what the starting, continuing and target numbers are*/}
            <div className="info-bracket">
                <h5>TODAY'S NUMBERS</h5>
                <p>
                    Start: <b>{start}</b>
                </p>
                <p>
                    Continuing: <b>{continuing}</b>
                </p>
                <p>
                    Target: <b>{target}</b>
                </p>
                <p>
                    Available Operations: +, -, *, /, (, ), ^ (power), %
                    (modulus or percentage), ! (factorial), sin, cos, tan, sec,
                    csc, cot, floor, abs, ...and more. Check out{" "}
                    <a href="https://mathjs.org/docs/expressions/syntax.html">
                        this website
                    </a>{" "}
                    for more information.
                </p>
            </div>

            {/*on the left bottom, includes valid operations*/}
            <div className="instructions">
                <h6>
                    <b>INSTRUCTIONS TO THE GAME</b>
                </h6>
                <p>
                    Your expression MUST begin with the Start number once,
                    today's is {start}. After {start}, you may only use the
                    Continuing number, which is {continuing} today, which you
                    may use any number of times. Your goal is to bring the
                    operation to equal to the target number, that number is{" "}
                    {target} today. Your score is counted by the length of your
                    expression, your goal is to find the shortest expression.
                    All number combinations are possible. See above for
                    available operations, numbers randomize from 0 to 100 every
                    day, and the scoreboard also resets every day. Have fun
                    playing!! :)
                </p>
            </div>

            {/*on the right top, scrollable. Currently the scoreboard should work perfectly.*/}
            <div className="scoreboard">
                <h5>SCOREBOARD</h5>
                <table>
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

            {/*on the right bottom*/}
            <div className="nameInput">
                <input
                    type="text"
                    placeholder="Enter your name!"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button onClick={handleAddScore}>Add Score</button>
            </div>

            <div className="nameInputDisclaimer">
                <p>Please do not spam! It takes time to load.</p>
            </div>
        </div>
    );
}

export default App;
