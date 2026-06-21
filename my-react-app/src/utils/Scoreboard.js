import { db } from "./firebase";
import { collection, addDoc, getDocs, orderBy, query, limit } from "firebase/firestore";

export async function saveScore(name, score) {
    await addDoc(collection(db, "scores"), {
        name,
        score,
        time: new Date().toLocaleDateString(),
        date: new Date().toDateString()
    });
}

export async function getScores() {
    const today = new Date().toDateString();
    const q = query(collection(db, "scores"),
                    where("date", "==", today),
                    orderBy("score", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}