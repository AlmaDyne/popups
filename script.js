'use strict';

import { randomInteger } from './function_storage.js';

const baseElem = document.getElementById('base-elem');
const MAX = 10;
let popupNumbers = [];
let n = 0;

for (let i = 1; i <= MAX; i++) {
    popupNumbers.push(i);
}

console.log(popupNumbers);

baseElem.onclick = startClick;

function startClick() {
    baseElem.innerHTML = '<p><b>Stop?..</b></p>';
    document.body.style.backgroundColor = '#7dfbff';

    baseElem.onclick = false;
    document.onclick = document.oncontextmenu = document.onkeydown = function() {
        if (n == MAX) return false;
        createPopUpWindow();
    };
}

function createPopUpWindow() {
    const popupWidth = 300;
    const popupHeight = 300;
    const popupLeft = randomInteger(0, window.screen.availWidth - popupWidth);
    const popupTop = randomInteger(0, window.screen.availHeight - popupHeight);

    let params = `width=${popupWidth},height=${popupHeight},left=${popupLeft},top=${popupTop}`;
    let popup = window.open('/', '', params);

    popup.document.write(`
        <title>Pop-up Window ${popupNumbers[0]}</title>
        <link rel="stylesheet" href="style.css">
        <body class="popup-style">
            <div class="time"><b>01:00</b></div>
            <div class="fig-anim"></div>
            <script async src="popup_script.js" type="module"></script>
        </body>
    `);

    popup.focus();
    popupNumbers.splice(0, 1);
    n++;

    console.log(popupNumbers);

    document.addEventListener('pointerdown', () => popup.focus());
}

window.addEventListener('message', function(event) {
    if (event.origin != window.origin) return;
  
    if (event.data === 'Pop-up window closed') {
        popupNumbers.unshift(n);
        n--;

        console.log(popupNumbers);
        
        if (n == 0) {
            baseElem.innerHTML = '<p><b>Just click!</b></p>';
            document.body.style.backgroundColor = '';

            document.onclick = document.oncontextmenu = document.onkeydown = false;
            baseElem.onclick = startClick;
        }
    }
});
