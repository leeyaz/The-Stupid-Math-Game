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

    const numbers = {
        start: Math.floor(rand() * 101) - 0,
        continuing: Math.floor(rand() * 101) - 0,
        target: Math.floor(rand() * 101) - 0,
    };

    /* localStorage.setItem(
        "dailyNumbers",
        JSON.stringify({ date: today, numbers }),
    );*/
    return numbers;
}
