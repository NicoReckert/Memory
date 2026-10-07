import { dom } from "./dom";
import { template1 } from "./template";
import { cardCount, currentPlayer, currentTheme, setCurrentPlayer } from "./settings";
import { codeVibesCards, gamingCards } from "./cards";

let flippedCards: HTMLButtonElement[] = [];
let isCheckingPair = false;
let bluePoints = 0;
let orangePoints = 0;
let matchedPairs = 0;
let shuffledCards = [];
let selectedCards = [];

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
        if (dom.gameCards) dom.gameCards.innerHTML += template1(selectedGameCards[index]);
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
        return;
    }
    isCheckingPair = true;
    setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        flippedCards = [];
        isCheckingPair = false;
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
    if (dom.gameCurrentPlayerIcon) dom.gameCurrentPlayerIcon.src = currentPlayer === "Blue" ? "./src/assets/icons/label.svg" : "./src/assets/icons/label(1).svg";
}

function startGame() {
    if (!currentTheme || !currentPlayer || !cardCount) return;
    bluePoints = 0;
    orangePoints = 0;
    matchedPairs = 0;
    dom.bluePoints!.textContent = "0";
    dom.orangePoints!.textContent = "0";
    dom.settings?.classList.add('d-none');
    dom.game?.classList.remove('d-none');
    let currentCards = currentTheme === "Code vibes theme" ? codeVibesCards : gamingCards;
    createCards(currentCards);
    changeCurrentPlayer();
}