const cards = [
    { id: 1, image: "./src/assets/img/Property 1=Component 22.svg" },
    { id: 2, image: "./src/assets/img/Property 1=Component 22(0).svg" },
    { id: 3, image: "./src/assets/img/Property 1=Component 22(1).svg" },
    { id: 4, image: "./src/assets/img/Property 1=Component 22(2).svg" },
    { id: 5, image: "./src/assets/img/Property 1=Component 22(3).svg" },
    { id: 6, image: "./src/assets/img/Property 1=Component 22(4).svg" },
    { id: 7, image: "./src/assets/img/Property 1=Component 22(5).svg" },
    { id: 8, image: "./src/assets/img/Property 1=Component 22(6).svg" },
    { id: 9, image: "./src/assets/img/Property 1=Component 22(7).svg" },
    { id: 10, image: "./src/assets/img/Property 1=Component 22(8).svg" },
    { id: 11, image: "./src/assets/img/Property 1=Component 22(9).svg" },
    { id: 12, image: "./src/assets/img/Property 1=Component 22(10).svg" },
    { id: 13, image: "./src/assets/img/Property 1=Component 22(11).svg" },
    { id: 14, image: "./src/assets/img/Property 1=Component 22(12).svg" },
    { id: 15, image: "./src/assets/img/Property 1=Component 22(13).svg" },
    { id: 16, image: "./src/assets/img/Property 1=Component 22(14).svg" },
    { id: 17, image: "./src/assets/img/Property 1=Component 22(15).svg" },
    { id: 18, image: "./src/assets/img/Property 1=Component 22(16).svg" },
]


export function template1() {
    let curentCard = cards[Math.floor(Math.random() * cards.length)];
    return `<button class="game__card">
                <div class="game__card-inner">
                    <div class="game__card-face game__card-face--front">
                        <img src="./src/assets/img/Property 1=Component 21.svg" alt="">
                    </div>
                    <div class="game__card-face game__card-face--back">
                        <img src="${curentCard.image}" alt="">
                    </div>
                </div>
            </button>`;
}