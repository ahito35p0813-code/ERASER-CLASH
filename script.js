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

    game.level = level;

    setupGame();
    
}

/*==============================
プレイヤー表示
==============================*/

function createPlayer(id,name,hp){

    document.getElementById(id).innerHTML = `
        <strong>${name}</strong>
        <br>
        ❤️ ${hp}/20
        <div class="hpBar">
            <div class="hp"></div>
        </div>
    `;

}
/*==============================
ゲームデータ
==============================*/

const game = {

    level : "",

    turn : 1,

    deck : [],

    trash : [],

    players : []

};

/*==============================
ログ追加
==============================*/

function addLog(text){

    const log = document.getElementById("log");

    log.innerHTML += "<br>" + text;

    log.scrollTop = log.scrollHeight;

}

/*==============================
初期化
==============================*/

window.addEventListener("load",()=>{

    console.log("ERASER CLASH v0.1.0");

});
/*==============================
カードデータ
==============================*/

const cardData = [

    {
        name:"ぺんてるスマッシュ",
        type:"attack",
        damage:5,
        attribute:"シャーペン"
    },

    {
        name:"S20",
        type:"attack",
        damage:4,
        attribute:"シャーペン"
    },

    {
        name:"ステッドラー925-35",
        type:"attack",
        damage:2,
        attribute:"シャーペン",
        pierce:true
    },

    {
        name:"フリクションボールペン",
        type:"attack",
        damage:3,
        attribute:"ボールペン",
        ink:1
    },

    {
        name:"クルトガKS",
        type:"attack",
        damage:5,
        attribute:"シャーペン"
    }

];
/*==============================
山札生成
==============================*/

function createDeck(){

    game.deck = [];

    cardData.forEach(card => {

        // 今は各カードを2枚ずつ入れる
        game.deck.push({...card});
        game.deck.push({...card});

    });

    shuffleDeck();

}

/*==============================
山札シャッフル
==============================*/

function shuffleDeck(){

    for(let i = game.deck.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [game.deck[i], game.deck[j]] =
        [game.deck[j], game.deck[i]];

    }

}
/*==============================
初期手札
==============================*/

function drawCard(){

    if(game.deck.length === 0){

        addLog("山札がありません。");

        return null;

    }

    return game.deck.shift();

}

function setupGame(){

    game.deck = [];

    game.trash = [];

    game.players = [];

    createDeck();

    drawOpeningHand();

    renderHand();

console.log("初期手札", game.hand);

    addLog("山札を作成しました。");

    addLog("初期手札を2枚配りました。");

}
/*==============================
プレイヤーの手札
==============================*/

game.hand = [];

/*==============================
カードを引く
==============================*/

function drawToHand(){

    const card = drawCard();

    if(card){

        game.hand.push(card);

    }

}

/*==============================
初期手札
==============================*/

function drawOpeningHand(){

    game.hand = [];

    drawToHand();

    drawToHand();

}
/*==============================
カード表示
==============================*/

function renderHand(){

    const hand = document.getElementById("hand");

    hand.innerHTML = "";

    game.hand.forEach(card=>{

        hand.appendChild(createCard(card));

    });
alert("手札：" + game.hand.length);
}
/*==============================
カード生成
==============================*/

function createCard(card){

    const element = document.createElement("div");

    element.className = "card";

    if(card.type === "attack"){

        element.classList.add("cardAttack");

    }

    else if(card.type === "defense"){

        element.classList.add("cardDefense");

    }

    else if(card.type === "ability"){

        element.classList.add("cardAbility");

    }

    else if(card.type === "field"){

        element.classList.add("cardField");

    }

    element.innerHTML = `

        <div class="cardType">${getCardIcon(card.type)}</div>

        <div class="cardName">${card.name}</div>

        <div class="cardAttribute">

    ${getCardAttribute(card)}

</div>

<div class="cardPower">

    ${getCardPower(card)}

</div>

    `;

    return element;

}
/*==============================
カードアイコン
==============================*/

function getCardIcon(type){

    switch(type){

        case "attack":
            return "⚔️";

        case "defense":
            return "🛡️";

        case "ability":
            return "✨";

        case "field":
            return "🌍";

        default:
            return "❓";

    }

}
/*==============================
カード情報
==============================*/

function getCardPower(card){

    if(card.type === "attack"){

        return "ATK " + card.damage;

    }

    if(card.type === "defense"){

        return "HP " + card.hp;

    }

    return "";

}

function getCardAttribute(card){

    if(card.attribute){

        return card.attribute;

    }

    return "";

}