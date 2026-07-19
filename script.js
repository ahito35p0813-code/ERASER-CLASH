const titleScreen = document.getElementById("title-screen");
const battleScreen = document.getElementById("battle-screen");

// 最初はバトル画面を隠す
battleScreen.style.display = "none";

// タイトルを押す
titleScreen.addEventListener("click", function () {

    titleScreen.innerHTML = `
        <h1>MENU</h1>

        <button id="cpuBtn">CPUバトル</button>
        <button>ルールブック</button>
        <button>カード図鑑</button>
        <button>消しゴム図鑑</button>
        <button>NEWS</button>
        <button>設定</button>
    `;

    document.getElementById("cpuBtn").onclick = function () {
        titleScreen.style.display = "none";
        battleScreen.style.display = "block";
    };

}, { once: true });