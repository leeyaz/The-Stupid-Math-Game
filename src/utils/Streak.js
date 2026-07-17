const COOKIE_NAME = "streak";
const STREAK_UPDATE_EVENT = new CustomEvent("streakChanged");

function getCookie() {
    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(COOKIE_NAME + "="));
    if (!match) return null;
    try {
        return JSON.parse(decodeURIComponent(match.split("=")[1]));
    } catch {
        return null;
    }
}

function setCookie(data) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); //expires one year from setCookie called
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(data))}; expires=${expires.toUTCString()}; path=/`;
}

export function getStreak() {
    if (!isStreakEnabled()) return "N/A";
    const cookie = getCookie();

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (
        cookie &&
        (cookie.lastPlayed === yesterday || cookie.lastPlayed === today)
    ) {
        return cookie.streak;
    } else {
        setCookie({ streak: 0, lastPlayed: yesterday });
        return 0;
    }
}

export function updateStreak() {
    if (isStreakActive()) return;
    console.log("UPDATE STREAK");

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const cookie = getCookie();
    // { streak: 0, lastPlayed: yesterday }

    if (cookie && cookie.lastPlayed === yesterday) {
        setCookie({ streak: cookie.streak + 1, lastPlayed: today });

        window.dispatchEvent(STREAK_UPDATE_EVENT);
    } else {
        return false;
    }
}

export function hasSeenDisclaimer() {
    return localStorage.getItem("seenDisclaimer");
}

export function setSeenDisclaimer() {
    localStorage.setItem("seenDisclaimer", "true");
}

export function isStreakActive() {
    console.log("IS STREAK ACTIVE");
    const today = new Date().toDateString();
    const cookie = getCookie();

    return cookie && cookie.lastPlayed === today;
}

export function isStreakEnabled() {
    console.log("IS STREAK ENABLE");
    return !localStorage.getItem("cookiesDeclined");
}

export function disableStreak() {
    if (!isStreakEnabled()) return;
    console.log("DISABLE STREAK");
    localStorage.setItem("cookiesDeclined", "true");
    document.cookie = `${COOKIE_NAME}=; expires=Tue, 06 Jun 2006 00:00:00 UTC; path=/`; //haha guess who's birthday
    //... it couldn't be.. could it?

    window.dispatchEvent(STREAK_UPDATE_EVENT);
}

export function enableStreak() {
    if (isStreakEnabled()) return;
    console.log("ENABLE STREAK");
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    localStorage.removeItem("cookiesDeclined");
    setCookie({ streak: 0, lastPlayed: yesterday });

    window.dispatchEvent(STREAK_UPDATE_EVENT);
}
