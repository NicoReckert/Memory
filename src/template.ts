/**
 * Generates the HTML template for a game card.
 * @param {any} currentCard - The card data containing its ID and image URL.
 * @returns {string} The HTML template for the game card.
 */
export function createCardTemplate(currentCard: any) {
    return `<button class="game__card" data-card-id="${currentCard.id}">
                <div class="game__card-inner">
                    <div class="game__card-face game__card-face--front">
                        <img class="game__card-front-icon" src="./src/assets/icons/card-back-code-vibes-icon.svg" alt="">
                    </div>
                    <div class="game__card-face game__card-face--back">
                        <img src="${currentCard.image}" alt="">
                    </div>
                </div>
            </button>`;
}