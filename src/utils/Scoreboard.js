import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    limit,
    where,
    onSnapshot
} from "firebase/firestore";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Etc/GMT+7",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});

export async function saveScore(name, score) {
    if (name.length > 32) {
        throw new Error("Name must be less than 32 characters long.");
    }
    await addDoc(collection(db, "scores"), {
        name,
        score,
        time: timeFormatter.format(new Date()),
        date: new Date().toDateString(),
    });
}

//below is in App.jsx now!!

// export async function getScores() {
//     const today = new Date().toDateString();
//     let q = query(
//         collection(db, "scores"),
//         where("date", "==", today),
//         orderBy("score", "desc"),
//     );

//     const snapshot = await getDocs(q);
//     const scores = snapshot.docs.map((doc) => doc.data());

//     let rank = 0;
//     let lastScore = null;
//     return scores.map((entry) => {
//         if (entry.score !== lastScore) {
//             rank += 1;
//             lastScore= entry.score;
//         }
//         return { ...entry, rank }
//     })
// }
