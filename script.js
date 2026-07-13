"use strict";

/*==============================
画面
==============================*/

const titleScreen = document.getElementById("titleScreen");
const difficultyScreen = document.getElementById("difficultyScreen");
const gameScreen = document.getElementById("gameScreen");

/*==============================
ボタン
==============================*/

const cpuButton = document.getElementById("cpuButton");
const difficultyButtons = document.querySelectorAll(".difficulty");

/*==============================
タイトル → 難易度
==============================*/

cpuButton.addEventListener("click", () => {

    titleScreen.classList.add("hidden");

    difficultyScreen.classList.remove("hidden");

});

/*==============================
難易度 → ゲーム
==============================*/

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyScreen.classList.add("hidden");

        gameScreen.classList.remove("hidden");

        startGame(button.dataset.level);

    });

});
/*==============================
ゲーム開始
==============================*/

function startGame(level){

    createPlayer("player","あなた",20);

    createPlayer("cpu1","CPU1",20);

    createPlayer("cpu2","CPU2",20);

    createPlayer("cpu3","CPU3",20);

    createPlayer("cpu4","CPU4",20);

    document.getElementById("log").innerHTML =

        "<b>ERASER CLASH</b><br><br>" +

        "ゲーム開始！<br>" +

        "CPUレベル：" + level;

}

/*==============================
プレイヤー表示
==============================*/

function createPlayer(id,name,hp){

    document.getElementById(id).innerHTML =

    `
        <strong>${name}</strong>

        <br>

        ❤️ ${hp}/20

        <div class="hpBar">

            <div class="hp"></div>

        </div>
    `;

}
/*==============================
初期データ
==============================*/

const game = {

    turn:1,

    deck:[],

    trash:[],

    players:[]

};

/*==============================
ログ
==============================*/

function addLog(text){

    const log = document.getElementById("log");

    log.innerHTML += "<br>" + text;

    log.scrollTop = log.scrollHeight;

}

/*==============================
今後追加する処理
==============================*/

// v0.2
// 山札生成

// v0.3
// 初期手札2枚

// v0.4
// ターン開始

// v0.5
// 攻カード

// v0.6
// 防カード

// v0.7
// 能カード

// v0.8
// 場カード

// v0.9
// CPU思考

// v1.0
// 勝敗判定

console.log("ERASER CLASH v0.1.0 Ready");