'use strict';

const pairingSection = document.getElementById('pairing');
const courtList = document.getElementsByName('court_num');
const playerNumSelect = document.getElementById('playerNumSelect');
const courtNumSelect = document.getElementById('courtNumSelect');
const court_len = courtList.length;
let player_len;
let playerList;
let courtNum = -1;
let playerNum = -1;
let playerNumIndex;

const create = document.getElementById('create');
const reset = document.getElementById('reset');
const controller = document.getElementById('controller');
const element = document.documentElement;


const playerOptions = [
    [4, 5, 6, 7, 8, 9, 10, 11],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [12, 13, 14, 15, 16, 17, 18, 19],
    [16, 17, 18, 19, 20, 21, 22, 23],
];

courtNumSelect.addEventListener('change', () => {
    create.disabled = true;

    // 一度ラジオボタンのチェックを外す
    if (courtNum > 0) {
        courtList.item(courtNum - 1).checked = false;
    }

    // 人数の選択肢を削除
    while (playerNumSelect.firstChild) {
        playerNumSelect.removeChild(playerNumSelect.firstChild);
    }

    courtNum = countCourt(courtList, court_len);
    showPlayerOptions(courtNum);

    window.scrollTo({
        top: 350,
        left: 0,
        behavior: "smooth",
    });


    // 人数の選択肢リストの定義
    playerList = document.getElementsByName('player_num');
    player_len = playerList.length;

});

playerNumSelect.addEventListener('change', () => {
    // playerNumIndex = getPlayerNumIndex(playerList, player_len)
    playerNum = countPlayers(playerList, player_len);
    controller.classList.remove('hidden');
    create.disabled = false;

    window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth",
    });
});


create.addEventListener('click', () => {
    // 以前のゲーム表を削除
    if (pairingSection.firstChild) {
        while (pairingSection.firstChild) {
            pairingSection.removeChild(pairingSection.firstChild);
        }
    }

    generatePairings(courtNum, playerNum);

    window.scrollTo({
        top: 1000,
        left: 0,
        behavior: "smooth",
    });

    create.disabled = true;
    reset.disabled = false;
});

reset.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
    });
    window.location.reload();
});



// 人数選択肢の表示
function showPlayerOptions(courtNum) {

    // 質問の表示
    const legend = document.createElement('legend');
    legend.textContent = '人数は？';
    playerNumSelect.appendChild(legend);

    // 選択肢の作成
    const options = playerOptions[courtNum - 1];

    options.forEach((option) => {
        const label = document.createElement('label');
        const input = document.createElement('input');

        input.type = 'radio';
        input.name = 'player_num';
        input.id = 'player' + option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(' ' + option + '人'));
        playerNumSelect.appendChild(label);
    });
}

// コート数を取得
function countCourt(courtList, court_len) {
    for (let i = 0; i < court_len; i++) {
        if (courtList.item(i).checked) {
            const courtNum = parseInt(courtList.item(i).id.match(/[0-9]+/g));
            return courtNum;
        }
    }
}


// 人数を取得
function countPlayers(playerList, player_len) {
    for (let i = 0; i < player_len; i++) {
        if (playerList.item(i).checked) {
            const playerNum = parseInt(playerList.item(i).id.match(/[0-9]+/g));
            return playerNum;
        }
    }
}

// 人数選択肢のindexを取得
function getPlayerNumIndex(playerList, player_len) {
    for (let i = 0; i < player_len; i++) {
        if (playerList.item(i).checked) {
            const playerNumIndex = i;
            return playerNumIndex;
        }
    }
}




// ゲーム表作成
function generatePairings(courtNumValue, playerNumValue) {
    const section = document.getElementById('pairing');

    let waitingList = [];
    let waitingNum = 0;
    let idx;

    for (let i = 0; i < 20; i++) {
        let source = [];
        for (let j = 0; j < playerNumValue; j++) {
            source[j] = j + 1;
        }

        // 前試合の待機者を除くソースリストを作成
        for (let j = 0; j < waitingNum; j++) {
            source.splice(waitingList[j] - j - 1, 1);
        }
        console.log(source);
        
        // ソースリスト内をシャッフル
        let combination = [];
        for (let j = 0; j < (playerNumValue - waitingNum); j++) {
            combination[j] = source.splice(Math.floor(Math.random() * (source.length)), 1)[0];
        }

        // 前試合の待機者をソースリストの前半に挿入
        for (let j = 0; j < waitingNum; j++) {
            idx = Math.floor(Math.random() * (playerNumValue - waitingNum * 2 + j));
            combination.splice(idx, 0, waitingList[j]);
        }
        console.log(combination);


        let game = document.createElement('div');
        game.classList.add('game');

        let gameName = document.createElement('h3');
        gameName.textContent = i + 1;
        game.appendChild(gameName);


        // 各コートのプレイヤーを表示
        for (let j = 0; j < courtNumValue; j++) {
            let div = document.createElement('div');

            // ソースリストの0番目のプレイヤーから順に試合を割り当てる
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


        // 待機者の表示
        waitingList = [];   // 待機者リストを初期化

        if (combination.length > courtNumValue * 4) {
            const div_w = document.createElement('div');
            div_w.classList.add('waiting');
            const p = document.createElement('p');
            p.textContent = '待機者:'
            const ul = document.createElement('ul');

            for (let p = 0; p < (combination.length - courtNumValue * 4); p++) {
                let li = document.createElement('li');
                li.textContent = combination[combination.length - p - 1];
                ul.appendChild(li);

                waitingList.push(combination[combination.length - p - 1]);  // 待機者リストに待機者を追加
            };

            div_w.appendChild(p);
            div_w.appendChild(ul);
            game.appendChild(div_w);

            waitingList.sort(compareNumbers);   // 待機者リストをソート
            console.log(waitingList);
            waitingNum = waitingList.length;    // 待機人数を取得
        }

        section.appendChild(game);

    }
}

// ソート関数
function compareNumbers(a, b) {
    return a - b;
}


