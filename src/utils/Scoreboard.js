import { db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    limit,
    where,
} from "firebase/firestore";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Etc/GMT+7",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});

export async function saveScore(name, score) {
    await addDoc(collection(db, "scores"), {
        name,
        score,
        time: timeFormatter.format(new Date()),
        date: new Date().toDateString(),
    });
}

export async function getScores() {
    const today = new Date().toDateString();
    let q = query(
        collection(db, "scores"),
        where("date", "==", today),
        orderBy("score", "desc"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
}
