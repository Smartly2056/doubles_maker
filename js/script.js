'use strict';

const pairingForm = document.getElementById('submit');
const pairingSection = document.getElementById('pairing');
const courtNums = document.getElementsByName('court_num');
const playerNumSelect = document.getElementById('playerNum');



let court_len = courtNums.length;
let courtNumValue = '';

for (let i = 0; i < court_len; i++) {
    courtNums.item(i).addEventListener('change', () => {
        updatePlayerOptions;

    });

    if (courtNums.item(i).checked) {
        courtNumValue = parseInt(courtNums.item(i).id.match(/[0-9]+/g));
        updatePlayerOptions;

        console.log()

        pairingForm.addEventListener('click', (e) => {
            e.preventDefault();
        
            let playerNums = document.getElementsByName('player_num');
            let player_len = playerNums.length;
            let playerNumValue = '';
            for (let i = 0; i < player_len; i++) {
                if (playerNums.item(i).checked) {
                    playerNumValue = parseInt(playerNums.item(i).value.match(/[0-9]+/g));
                }
            }
        });
    }
    
    
}


function updatePlayerOptions() {
    courtNumValue = parseInt(courtNums.item(i).id.match(/[0-9]+/g));
    const options = playerOptions[courtNumValue];

    options.forEach(option => {
        let playerOption = document.createElement('input');
        playerOption.type = 'radio';
        playerOption.textContent = option + '人';
        playerOption.id = 'player' + option;
        playerOption.name = 'player_num';
        playerNumSelect.appendChild(playerOption);
    });

}



const playerOptions = {
    1: [2, 4, 6, 8, 10],
    2: [4, 6, 8, 10, 12],
    3: [6, 8, 10, 12, 14]
};



