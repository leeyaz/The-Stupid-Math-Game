import { useState, useEffect } from "react";

function mulberry32(a) {
    return function () {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function GetDailyNumbers() {
    const date = new Date();
    const dateInteger =
        date.getDate() + date.getMonth() * 100 + date.getFullYear() * 10000;
    const rand = mulberry32(dateInteger);

    /*const stored = localStorage.getItem("dailyNumbers");

    if (stored) {
        const { date, numbers } = JSON.parse(stored);
        if (date === today) return numbers;
    }*/

    let numbers = {
        start: Math.floor(rand() * 101),
        continuing: Math.floor(rand() * 101),
        target: Math.floor(rand() * 101),
    };

    // ensure that the solution can never just be the starting number
    // can't this be abused by sign()? could be revamped ig
    // i think is fine cuz target = start + 1 can alrdy happen w/o it.
    if (numbers.target === numbers.start) {
        numbers.target = numbers.start + 1;
    }

    /* localStorage.setItem(
        "dailyNumbers",
        JSON.stringify({ date: today, numbers }),
    );*/
    return numbers;
}

function msUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
}

export function useDailyNumbers() {
    const [numbers, setNumbers] = useState(() => GetDailyNumbers());
    const [dayKey, setDayKey] = useState(() => new Date().toDateString());

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNumbers(GetDailyNumbers());
            setDayKey(new Date().toDateString());
        }, msUntilMidnight() + 500);

        function handleVisibility() {
            if (document.visibilityState === "visible") {
                const currentDay = new Date().toDateString();
                if (currentDay !== dayKey) {
                    setNumbers(GetDailyNumbers());
                    setDayKey(currentDay);
                }
            }
        }
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [numbers, dayKey]);

    return { ...numbers, dayKey };
}