import { template1 } from "./template";
import { cards } from "./template";

let cardCount: number = 16;
let currentPlayer: string = "Blue";

export const dom = {
    themeRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="theme"]')),
    playerRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="player"]')),
    sizeRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="size"]')),
    settingsSummaryLabels: Array.from(document.querySelectorAll('.settings__summary-label')),
    settingsPreviewImg: document.querySelector<HTMLImageElement>('.settings__preview-image'),
    gameCards: document.querySelector('.game__cards'),
    hero: document.getElementById('hero'),
    heroButton: document.getElementById('hero-button'),
    settings: document.getElementById('settings'),
    settingsStartButton: document.getElementById('settings-start-button'),
    game: document.getElementById('game'),
    gameExitButton: document.getElementById('game-exit-button'),
    gameCurrentPlayerIcon: document.getElementById('game-current-player-icon') as HTMLImageElement
};

export function initDom() {
    dom.themeRadioButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            const theme = radio.parentElement?.textContent?.trim() ?? '';
            setTheme(theme);
            if (dom.settingsPreviewImg) dom.settingsPreviewImg.src = `./src/assets/img/Theme Visual(${index + 1}).svg`;
        });
    });

    dom.playerRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const player = radio.parentElement?.textContent?.trim() ?? '';
            setPlayer(player);
            currentPlayer = player;
            console.log(currentPlayer);
        });
    });

    dom.sizeRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const size = radio.parentElement?.textContent?.trim() ?? '';
            setSize(size);
            cardCount = Number(size.trim().split(" ")[0]);
            dom.gameCards?.classList.remove(
                "game__cards--16",
                "game__cards--24",
                "game__cards--36"
            );
            dom.gameCards?.classList.add(`game__cards--${cardCount}`);
        });
    });

    dom.gameCards?.addEventListener('click', (event) => {
        const card = (event.target as HTMLElement).closest('.game__card');
        if (card instanceof HTMLButtonElement)
            toggleCard(card);
    });

    dom.heroButton?.addEventListener('click', gotToSettings);
    dom.settingsStartButton?.addEventListener('click', startGame);
    dom.gameExitButton?.addEventListener('click', backToSettings);
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

function toggleCard(card: HTMLButtonElement) {
    card.classList.toggle('is-flipped');
}

let shuffledCards = [];
let selectedCards = [];

function createCards() {
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    selectedCards = shuffledCards.slice(0, cardCount / 2);
    const gameCards = [...selectedCards, ...selectedCards];
    const selectedGameCards = [...gameCards].sort(() => Math.random() - 0.5)
    if (dom.gameCards) dom.gameCards.innerHTML = "";
    for (let index = 0; index < selectedGameCards.length; index++) {
        if (dom.gameCards) dom.gameCards.innerHTML += template1(selectedGameCards[index]);
    }
}

function gotToSettings() {
    dom.hero?.classList.add('d-none');
    dom.settings?.classList.remove('d-none');
}

function startGame() {
    dom.settings?.classList.add('d-none');
    dom.game?.classList.remove('d-none');
    createCards();
    changeCurrentPlayer();
}

function backToSettings() {
    dom.game?.classList.add('d-none');
    dom.settings?.classList.remove('d-none');
}

function changeCurrentPlayer() {
    if (dom.gameCurrentPlayerIcon) dom.gameCurrentPlayerIcon.src = currentPlayer === "Blue" ? "./src/assets/icons/label.svg" : "./src/assets/icons/label(1).svg";
}