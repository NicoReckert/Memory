export const dom = {
    themeRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="theme"]')),
    playerRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="player"]')),
    sizeRadioButtons: Array.from(document.querySelectorAll('.settings__item input[name="size"]')),
    settingsSummaryLabels: Array.from(document.querySelectorAll('.settings__summary-label'))
};

export function initDom() {
    dom.themeRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const theme = radio.parentElement?.textContent?.trim() ?? '';
            setTheme(theme);
        });
    });

    dom.playerRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const player = radio.parentElement?.textContent?.trim() ?? '';
            setPlayer(player);
        });
    });

    dom.sizeRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const size = radio.parentElement?.textContent?.trim() ?? '';
            setSize(size);
        });
    });
}

function setTheme(theme: string) {
    dom.settingsSummaryLabels[0].textContent = theme;
}

function setPlayer(player: string) {
    dom.settingsSummaryLabels[1].textContent = player;
}

function setSize(size: string) {
    dom.settingsSummaryLabels[2].textContent = size;
}