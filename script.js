//========================
// 画面取得
//========================

const titleScreen = document.getElementById("title-screen");
const menuScreen = document.getElementById("menu-screen");
const battleScreen = document.getElementById("battle-screen");

const tap = document.getElementById("tap");
const cpuBattleBtn = document.getElementById("cpuBattleBtn");

//========================
// タイトル→メニュー
//========================

tap.addEventListener("click", () => {

    titleScreen.style.display = "none";

    menuScreen.style.display = "flex";

});

//========================
// メニュー→CPUバトル
//========================

cpuBattleBtn.addEventListener("click", () => {

    menuScreen.style.display = "none";

    battleScreen.style.display = "block";

    startBattle();

});

//========================
// プレイヤーデータ
//========================

const players = [

    {
        name: "あなた",
        hp: 20,
        maxHp: 20
    },

    {
        name: "CPU1",
        hp: 20,
        maxHp: 20
    },

    {
        name: "CPU2",
        hp: 20,
        maxHp: 20
    },

    {
        name: "CPU3",
        hp: 20,
        maxHp: 20
    },

    {
        name: "CPU4",
        hp: 20,
        maxHp: 20
    }

];
//========================
// バトル開始
//========================

function startBattle() {

    updateDisplay();

    console.log("バトル開始");

}

//========================
// 画面更新
//========================

function updateDisplay() {

    // プレイヤー
    document.querySelector("#player .hp").textContent =
        "HP:" + players[0].hp;

    // CPU1
    document.querySelector("#cpu1 .hp").textContent =
        "HP:" + players[1].hp;

    // CPU2
    document.querySelector("#cpu2 .hp").textContent =
        "HP:" + players[2].hp;

    // CPU3
    document.querySelector("#cpu3 .hp").textContent =
        "HP:" + players[3].hp;

    // CPU4
    document.querySelector("#cpu4 .hp").textContent =
        "HP:" + players[4].hp;

}

//========================
// ダメージ
//========================

function damage(playerIndex, amount) {

    players[playerIndex].hp -= amount;

    if (players[playerIndex].hp < 0) {

        players[playerIndex].hp = 0;

    }

    updateDisplay();

}

//========================
// 回復
//========================

function heal(playerIndex, amount) {

    players[playerIndex].hp += amount;

    if (players[playerIndex].hp > players[playerIndex].maxHp) {

        players[playerIndex].hp =
            players[playerIndex].maxHp;

    }

    updateDisplay();

}
//========================
// ターン管理
//========================

let currentTurn = 0;

function nextTurn() {

    currentTurn++;

    if (currentTurn >= players.length) {

        currentTurn = 0;

    }

    console.log(players[currentTurn].name + "のターン");

}

//========================
// 勝敗判定
//========================

function checkWinner() {

    const alive = players.filter(player => player.hp > 0);

    if (alive.length === 1) {

        alert(alive[0].name + " の勝利！");

    }

}

//========================
// デバッグ用
//========================

// damage(1,5);
// heal(0,3);

//========================
// 今後追加する機能
//========================

// 山札生成
// カードを引く
// 手札表示
// 攻カード装備
// 防カード装備
// 場カード設置
// 能カード使用
// CPU思考
// 消しゴム特性
// 状態異常
// 特消
// 勝利演出