import Calculator from "./components/Calculator";
import { GetDailyNumbers } from "./utils/DailyNumbers";
import { saveScore, getScores } from "./utils/Scoreboard";
import { useState, useEffect } from "react";
//import "./App.css";

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
    };

    useEffect(() => {
        getScores().then((data) => setScores(data));
    }, []);

    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col"></div>
                <div className="col-5">
                    <div className="title p-4">
                        <h1>
                            <b>STUPID MATH</b>
                            <span style={{ fontSize: "10px" }}> the </span>
                            <b>GAME</b>™
                        </h1>
                    </div>

                    <div className="info p-2">
                        <button
                            type="button"
                            className="btn btn-warning m-2"
                            data-bs-toggle="offcanvas"
                            href="instructions"
                            onClick={() => {
                                setShowInstructions(true);
                            }}
                            aria-controls="instructions"
                        >
                            How to Play
                        </button>
                        <div
                            className={
                                "offcanvas offcanvas-start " +
                                (showInstructions ? "show" : "")
                            }
                            tabIndex="-1"
                            id="instructions"
                        >
                            <div className="offcanvas-header">
                                <h5
                                    className="offcanvas-title"
                                    id="offcanvasExampleLabel"
                                >
                                    How to Play
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                    onClick={() => {
                                        setShowInstructions(false);
                                    }}
                                ></button>
                            </div>
                            <div className="offcanvas-body text-start">
                                <div>Hello, these are the instructions</div>
                            </div>
                        </div>

                        <h3>Todays Numbers:</h3>
                        <div className="d-flex justify-content-evenly">
                            <p>
                                Starting: <b>{start}</b>
                            </p>
                            <p>
                                Continuing: <b>{continuing}</b>
                            </p>
                            <p>
                                Target: <b>{target}</b>
                            </p>
                        </div>
                    </div>

                    {/*at the centre*/}
                    <Calculator onSetLastScore={setLastScore} />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}

export default App;
