import Calculator from "./components/Calculator";
import Infobox from "./components/Infobox";
import { useState, useEffect } from "react";
import ScoreSubmission from "./components/ScoreSubmission";
import Header from "./components/Header";

import { CookieDisclaimer } from "./components/CookieDisclaimer";
import {
    enableStreak,
    disableStreak,
    getStreak,
    hasSeenDisclaimer,
    isStreakActive,
    setSeenDisclaimer,
} from "./utils/Streak";
import { useDailyNumbers } from "./utils/DailyNumbers";
import {
    onSnapshot,
    collection,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "./utils/firebase";

function App() {
    // SCORES
    const [lastScore, setLastScore] = useState(null);
    const [scores, setScores] = useState([]);
    const { start, continuing, target, dayKey } = useDailyNumbers();
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
    }, [dayKey]);

    // STREAK
    const [streak, setStreak] = useState(getStreak());
    const [streakActive, setStreakActive] = useState(isStreakActive());
    const [cookiesDisclaimer, setCookiesDisclaimer] =
        useState(!hasSeenDisclaimer());
    useEffect(() => {
        const onChange = (e) => {
            console.log("ON CHANGE");
            setStreak(getStreak());
            setStreakActive(isStreakActive());
        };
        window.addEventListener("streakChanged", onChange);

        return () => {
            window.removeEventListener("streakChanged", onChange);
        };
    }, []);

    // AUTO REFRESH
    const now = new Date();
    const refreshDate = new Date();
    refreshDate.setDate(now.getDate() + 1);
    refreshDate.setHours(0, 0, 0, 0);

    const delay = refreshDate.getTime() - now.getTime();

    useEffect(() => {
        setTimeout(() => window.location.reload(), delay);
    }, []);

    // MAIN
    return (
        <>
            <Header streak={streak} streakActive={streakActive} />
            <main className="container body text-center d-flex flex-column">
                <div className="title">
                    <h1>
                        STUPID MATH
                        <span style={{ fontSize: "10px" }}> the </span>
                        GAME™
                    </h1>
                </div>

                <Infobox lastScore={lastScore}
                        scores={scores}
                        start={start}
                        continuing={continuing}
                        target={target} />
                {/*at the centre*/}
                <Calculator onSetLastScore={setLastScore} />

                <ScoreSubmission lastScore={lastScore} />
            </main>
            <CookieDisclaimer
                show={cookiesDisclaimer}
                onHide={(val) => {
                    setSeenDisclaimer();
                    setCookiesDisclaimer(false);
                    val ? enableStreak() : disableStreak();
                }}
            />
        </>
    );
}

export default App;
