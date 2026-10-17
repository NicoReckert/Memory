const images = import.meta.glob<string>(
    "./assets/img/*.svg",
    { eager: true, query: "?url", import: "default" }
);

export const codeVibesCards = Array.from({ length: 18 }, (_, index) => {
    const id = index + 1;
    const number = String(id).padStart(2, "0");

    return {
        id,
        image: images[`./assets/img/code-vibes-${number}.svg`]
    };
});

export const gamingCards = Array.from({ length: 18 }, (_, index) => {
    const id = index + 1;
    const number = String(id).padStart(2, "0");

    return {
        id,
        image: images[`./assets/img/gaming-${number}.svg`]
    };
});