// タイトル画面
const titleScreen = document.getElementById("title-screen");

// タップしたらメニューへ
titleScreen.addEventListener("click", () => {
    titleScreen.innerHTML = `
        <h1>MENU</h1>

        <button class="menu-btn">CPUバトル</button>
        <button class="menu-btn">ルールブック</button>
        <button class="menu-btn">カード図鑑</button>
        <button class="menu-btn">消しゴム図鑑</button>
        <button class="menu-btn">NEWS</button>
        <button class="menu-btn">設定</button>
    `;
});