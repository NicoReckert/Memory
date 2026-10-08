export function template1(curentCard: any) {
    return `<button class="game__card" data-card-id="${curentCard.id}">
                <div class="game__card-inner">
                    <div class="game__card-face game__card-face--front">
                        <img src="./src/assets/img/card-back-code-vibes.svg" alt="">
                    </div>
                    <div class="game__card-face game__card-face--back">
                        <img src="${curentCard.image}" alt="">
                    </div>
                </div>
            </button>`;
}