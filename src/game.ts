import { dom } from "./dom";
import { createCardTemplate } from "./template";
import { cardCount, currentPlayer, currentTheme, setCurrentPlayer } from "./settings";
import { getThemeSettings } from "./theme";
import { setPopupTheme } from "./popup";
import { showResult, resetResult } from "./result";

let flippedCards: HTMLButtonElement[] = [];
let isCheckingPair = false;
let bluePoints = 0;
let orangePoints = 0;
let matchedPairs = 0;
let shuffledCards = [];
let selectedCards = [];
let pairTimeout: ReturnType<typeof setTimeout> | null = null;

export function initGame() {
    dom.gameCards?.addEventListener('click', (event) => {
        const card = (event.target as HTMLElement).closest('.game__card');
        if (card instanceof HTMLButtonElement)
            toggleCard(card);
    });
    dom.settingsStartButton?.addEventListener('click', startGame);
}

function createCards(cards: { id: number; image: string }[]) {
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    selectedCards = shuffledCards.slice(0, cardCount / 2);
    const gameCards = [...selectedCards, ...selectedCards];
    const selectedGameCards = [...gameCards].sort(() => Math.random() - 0.5)
    if (dom.gameCards) dom.gameCards.innerHTML = "";
    for (let index = 0; index < selectedGameCards.length; index++) {
        if (dom.gameCards) dom.gameCards.innerHTML += createCardTemplate(selectedGameCards[index]);
    }
}

function toggleCard(card: HTMLButtonElement) {
    if (isCheckingPair) return;
    if (card.classList.contains('is-flipped')) return;
    if (card.classList.contains('is-matched')) return;
    card.classList.add('is-flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        checkPair();
    }
}

function checkPair() {
    const [firstCard, secondCard] = flippedCards;
    const firstId = firstCard.dataset.cardId;
    const secondId = secondCard.dataset.cardId;
    if (firstId === secondId) {
        firstCard.classList.add('is-matched');
        secondCard.classList.add('is-matched');
        addPoint();
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardCount / 2) {
            setTimeout(() => {
                showResult(bluePoints, orangePoints, currentTheme);
            }, 3000);
        }
        return;
    }
    isCheckingPair = true;
    pairTimeout = setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        flippedCards = [];
        isCheckingPair = false;
        pairTimeout = null;
        switchPlayer();
    }, 1500);
}

function addPoint() {
    if (currentPlayer === "Blue") {
        bluePoints++;
        dom.bluePoints!.textContent = bluePoints.toString();
    } else {
        orangePoints++;
        dom.orangePoints!.textContent = orangePoints.toString();
    }
}

function switchPlayer() {
    const nextPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
    setCurrentPlayer(nextPlayer);
    changeCurrentPlayer();
}

function changeCurrentPlayer() {
    const themeSettings = getThemeSettings(currentTheme);
    if (!dom.gameCurrentPlayerIcon || !themeSettings) return;
    dom.gameCurrentPlayerIcon.src =
        currentPlayer === "Blue"
            ? themeSettings.playerIcons.Blue
            : themeSettings.playerIcons.Orange;
}

function startGame() {
    if (!currentTheme || !currentPlayer || !cardCount) return;
    const themeSettings = getThemeSettings(currentTheme);
    if (!themeSettings) return
    resetResult();
    if (pairTimeout !== null) {
        clearTimeout(pairTimeout);
        pairTimeout = null;
    }
    flippedCards = [];
    isCheckingPair = false;
    bluePoints = 0;
    orangePoints = 0;
    matchedPairs = 0;
    dom.bluePoints!.textContent = "0";
    dom.orangePoints!.textContent = "0";
    dom.settings?.classList.add('d-none');
    dom.game?.classList.remove('d-none');
    createCards(themeSettings.cards);
    dom.game?.classList.remove("game--code-vibes", "game--gaming");
    dom.game?.classList.add(themeSettings.className);
    setPopupTheme(themeSettings.classNamePopup);
    if (dom.popupExitButton) dom.popupExitButton.textContent = themeSettings.popupExitText;
    if (dom.popupBackButton) dom.popupBackButton.textContent = themeSettings.popupBackText;
    changeCurrentPlayer();
}

export function resetGame() {
    if (pairTimeout !== null) {
        clearTimeout(pairTimeout);
        pairTimeout = null;
    }
    resetResult();
    flippedCards = [];
    isCheckingPair = false;
    bluePoints = 0;
    orangePoints = 0;
    matchedPairs = 0;
    if (dom.bluePoints) dom.bluePoints.textContent = "0";
    if (dom.orangePoints) dom.orangePoints.textContent = "0";
    if (dom.resultBluePoints) dom.resultBluePoints.textContent = "0";
    if (dom.resultOrangePoints) dom.resultOrangePoints.textContent = "0";
    dom.gameCards?.replaceChildren();
}