import Calculator from "./components/Calculator";
import Infobox from "./components/Infobox";
import { useState, useEffect } from "react";
import ScoreSubmission from "./components/ScoreSubmission";

function App() {
    
    const [lastScore, setLastScore] = useState(null);

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

                <Infobox lastScore={lastScore} />
                {/*at the centre*/}
                <Calculator onSetLastScore={setLastScore} />

                <ScoreSubmission lastScore={lastScore} />
            </div>
        </>
    );
}

export default App;
