import { dom } from "./dom";
import winnerPlayerGaming from "./assets/img/winner-player-gaming.svg";
import winnerBlueCodeVibes from "./assets/img/winner-blue-player-code-vibes.svg";
import winnerOrangeCodeVibes from "./assets/img/winner-orange-player-code-vibes.svg";
import winnerDrawGaming from "./assets/img/winner-draw-gaming.svg";
import winnerDrawCodeVibes from "./assets/img/winner-draw-code-vibes.svg";

let resultTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Displays the game result and schedules the result screen transition.
 * @param {number} bluePoints - The blue player's score.
 * @param {number} orangePoints - The orange player's score.
 * @param {string} theme - The active game theme.
 * @returns {void}
 */
export function showResult(bluePoints: number, orangePoints: number, theme: string) {
    if (dom.resultBluePoints) dom.resultBluePoints.textContent = bluePoints.toString();
    if (dom.resultOrangePoints) dom.resultOrangePoints.textContent = orangePoints.toString();
    const isGaming = theme === "Gaming theme";
    dom.result?.classList.remove('result--code-vibes', 'result--gaming');
    dom.result?.classList.add(isGaming ? 'result--gaming' : 'result--code-vibes');
    dom.result?.classList.remove('d-none');
    dom.result?.classList.add('result--visible');
    resultTimeout = setTimeout(() => {
        finishResult(bluePoints, orangePoints, theme);
    }, 5000);
}

/**
 * Hides the result screen and displays the winner screen.
 * @param {number} bluePoints - The blue player's score.
 * @param {number} orangePoints - The orange player's score.
 * @param {string} theme - The active game theme.
 * @returns {void}
 */
function finishResult(bluePoints: number, orangePoints: number, theme: string) {
    dom.result?.classList.remove('result--visible');
    showWinner(bluePoints, orangePoints, theme);
    dom.winner?.classList.remove('d-none');
    dom.winner?.classList.add('winner--visible');
    resultTimeout = null;
}

/**
 * Displays the winner or draw based on the players' scores and applies the theme.
 * @param {number} bluePoints - The blue player's score.
 * @param {number} orangePoints - The orange player's score.
 * @param {string} theme - The active game theme.
 * @returns {void}
 */
function showWinner(bluePoints: number, orangePoints: number, theme: string) {
    if (!dom.winnerTitle || !dom.winnerIcon || !dom.winnerText) return;
    const isGaming = theme === "Gaming theme";
    if (dom.winnerSettingsButton) dom.winnerSettingsButton.textContent = isGaming ? 'Home' : 'Back to start';
    applyWinnerTheme(isGaming);
    resetWinnerTitleClasses();
    if (bluePoints > orangePoints) {
        showBlueWinner(isGaming);
    } else if (orangePoints > bluePoints) {
        showOrangeWinner(isGaming);
    } else {
        showDraw(isGaming);
    }
}

/**
 * Applies the appropriate winner screen theme.
 * @param {boolean} isGaming - Whether the gaming theme is active.
 * @returns {void}
 */
function applyWinnerTheme(isGaming: boolean) {
    dom.winner?.classList.remove('winner--code-vibes', 'winner--gaming');
    dom.winner?.classList.add(isGaming ? 'winner--gaming' : 'winner--code-vibes');
}

/**
 * Removes all winner title styling classes.
 * @returns {void}
 */
function resetWinnerTitleClasses() {
    dom.winnerTitle!.classList.remove(
        'winner__title--blue',
        'winner__title--orange',
        'winner__title--draw'
    );
}

/**
 * Displays the blue player as the winner.
 * @param {boolean} isGaming - Whether the gaming theme is active.
 * @returns {void}
 */
function showBlueWinner(isGaming: boolean) {
    dom.winnerText!.textContent = 'The winner is';
    dom.winnerTitle!.textContent = isGaming ? 'Blue Player' : 'BLUE PLAYER';
    dom.winnerTitle!.classList.add('winner__title--blue');
    dom.winnerIcon!.src = isGaming
        ? winnerPlayerGaming
        : winnerBlueCodeVibes;
}

/**
 * Displays the orange player as the winner.
 * @param {boolean} isGaming - Whether the gaming theme is active.
 * @returns {void}
 */
function showOrangeWinner(isGaming: boolean) {
    dom.winnerText!.textContent = 'The winner is';
    dom.winnerTitle!.textContent = isGaming ? 'Orange Player' : 'ORANGE PLAYER';
    dom.winnerTitle!.classList.add('winner__title--orange');
    dom.winnerIcon!.src = isGaming
        ? winnerPlayerGaming
        : winnerOrangeCodeVibes;
}

/**
 * Displays a draw when both players have the same score.
 * @param {boolean} isGaming - Whether the gaming theme is active.
 * @returns {void}
 */
function showDraw(isGaming: boolean) {
    dom.winnerText!.textContent = "It's a";
    dom.winnerTitle!.textContent = 'DRAW';
    dom.winnerTitle!.classList.add('winner__title--draw');
    dom.winnerIcon!.src = isGaming
        ? winnerDrawGaming
        : winnerDrawCodeVibes;
}

/**
 * Resets the result and winner screens and clears the pending timeout.
 * @returns {void}
 */
export function resetResult() {
    if (resultTimeout !== null) {
        clearTimeout(resultTimeout);
        resultTimeout = null;
    }
    dom.result?.classList.remove('result--visible');
    dom.winner?.classList.remove('winner--visible');
    dom.result?.classList.add('d-none');
    dom.winner?.classList.add('d-none');
}