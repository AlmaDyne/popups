'use strict';

import { shuffle } from './function_storage.js';

const numbers = '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f';
let colorCode = numbers.split(', ');
shuffle(colorCode);
document.body.style.backgroundColor = '#' + colorCode.slice(0, 6).join('');
document.body.style.color = '#' + colorCode.slice(4, 10).join('');
document.querySelector('.time').style.backgroundColor = '#' + colorCode.slice(6, 12).join('');
document.querySelector('.time').style.color = '#' + colorCode.slice(10, 16).join('');
document.querySelector('.fig-anim').style.backgroundColor = '#' + colorCode.slice(8, 14).join('');

showTimeLeft();

let x = (Math.random() >= 0.5 ? 1 : -1) * 1,
    y = (Math.random() >= 0.5 ? 1 : -1) * 1;

let moveTimer = setInterval(() => {
    if (window.screenX >= window.screen.availWidth - window.outerWidth) x = -x;
    if (window.screenX <= 0) x = -x;
    if (window.screenY >= window.screen.availHeight - window.outerHeight) y = -y;
    if (window.screenY <= 0) y = -y;

    window.moveBy(x, y);
}, 1);

function showTimeLeft() {
    const timeStart = document.querySelector('.time > b').innerHTML.split(':');
    let mins = timeStart[0];
    let secs = timeStart[1];

    if (secs > 59) {
        mins = +mins + Math.floor(secs / 60);
        if (mins < 10) mins = '0' + mins;

        secs = secs % 60;
        if (secs < 10) secs = '0' + secs;
    }

    if (mins > 60) mins = 60;

    document.querySelector('.time > b').innerHTML = `${mins}:${secs}`;

    let countdownTimer = setInterval(function countdown() {
        if (secs == 0) {
            if (mins == 0) {
                clearInterval(moveTimer);
                clearInterval(countdownTimer);

                document.body.innerHTML = '<b>The pop-up window is closing!</b>';
                console.log('The pop-up window is closing!');

                setTimeout(() => window.close(), 1e3);
            } else {
                mins--;
                if (mins < 10) mins = '0' + mins;
                secs = 59;

                document.querySelector('.time > b').innerHTML = `${mins}:${secs}`;
                console.log(`Time left: ${mins}:${secs}`);
            }
        } else {
            secs--;
            if (secs < 10) secs = '0' + secs;

            document.querySelector('.time > b').innerHTML = `${mins}:${secs}`;
            console.log(`Time left: ${mins}:${secs}`);
        }
    }, 1e3);
}

window.onunload = function() {
    window.opener.postMessage('Pop-up window closed', '*');
};
