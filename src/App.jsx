import Calculator from "./components/Calculator";
import Infobox from "./components/Infobox";
import { useState, useEffect } from "react";
import ScoreSubmission from "./components/ScoreSubmission";
import { saveScore, getScores } from "./utils/Scoreboard";
import Leaderboard from "./components/Leaderboard";

function App() {
    
    const [lastScore, setLastScore] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        getScores().then((data) => setScores(data));
    }, []);

    return (
        <>
            <div className="container body text-center vh-100 d-flex flex-column gap-3">
                <div className="title p-4">
                    <h1>
                        <b>STUPID MATH</b>
                        <span style={{ fontSize: "10px" }}> the </span>
                        <b>GAME</b>™
                    </h1>
                </div>

                <Infobox lastScore={lastScore} scores={scores} />
                {/*at the centre*/}
                <Calculator onSetLastScore={setLastScore} />

                <ScoreSubmission lastScore={lastScore} onScoreAdded={(updated) => setScores(updated)} />
                
            </div>
        </>
    );
}

export default App;
