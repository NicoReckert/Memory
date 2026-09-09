import { template1 } from "./template";
import { cards } from "./template";

export const dom = {
    themeRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="theme"]')),
    playerRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="player"]')),
    sizeRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="size"]')),
    settingsSummaryLabels: Array.from(document.querySelectorAll('.settings__summary-label')),
    settingsPreviewImg: document.querySelector<HTMLImageElement>('.settings__preview-image'),
    gameCards: document.querySelector('.game__cards')
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
        });
    });

    dom.sizeRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const size = radio.parentElement?.textContent?.trim() ?? '';
            setSize(size);
        });
    });

    dom.gameCards?.addEventListener('click', (event) => {
        const card = (event.target as HTMLElement).closest('.game__card');
        if (card instanceof HTMLButtonElement)
            toggleCard(card);
    });
    createCards();
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
    selectedCards = shuffledCards.slice(0, 8);
    const gameCards = [...selectedCards, ...selectedCards];
    const selectedGameCards = [...gameCards].sort(() => Math.random() - 0.5)
    if (dom.gameCards) dom.gameCards.innerHTML = "";
    for (let index = 0; index < selectedGameCards.length; index++) {
        if (dom.gameCards) dom.gameCards.innerHTML += template1(selectedGameCards[index]);
    }
}