"use strict";

/*====================================
ERASER CLASH
Version 0.2.0
====================================*/

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
const difficultyButtons =
document.querySelectorAll(".difficulty");

/*==============================
ゲームデータ
==============================*/

const game = {

    level : "",

    turn : 1,

    deck : [],

    trash : [],

    hand : [],

    players : []

};

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
画面切り替え
==============================*/

cpuButton.addEventListener("click",()=>{

    titleScreen.classList.add("hidden");

    difficultyScreen.classList.remove("hidden");

});

difficultyButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        game.level = button.dataset.level;

        difficultyScreen.classList.add("hidden");

        gameScreen.classList.remove("hidden");

        startGame();

    });

});

/*==============================
ゲーム開始
==============================*/

function startGame(){

    createRandomErasers();

    updatePlayers();

    createDeck();

    drawOpeningHand();

    renderHand();

    addLog("ゲーム開始！");
    addLog("CPUレベル：" + game.level);

}

/*==============================
プレイヤー作成
==============================*/

function createPlayers(){

    game.players = [

        {
            id:"player",
            name:"あなた",
            hp:20,
            maxHp:20
        },

        {
            id:"cpu1",
            name:"CPU1",
            hp:20,
            maxHp:20
        },

        {
            id:"cpu2",
            name:"CPU2",
            hp:20,
            maxHp:20
        },

        {
            id:"cpu3",
            name:"CPU3",
            hp:20,
            maxHp:20
        },

        {
            id:"cpu4",
            name:"CPU4",
            hp:20,
            maxHp:20
        }

    ];

    game.players.forEach(player=>{

        renderPlayer(player);

    });

}

/*==============================
プレイヤー表示
==============================*/

function renderPlayer(player){

    const element=document.getElementById(player.id);

    element.innerHTML=`

        <strong>${player.name}</strong>

        <br>

        ❤️ ${player.hp}/${player.maxHp}

        <br>

        <small style="font-size:10px;color:#9fe9ff;">

            ${player.ability}

        </small>

        <div class="hpBar">

            <div class="hp"
                 style="width:${player.hp/player.maxHp*100}%;">
            </div>

        </div>

    `;

}

/*==============================
山札生成
==============================*/

function createDeck(){

    game.deck = [];

    cardData.forEach(card=>{

        game.deck.push({...card});
        game.deck.push({...card});

    });

    shuffleDeck();

    addLog("山札を作成しました。");

}

/*==============================
シャッフル
==============================*/

function shuffleDeck(){

    for(let i=game.deck.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [game.deck[i],game.deck[j]]=
        [game.deck[j],game.deck[i]];

    }

}

/*==============================
カードを引く
==============================*/

function drawCard(){

    if(game.deck.length===0){

        addLog("山札がありません。");

        return null;

    }

    return game.deck.shift();

}

/*==============================
初期手札
==============================*/

function drawOpeningHand(){

    game.hand=[];

    for(let i=0;i<2;i++){

        const card=drawCard();

        if(card){

            game.hand.push(card);

        }

    }

    addLog("初期手札を2枚配りました。");

}
/*==============================
ログ
==============================*/

function addLog(text){

    const log=document.getElementById("log");

    log.innerHTML+="<br>"+text;

    log.scrollTop=log.scrollHeight;

}

/*==============================
手札表示
==============================*/

function renderHand(){

    const hand=document.getElementById("hand");

    hand.innerHTML="";

    game.hand.forEach(card=>{

    const cardElement=createCard(card);

    if(game.equippedAttack===card){

        cardElement.style.outline="4px solid gold";

    }

    hand.appendChild(cardElement);

});

}

/*==============================
カード生成
==============================*/

