import Calculator from "./components/Calculator";
import { GetDailyNumbers } from "./utils/DailyNumbers";
import { saveScore, getScores } from "./utils/Scoreboard";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

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
                        <Button
                            variant="warning m-2"
                            onClick={() => {
                                setShowInstructions(true);
                            }}
                        >
                            How to Play
                        </Button>

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
            <Offcanvas
                show={showInstructions}
                onHide={() => {
                    setShowInstructions(false);
                }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>How to Play</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    These are the instructions you dumb idiot
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default App;
