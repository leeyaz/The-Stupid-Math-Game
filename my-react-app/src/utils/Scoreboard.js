import { db } from "./firebase";
import { collection, addDoc, getDocs, orderBy, query, limit } from "firebase/firestore";

export async function saveScore(name, score) {
    await addDoc(collection(db, "scores"), {
        name,
        score,
        time: new Date().toLocaleDateString()
    });
}

export async function getScores() {
    const q = query(collection(db, "scores"), orderBy("score", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}