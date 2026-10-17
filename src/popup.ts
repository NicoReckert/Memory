import { dom } from "./dom";
import { resetSettings } from "./settings";
import { resetGame } from "./game";

/**
 * Initializes event listeners for the game exit popup and navigation buttons.
 * @returns {void}
 */
export function initPopup() {
    dom.gameExitButton?.addEventListener('click', openPopup);
    dom.popup?.addEventListener('click', backToGame);
    dom.popupWindow?.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    dom.popupBackButton?.addEventListener('click', backToGame);
    dom.popupExitButton?.addEventListener('click', backToSettings);
    dom.winnerSettingsButton?.addEventListener('click', backToSettings);
}

/**
 * Opens the exit popup.
 * @returns {void}
 */
function openPopup() {
    dom.popup?.classList.remove('d-none');
    dom.popupWindow?.classList.add('popup__window--visible');
}

/**
 * Closes the popup and hides it after a short transition.
 * @returns {void}
 */
function backToGame() {
    dom.popup?.classList.add('popup--not-visible');
    setTimeout(() => {
        dom.popup?.classList.add('d-none');
        dom.popup?.classList.remove('popup--not-visible');
        dom.popupWindow?.classList.remove('popup__window--visible');
    }, 250);
}

/**
 * Resets the game and settings, returns to the settings screen, and closes the popup.
 * @returns {void}
 */
function backToSettings() {
    resetGame();
    resetSettings();
    dom.game?.classList.add('d-none');
    dom.settings?.classList.remove('d-none');
    backToGame();
}

/**
 * Applies the specified theme class to the popup.
 * @param {string} classNamePopup - The popup theme class.
 * @returns {void}
 */
export function setPopupTheme(classNamePopup: string) {
    dom.popup?.classList.remove("popup--code-vibes", "popup--gaming");
    dom.popup?.classList.add(classNamePopup);
}