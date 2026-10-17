import { dom } from "./dom";
import themeCodeVibes from "./assets/img/theme-code-vibes.svg";
import themeGaming from "./assets/img/theme-gaming.svg";
import themePlaceholder from "./assets/img/theme-placeholder.svg";

export let cardCount: number = 0;
export let currentPlayer: string = "";
export let currentTheme: string = "";
const themeImages = [
    themeCodeVibes,
    themeGaming,
];

/**
 * Initializes theme, player, and game size settings, and registers the settings button event listener.
 * @returns {void}
 */
export function initSettings() {
    initThemeSettings();
    initPlayerSettings();
    initSizeSettings();
    dom.heroButton?.addEventListener('click', goToSettings);
}

/**
 * Initializes theme selection event listeners and updates the preview and start button.
 * @returns {void}
 */
function initThemeSettings() {
    dom.themeRadioButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            const theme = radio.parentElement?.textContent?.trim() ?? '';
            setTheme(theme);
            if (dom.settingsPreviewImg) dom.settingsPreviewImg.src = themeImages[index];
            currentTheme = theme;
            checkStartButton();
        });
    });
}

/**
 * Initializes player selection event listeners and updates the start button.
 * @returns {void}
 */
function initPlayerSettings() {
    dom.playerRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const player = radio.parentElement?.textContent?.trim() ?? '';
            setPlayer(player + " Player");
            currentPlayer = player;
            checkStartButton();
        });
    });
}

/**
 * Initializes event listeners for game size selection.
 * @returns {void}
 */
function initSizeSettings() {
    dom.sizeRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            updateBoardSize(radio);
        });
    });
}

/**
 * Updates the board size and checks the start button state.
 * @param {HTMLInputElement} radio - The selected size radio button.
 * @returns {void}
 */
function updateBoardSize(radio: HTMLInputElement) {
    const size = radio.parentElement?.textContent?.trim() ?? '';
    const formattedSize = size.replace('cards', 'Cards');
    setSize("Board-" + formattedSize);
    cardCount = Number(size.trim().split(" ")[0]);
    dom.gameCards?.classList.remove(
        "game__cards--16", "game__cards--24", "game__cards--36"
    );
    dom.gameCards?.classList.add(`game__cards--${cardCount}`);
    checkStartButton();
}

/**
 * Sets the current player.
 * @param {string} player - The player to set as current.
 * @returns {void}
 */
export function setCurrentPlayer(player: string) {
    currentPlayer = player;
}

/**
 * Updates the selected theme label.
 * @param {string} theme - The selected theme.
 * @returns {void}
 */
function setTheme(theme: string) {
    dom.settingsSummaryLabels[0].textContent = theme;
}

/**
 * Updates the selected player label.
 * @param {string} player - The selected player.
 * @returns {void}
 */
function setPlayer(player: string) {
    dom.settingsSummaryLabels[1].textContent = player;
}

/**
 * Updates the selected board size label.
 * @param {string} size - The selected board size.
 * @returns {void}
 */
function setSize(size: string) {
    dom.settingsSummaryLabels[2].textContent = size;
}

/**
 * Activates the start button when all required settings are selected.
 * @returns {void}
 */
function checkStartButton() {
    if (currentTheme && currentPlayer && cardCount) {
        setStartButtonActive();
    }
}

/**
 * Activates the start button by updating its CSS classes.
 * @returns {void}
 */
function setStartButtonActive() {
    dom.settingsStartButton?.classList.remove('settings__start-button--inactive');
    dom.settingsStartButton?.classList.add('settings__start-button--active');
}

/**
 * Hides the hero section and displays the settings screen.
 * @returns {void}
 */
function goToSettings() {
    dom.hero?.classList.add('d-none');
    dom.settings?.classList.remove('d-none');
}

/**
 * Resets all settings, selections, labels, preview, and board size classes.
 * @returns {void}
 */
export function resetSettings() {
    resetRadioButtons();
    currentTheme = "";
    currentPlayer = "";
    cardCount = 0;
    resetSettingsLabels();
    resetSettingsPreview();
    resetStartButton();
    resetBoardSizeClasses();
}

/**
 * Resets all theme, player, and board size radio buttons.
 * @returns {void}
 */
function resetRadioButtons() {
    dom.themeRadioButtons.forEach(radio => radio.checked = false);
    dom.playerRadioButtons.forEach(radio => radio.checked = false);
    dom.sizeRadioButtons.forEach(radio => radio.checked = false);
}

/**
 * Resets the settings summary labels to their default values.
 * @returns {void}
 */
function resetSettingsLabels() {
    dom.settingsSummaryLabels[0].textContent = "Theme";
    dom.settingsSummaryLabels[1].textContent = "Player";
    dom.settingsSummaryLabels[2].textContent = "Board size";
}

/**
 * Resets the settings preview image to its default placeholder.
 * @returns {void}
 */
function resetSettingsPreview() {
    if (dom.settingsPreviewImg) {
        dom.settingsPreviewImg.src = themePlaceholder;
    }
}

/**
 * Resets the start button to its inactive state.
 * @returns {void}
 */
function resetStartButton() {
    dom.settingsStartButton?.classList.remove("settings__start-button--active");
    dom.settingsStartButton?.classList.add("settings__start-button--inactive");
}

/**
 * Removes all board size CSS classes.
 * @returns {void}
 */
function resetBoardSizeClasses() {
    dom.gameCards?.classList.remove(
        "game__cards--16",
        "game__cards--24",
        "game__cards--36"
    );
}