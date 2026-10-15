import { dom } from "./dom";

let resultTimeout: ReturnType<typeof setTimeout> | null = null;

export function showResult(bluePoints: number, orangePoints: number, theme: string) {
    if (dom.resultBluePoints) {
        dom.resultBluePoints.textContent = bluePoints.toString();
    }
    if (dom.resultOrangePoints) {
        dom.resultOrangePoints.textContent = orangePoints.toString();
    }
    const isGaming = theme === "Gaming theme";
    dom.result?.classList.remove(
        'result--code-vibes',
        'result--gaming'
    );
    dom.result?.classList.add(
        isGaming ? 'result--gaming' : 'result--code-vibes'
    );
    dom.result?.classList.remove('d-none');
    dom.result?.classList.add('result--visible');
    resultTimeout = setTimeout(() => {
        dom.result?.classList.remove('result--visible');
        showWinner(bluePoints, orangePoints, theme);
        dom.winner?.classList.remove('d-none');
        dom.winner?.classList.add('winner--visible');
        resultTimeout = null;
    }, 5000);
}

function showWinner(bluePoints: number, orangePoints: number, theme: string) {
    if (!dom.winnerTitle || !dom.winnerIcon || !dom.winnerText) return;

    const isGaming = theme === "Gaming theme";

    if (dom.winnerSettingsButton) {
        dom.winnerSettingsButton.textContent = isGaming ? 'Home' : 'Back to start';
    }

    dom.winner?.classList.remove('winner--code-vibes', 'winner--gaming');
    dom.winner?.classList.add(isGaming ? 'winner--gaming' : 'winner--code-vibes');

    dom.winnerTitle.classList.remove(
        'winner__title--blue',
        'winner__title--orange',
        'winner__title--draw'
    );

    if (bluePoints > orangePoints) {
        dom.winnerText.textContent = isGaming ? 'The winner is' : 'The winner is';
        dom.winnerTitle.textContent = isGaming ? 'Blue Player' : 'BLUE PLAYER';
        dom.winnerTitle.classList.add('winner__title--blue');

        dom.winnerIcon.src = isGaming
            ? './src/assets/img/winner-player-gaming.svg'
            : './src/assets/img/winner-blue-player-code-vibes.svg';

    } else if (orangePoints > bluePoints) {
        dom.winnerText.textContent = isGaming ? 'The winner is' : 'The winner is';
        dom.winnerTitle.textContent = isGaming ? 'Orange Player' : 'ORANGE PLAYER';
        dom.winnerTitle.classList.add('winner__title--orange');

        dom.winnerIcon.src = isGaming
            ? './src/assets/img/winner-player-gaming.svg'
            : './src/assets/img/winner-orange-player-code-vibes.svg';

    } else {
        dom.winnerText.textContent = "It's a";
        dom.winnerTitle.textContent = 'DRAW';
        dom.winnerTitle.classList.add('winner__title--draw');

        dom.winnerIcon.src = isGaming
            ? './src/assets/img/winner-draw-gaming.svg'
            : './src/assets/img/winner-draw-code-vibes.svg';
    }
}

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