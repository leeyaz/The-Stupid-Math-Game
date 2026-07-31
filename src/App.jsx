import Calculator from "./components/Calculator";
import Infobox from "./components/Infobox";
import { useState, useEffect } from "react";
import ScoreSubmission from "./components/ScoreSubmission";
import Header from "./components/Header";
import {
    refreshCookie,
    getStreak,
    hasSeenDisclaimer,
    setSeenDisclaimer,
    hasDeclinedCookies,
    setDeclinedCookies,
    deleteStreakCookie,
} from "./utils/Streak";
import CookieDisclaimer from "./components/CookieDisclaimer";
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
    const [showDisclaimer, setShowDisclaimer] = useState(!hasSeenDisclaimer());
    const [streakEnabled, setStreakEnabled] = useState(!hasDeclinedCookies());

    useEffect(() => {
        refreshCookie();
        getStreak();
    }, []);

    const handleAccept = () => {
        //cookies true unless declined
        setSeenDisclaimer();
        setShowDisclaimer(false);
        setStreakEnabled(true);
    };

    const handleDecline = () => {
        setDeclinedCookies();
        deleteStreakCookie();
        setSeenDisclaimer();
        setShowDisclaimer(false);
        setStreakEnabled(false);
    };

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

            let rank = 0;
            let lastScore = null;
            const ranked = data.map((entry) => {
                if (entry.score !== lastScore) {
                    rank += 1;
                    lastScore = entry.score;
                }
                return { ...entry, rank };
            });

            setScores(ranked);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <CookieDisclaimer
                show={showDisclaimer}
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
            <Header
                streakEnabled={streakEnabled}
                setStreakEnabled={setStreakEnabled}
            />
            <div className="container body text-center d-flex flex-column gap-3">
                <div className="title py-4">
                    <h1>
                        <b>STUPID MATH</b>
                        <span style={{ fontSize: "10px" }}> the </span>
                        <b>GAME</b>™
                    </h1>
                </div>

                <Infobox lastScore={lastScore} scores={scores} />
                {/*at the centre*/}
                <Calculator
                    onSetLastScore={setLastScore}
                    streakEnabled={streakEnabled}
                />

                <ScoreSubmission lastScore={lastScore} />
            </div>
        </>
    );
}

export default App;
