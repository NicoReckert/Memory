import { dom } from "./dom";

export let cardCount: number = 0;
export let currentPlayer: string = "";
export let currentTheme: string = "";
const themeImages = [
    "theme-code-vibes.svg",
    "theme-gaming.svg",
];

export function initSettings() {
    dom.themeRadioButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            const theme = radio.parentElement?.textContent?.trim() ?? '';
            setTheme(theme);
            if (dom.settingsPreviewImg) dom.settingsPreviewImg.src = `./src/assets/img/${themeImages[index]}`;
            currentTheme = theme;
            checkStartButton();
        });
    });

    dom.playerRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const player = radio.parentElement?.textContent?.trim() ?? '';
            setPlayer(player + " Player");
            currentPlayer = player;
            checkStartButton();
        });
    });

    dom.sizeRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const size = radio.parentElement?.textContent?.trim() ?? '';
            const formattedSize = size.replace('cards', 'Cards');
            setSize("Board-" + formattedSize);
            cardCount = Number(size.trim().split(" ")[0]);
            dom.gameCards?.classList.remove(
                "game__cards--16",
                "game__cards--24",
                "game__cards--36"
            );
            dom.gameCards?.classList.add(`game__cards--${cardCount}`);
            checkStartButton();
        });
    });
    dom.heroButton?.addEventListener('click', gotToSettings);
}

export function setCurrentPlayer(player: string) {
    currentPlayer = player;
}

function setTheme(theme: string) {
    dom.settingsSummaryLabels[0].textContent = theme;
}

function setPlayer(player: string) {
    dom.settingsSummaryLabels[1].textContent = player;
}

function setSize(size: string) {
    dom.settingsSummaryLabels[2].textContent = size;
}

function checkStartButton() {
    if (currentTheme && currentPlayer && cardCount) {
        setStartButtonActive();
    }
}

function setStartButtonActive() {
    dom.settingsStartButton?.classList.remove('settings__start-button--inactive');
    dom.settingsStartButton?.classList.add('settings__start-button--active');
}

function gotToSettings() {
    dom.hero?.classList.add('d-none');
    dom.settings?.classList.remove('d-none');
}