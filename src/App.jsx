import Calculator from "./components/Calculator";
import Infobox from "./components/Infobox";
import { useState, useEffect } from "react";
import ScoreSubmission from "./components/ScoreSubmission";
// import { getScores } from "./utils/Scoreboard";
import {
    onSnapshot,
    collection,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "./utils/firebase";

function App() {
    const [lastScore, setLastScore] = useState(null);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const today = new Date().toDateString();
        const q = query(
            collection(db, "scores"),
            where("date", "==", today),
            orderBy("score", "desc"),
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());

            data.sort((a, b) => {
                if (a.score > b.score) {
                    return -1;
                }
                if (a.score == b.score) {
                    const dateA = new Date(`${a.date} ${a.time}`);
                    const dateB = new Date(`${b.date} ${b.time}`);

                    return dateA - dateB;
                }
                return 1;
            });

            setScores(data);
        });
        return () => unsubscribe();
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

                <ScoreSubmission
                    lastScore={lastScore}
                />
            </div>
        </>
    );
}

export default App;
