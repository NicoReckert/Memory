import { dom } from "./dom";

export function initPopup() {
    dom.gameExitButton?.addEventListener('click', openPopup);
    dom.popup?.addEventListener('click', backToGame);
    dom.popupWindow?.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    dom.popupBackButton?.addEventListener('click', backToGame);
    dom.popupExitButton?.addEventListener('click', backToSettings);

}

function openPopup() {
    dom.popup?.classList.remove('d-none');
    dom.popupWindow?.classList.add('popup__window--visible')
}

function backToGame() {
    dom.popup?.classList.add('popup--not-visible')
    setTimeout(() => {
        dom.popup?.classList.add('d-none');
        dom.popup?.classList.remove('popup--not-visible')
        dom.popupWindow?.classList.remove('popup__window--visible')
    }, 250);
}

function backToSettings() {
    dom.game?.classList.add('d-none');
    dom.settings?.classList.remove('d-none');
    backToGame();
}