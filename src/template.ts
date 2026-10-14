export function template1(currentCardBack: any, currentCard: any) {
    return `<button class="game__card" data-card-id="${currentCard.id}">
                <div class="game__card-inner">
                    <div class="game__card-face game__card-face--front">
                        <img src="${currentCardBack}" alt="">
                    </div>
                    <div class="game__card-face game__card-face--back">
                        <img src="${currentCard.image}" alt="">
                    </div>
                </div>
            </button>`;
}