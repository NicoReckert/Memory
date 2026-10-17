import { codeVibesCards, gamingCards } from "./cards";
import bluePlayerCodeVibes from "./assets/icons/blue-player-label-code-vibes.svg";
import orangePlayerCodeVibes from "./assets/icons/orange-player-label-code-vibes.svg";
import bluePlayerGaming from "./assets/icons/current-player-label-blue-gaming.svg";
import orangePlayerGaming from "./assets/icons/current-player-label-orange-gaming.svg";

const themes = {
    "Code vibes theme": {
        cards: codeVibesCards,
        className: "game--code-vibes",
        classNamePopup: "popup--code-vibes",
        popupBackText: "Back to game",
        popupExitText: "Exit game",
        playerIcons: {
            Blue: bluePlayerCodeVibes,
            Orange: orangePlayerCodeVibes
        }
    },
    "Gaming theme": {
        cards: gamingCards,
        className: "game--gaming",
        classNamePopup: "popup--gaming",
        popupBackText: "No, back to game",
        popupExitText: "Yes, quit game",
        playerIcons: {
            Blue: bluePlayerGaming,
            Orange: orangePlayerGaming
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