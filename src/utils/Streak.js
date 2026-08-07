const COOKIE_NAME = "streak";

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

// export function getStreak() {
//     const cookie = getCookie();
//     if (!cookie) return 0;
//     return cookie.streak;
// }

export function getStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const cookie = getCookie();

    if (!cookie) return 0;

    // if last played was today or yesterday, streak is still valid
    if (cookie.lastPlayed === today || cookie.lastPlayed === yesterday) {
        return cookie.streak;
    }

    // missed a day — reset
    setCookie({ streak: 0, lastPlayed: cookie.lastPlayed });
    return 0;
}

export function updateStreak() {
    const animateStreak = () => {
        const streakFlame = document.getElementById("streak-icon");
        if (streakFlame) {
            streakFlame.classList.add("animate");
        }
    };

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const cookie = getCookie();

    if (!cookie) {
        // first time ever
        setCookie({ streak: 1, lastPlayed: today });
        animateStreak();
        window.dispatchEvent(new Event("streakChanged"));
        return 1;
    }

    if (cookie.lastPlayed === today) {
        // already played today, don't change streak
        return cookie.streak;
    }

    if (cookie.lastPlayed === yesterday) {
        // played yesterday, increment
        const newStreak = cookie.streak + 1;
        setCookie({ streak: newStreak, lastPlayed: today });
        animateStreak();
        return newStreak;
    }

    // missed a day, reset
    setCookie({ streak: 1, lastPlayed: today });
    return 1;
}

export function refreshCookie() {
    const cookie = getCookie();
    if (cookie) setCookie(cookie); // rewrites same data with fresh expiry to make cookies last forever
}

export function hasPlayedToday() {
    const today = new Date().toDateString();
    const cookie = getCookie();
    if (!cookie) return false;
    return cookie.lastPlayed === today;
}

export function hasSeenDisclaimer() {
    return localStorage.getItem("seenDisclaimer") === "true";
}

export function setSeenDisclaimer() {
    localStorage.setItem("seenDisclaimer", "true");
}

export function hasDeclinedCookies() {
    return localStorage.getItem("cookiesDeclined") === "true";
}

export function setDeclinedCookies() {
    localStorage.setItem("cookiesDeclined", "true");
    const streakFlame = document.getElementById("streak-icon");
    if (streakFlame && streakFlame.classList.contains("animate")) {
        streakFlame.classList.remove("animate");
    }
}

export function deleteStreakCookie() {
    document.cookie = `${COOKIE_NAME}=; expires=Tue, 06 Jun 2006 00:00:00 UTC; path=/`; //haha guess who's birthday
    //... it couldn't be.. could it?
}
