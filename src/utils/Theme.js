export const THEMES_LIST = ["light", "light-contrast", "dark", "dark-contrast"];

export function getColourTheme() {
    const theme = localStorage.getItem("theme");

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
