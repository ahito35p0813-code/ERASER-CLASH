const titleScreen = document.getElementById("title-screen");
const battleScreen = document.getElementById("battle-screen");

// 最初はバトル画面を隠す
battleScreen.style.display = "none";

// タイトルを押したらメニュー
titleScreen.addEventListener("click", () => {

    titleScreen.innerHTML = `
        <h1>MENU</h1>

        <button id="cpuBtn" class="menu-btn">CPUバトル</button>
        <button class="menu-btn">ルールブック</button>
        <button class="menu-btn">カード図鑑</button>
        <button class="menu-btn">消しゴム図鑑</button>
        <button class="menu-btn">NEWS</button>
        <button class="menu-btn">設定</button>
    `;

    document.getElementById("cpuBtn").onclick = () => {
        titleScreen.style.display = "none";
        battleScreen.style.display = "block";
    };

});