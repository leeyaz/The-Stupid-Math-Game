export function GetDailyNumbers() {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("dailyNumbers");

    if (stored) {
        const { date, numbers } = JSON.parse(stored);
        if (date === today) return numbers;
    }

    const numbers = {
        start: Math.floor(Math.random() * 2001) - 1000,
        continuing: Math.floor(Math.random() * 2001) - 1000,
        target: Math.floor(Math.random() * 2001) - 1000,
    };

    localStorage.setItem("dailyNumbers", JSON.stringify({ date : today, numbers }));
    return numbers;
}