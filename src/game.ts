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

/**
 * Initializes event listeners for game cards and the start button.
 * @returns {void}
 */
export function initGame() {
    dom.gameCards?.addEventListener('click', (event) => {
        const card = (event.target as HTMLElement).closest('.game__card');
        if (card instanceof HTMLButtonElement)
            toggleCard(card);
    });
    dom.settingsStartButton?.addEventListener('click', startGame);
}

/**
 * Creates and renders randomly selected game cards.
 * @param {{ id: number; image: string }[]} cards - Available game cards.
 * @returns {void}
 */
function createCards(cards: { id: number; image: string }[]) {
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    selectedCards = shuffledCards.slice(0, cardCount / 2);
    const gameCards = [...selectedCards, ...selectedCards];
    const selectedGameCards = [...gameCards].sort(() => Math.random() - 0.5);
    if (dom.gameCards) dom.gameCards.innerHTML = "";
    for (let index = 0; index < selectedGameCards.length; index++) {
        if (dom.gameCards) dom.gameCards.innerHTML += createCardTemplate(selectedGameCards[index]);
    }
}

/**
 * Flips a card and checks the pair when two cards are selected.
 * @param {HTMLButtonElement} card - The card to flip.
 * @returns {void}
 */
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

/**
 * Checks whether the flipped cards form a matching pair.
 * @returns {void}
 */
function checkPair() {
    const [firstCard, secondCard] = flippedCards;
    const firstId = firstCard.dataset.cardId;
    const secondId = secondCard.dataset.cardId;
    if (firstId === secondId) {
        handleMatchedPair(firstCard, secondCard);
        return;
    }
    isCheckingPair = true;
    pairTimeout = setTimeout(() => {
        resetFlippedCards(firstCard, secondCard);
    }, 1500);
}

/**
 * Marks a matching pair, awards a point, and checks if the game is complete.
 * @param {HTMLElement} firstCard - The first matched card.
 * @param {HTMLElement} secondCard - The second matched card.
 * @returns {void}
 */
function handleMatchedPair(firstCard: HTMLElement, secondCard: HTMLElement) {
    firstCard.classList.add('is-matched');
    secondCard.classList.add('is-matched');
    applyPlayerMatchClass(firstCard, secondCard);
    addPoint();
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === cardCount / 2) {
        setTimeout(() => {
            showResult(bluePoints, orangePoints, currentTheme);
        }, 3000);
    }
}

/**
 * Applies the current player's match class to both cards.
 * @param {HTMLElement} firstCard - The first matched card.
 * @param {HTMLElement} secondCard - The second matched card.
 * @returns {void}
 */
function applyPlayerMatchClass(firstCard: HTMLElement, secondCard: HTMLElement) {
    const playerClass = currentPlayer === "Blue" ? 'is-matched-blue' : 'is-matched-orange';
    firstCard.classList.add(playerClass);
    secondCard.classList.add(playerClass);
}

/**
 * Resets the flipped cards and switches to the next player.
 * @param {HTMLElement} firstCard - The first flipped card.
 * @param {HTMLElement} secondCard - The second flipped card.
 * @returns {void}
 */
function resetFlippedCards(firstCard: HTMLElement, secondCard: HTMLElement) {
    firstCard.classList.remove('is-flipped');
    secondCard.classList.remove('is-flipped');
    flippedCards = [];
    isCheckingPair = false;
    pairTimeout = null;
    switchPlayer();
}

/**
 * Awards a point to the current player and updates the score display.
 * @returns {void}
 */
function addPoint() {
    if (currentPlayer === "Blue") {
        bluePoints++;
        dom.bluePoints!.textContent = bluePoints.toString();
    } else {
        orangePoints++;
        dom.orangePoints!.textContent = orangePoints.toString();
    }
}

/**
 * Switches to the next player and updates the current player display.
 * @returns {void}
 */
function switchPlayer() {
    const nextPlayer = currentPlayer === "Blue" ? "Orange" : "Blue";
    setCurrentPlayer(nextPlayer);
    changeCurrentPlayer();
}

/**
 * Updates the current player icon based on the active theme.
 * @returns {void}
 */
function changeCurrentPlayer() {
    const themeSettings = getThemeSettings(currentTheme);
    if (!dom.gameCurrentPlayerIcon || !themeSettings) return;
    dom.gameCurrentPlayerIcon.src =
        currentPlayer === "Blue"
            ? themeSettings.playerIcons.Blue
            : themeSettings.playerIcons.Orange;
}

/**
 * Initializes and starts the game using the selected settings.
 * @returns {void}
 */
function startGame() {
    if (!currentTheme || !currentPlayer || !cardCount) return;
    const themeSettings = getThemeSettings(currentTheme);
    if (!themeSettings) return;
    resetGameState();
    resetGameDisplay();
    createCards(themeSettings.cards);
    applyGameTheme(themeSettings);
    changeCurrentPlayer();
}

/**
 * Resets the game state, clears pending timeouts, and resets scores.
 * @returns {void}
 */
function resetGameState() {
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
}

/**
 * Resets the score display and switches from settings to the game screen.
 * @returns {void}
 */
function resetGameDisplay() {
    dom.bluePoints!.textContent = "0";
    dom.orangePoints!.textContent = "0";
    dom.settings?.classList.add('d-none');
    dom.game?.classList.remove('d-none');
}

/**
 * Applies the selected game theme and updates popup elements.
 * @param {NonNullable<ReturnType<typeof getThemeSettings>>} themeSettings - The selected theme settings.
 * @returns {void}
 */
function applyGameTheme(
    themeSettings: NonNullable<ReturnType<typeof getThemeSettings>>) {
    dom.game?.classList.remove("game--code-vibes", "game--gaming");
    dom.game?.classList.add(themeSettings.className);
    setPopupTheme(themeSettings.classNamePopup);
    if (dom.popupExitButton) dom.popupExitButton.textContent = themeSettings.popupExitText;
    if (dom.popupBackButton) dom.popupBackButton.textContent = themeSettings.popupBackText;
}

/**
 * Resets the game state, scores, results, and game cards.
 * @returns {void}
 */
export function resetGame() {
    clearPairTimeout();
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

/**
 * Clears the pending pair timeout.
 * @returns {void}
 */
function clearPairTimeout() {
    if (pairTimeout !== null) {
        clearTimeout(pairTimeout);
        pairTimeout = null;
    }
}