function createCard(card){

    const element=document.createElement("div");

    element.className="card";

    switch(card.type){

        case "attack":
            element.classList.add("cardAttack");
            break;

        case "defense":
            element.classList.add("cardDefense");
            break;

        case "ability":
            element.classList.add("cardAbility");
            break;

        case "field":
            element.classList.add("cardField");
            break;

    }

    element.innerHTML=`

        <div class="cardType">

            ${getCardIcon(card.type)}

        </div>

        <div class="cardName">

            ${card.name}

        </div>

        <div class="cardAttribute">

            ${getCardAttribute(card)}

        </div>

        <div class="cardPower">

            ${getCardPower(card)}

        </div>

    `;

  element.addEventListener("click",()=>{

    if(card.type==="attack"){

        equipAttack(card);

    }

});

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
カード能力表示
==============================*/

function getCardPower(card){

    if(card.type==="attack"){

        return "ATK "+card.damage;

    }

    if(card.type==="defense"){

        return "HP "+card.hp;

    }

    return "";

}

function getCardAttribute(card){

    if(card.attribute){

        return card.attribute;

    }

    return "";

}
/*==============================
プレイヤーデータ
==============================*/

const eraserData = [

    {
        name:"MONO",
        hp:20,
        ability:"HP満タンなら受けるダメージ-5"
    },

    {
        name:"レーダー",
        hp:17,
        ability:"HP10以下なら攻撃+5"
    },

    {
        name:"アーチ",
        hp:17,
        ability:"2マス以上離れた相手への攻撃+3"
    },

    {
        name:"ぺんてるアイン",
        hp:14,
        ability:"元の攻撃力4以下なら+4"
    },

    {
        name:"マークシート",
        hp:16,
        ability:"貫通攻撃+6"
    }

];
/*==============================
消しゴムをランダムに選ぶ
==============================*/

function createRandomErasers(){

    const list = [...eraserData];

    shuffleArray(list);

    game.players = [];

    const ids = [

        "player",
        "cpu1",
        "cpu2",
        "cpu3",
        "cpu4"

    ];

    for(let i=0;i<5;i++){

        game.players.push({

            id:ids[i],

            name:list[i].name,

            hp:list[i].hp,

            maxHp:list[i].hp,

            ability:list[i].ability,

            attack:null,

            defenses:[],

            field:null,

            alive:true

        });

    }

}

/*==============================
配列シャッフル
==============================*/

function shuffleArray(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}
/*==============================
プレイヤー表示更新
==============================*/

function updatePlayers(){

    game.players.forEach(player=>{

        const element=document.getElementById(player.id);

        if(!element) return;

        element.innerHTML=`

            <strong>${player.name}</strong>

            <br>

            ❤️ ${player.hp}/${player.maxHp}

            <br>

            <small style="font-size:10px;color:#9fe9ff;">

                ${player.ability}

            </small>

            <div class="hpBar">

                <div class="hp"
                    style="width:${player.hp/player.maxHp*100}%;">
                </div>

            </div>

        `;

    });

}

/*==============================
生存判定
==============================*/

function checkAlive(){

    game.players.forEach(player=>{

        if(player.hp<=0){

            player.hp=0;

            player.alive=false;

        }

    });

}

/*==============================
生き残り人数
==============================*/

function getAlivePlayers(){

    return game.players.filter(player=>player.alive);

}
/*==============================
プレイヤー取得
==============================*/

function getPlayer(id){

    return game.players.find(player=>player.id===id);

}

/*==============================
ダメージ
==============================*/

function damagePlayer(id,damage){

    const player=getPlayer(id);

    if(!player) return;

    if(!player.alive) return;

    player.hp-=damage;

    if(player.hp<0){

        player.hp=0;

    }

    addLog(player.name+" に "+damage+" ダメージ！");

    checkAlive();

    updatePlayers();

    checkWinner();

}

/*==============================
勝者判定
==============================*/

function checkWinner(){

    const alive=getAlivePlayers();

    if(alive.length===1){

        game.winner=alive[0];

        addLog("");

        addLog("🏆 "+alive[0].name+" の勝利！！");

    }

}
/*==============================
テスト
==============================*/

window.testDamage=function(){

    damagePlayer("cpu1",5);

}
/*==============================
装備中の攻カード
==============================*/

game.equippedAttack=null;

/*==============================
攻カード装備
==============================*/

function equipAttack(card){

    game.equippedAttack=card;

    addLog("⚔️ "+card.name+" を装備した");

    renderHand();

}