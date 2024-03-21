'use strict';

const courtNumValue = 3;
const playerNumValue = 13;
const section = document.querySelector('section');


for (let i = 0; i < 5; i++) {
    let source = [];
    for (let j = 0; j < playerNumValue; j++) {
        source[j] = j + 1;
    }

    let combination = [];
    for (let j = 0; j < playerNumValue; j++) {
        combination[j] = source.splice(Math.floor(Math.random() * (source.length)), 1)[0];
    }

    let game = document.createElement('div');
    game.classList.add('game');

    let gameName = document.createElement('h3');
    gameName.textContent = i + 1;
    game.appendChild(gameName);


    for (let j = 0; j < courtNumValue; j++) {
        let div = document.createElement('div');

        for (let k = 0; k < 4; k++) {
            let span = document.createElement('span');
            span.textContent = combination[j * 4 + k];
            span.classList.add('player');
            div.appendChild(span);

            if (k == 1) {
                let vsSpan = document.createElement('span');
                vsSpan.textContent = 'vs';
                div.appendChild(vsSpan);
            }


        }

        game.appendChild(div);
    }

    section.appendChild(game);

    console.log(combination);
    console.log(section);

}



