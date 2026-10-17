import { codeVibesCards, gamingCards } from "./cards";

const themes = {
    "Code vibes theme": {
        cardBackSrc: "./src/assets/img/card-back-code-vibes.svg",
        cards: codeVibesCards,
        className: "game--code-vibes",
        classNamePopup: "popup--code-vibes",
        popupBackText: "Back to game",
        popupExitText: "Exit game",
        playerIcons: {
            Blue: "./src/assets/icons/blue-player-label-code-vibes.svg",
            Orange: "./src/assets/icons/orange-player-label-code-vibes.svg"
        }
    },
    "Gaming theme": {
        cardBackSrc: "./src/assets/img/card-back-gaming.svg",
        cards: gamingCards,
        className: "game--gaming",
        classNamePopup: "popup--gaming",
        popupBackText: "No, back to game",
        popupExitText: "Yes, quit game",
        playerIcons: {
            Blue: "./src/assets/icons/current-player-label-blue-gaming.svg",
            Orange: "./src/assets/icons/current-player-label-orange-gaming.svg"
        }
    }
};

/**
 * Returns the settings for the specified theme.
 * @param {string} theme - The theme name.
 * @returns {typeof themes[keyof typeof themes] | undefined} The theme settings, or undefined if not found.
 */
export function getThemeSettings(theme: string) {
    return themes[theme as keyof typeof themes];
}