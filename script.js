"use strict";

// 画面
const titleScreen = document.getElementById("titleScreen");
const difficultyScreen = document.getElementById("difficultyScreen");
const gameScreen = document.getElementById("gameScreen");

// ボタン
const cpuButton = document.getElementById("cpuButton");
const difficultyButtons = document.querySelectorAll(".difficulty");

// タイトル → 難易度
cpuButton.addEventListener("click", () => {

    titleScreen.classList.add("hidden");

    difficultyScreen.classList.remove("hidden");

});

// 難易度 → ゲーム
difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyScreen.classList.add("hidden");

        gameScreen.classList.remove("hidden");

        startGame(button.dataset.level);

    });

});

// ゲーム開始
function startGame(level){

    console.log("CPU Level:", level);

    document.getElementById("player").textContent = "あなた";

    document.getElementById("cpu1").textContent = "CPU1";

    document.getElementById("cpu2").textContent = "CPU2";

    document.getElementById("cpu3").textContent = "CPU3";

    document.getElementById("cpu4").textContent = "CPU4";

    document.getElementById("log").innerHTML =
        "<b>ERASER CLASH</b><br>ゲーム開始！<br>CPU：" + level;

}