export const THEMES_LIST = [
    "light",
    "dark",
    "haxer",
    "blue",
    "red",
    "sketch",
    "frutiger-aero",
    "light-contrast",
    "dark-contrast",
];

export function getColourTheme() {
    let theme = localStorage.getItem("theme");

    if (!theme) {
        theme = THEMES_LIST[0];
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
    }

    return theme;
}

export function setColourTheme(theme) {
    if (!THEMES_LIST.includes(theme)) return false;
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
}
