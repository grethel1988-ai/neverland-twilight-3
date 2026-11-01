# 專案筆記（agent.md）— 永無島的黃昏3：影子、時鐘與不沉之船

## 決策紀錄（2026-11-01）
- **標題**：永無島的黃昏：影子、時鐘與不沉之船
- **副標題**：國小國語文第三學習階段（高年級）能力指標題目總匯
- **夥伴（4選1）**：彼得潘（虛弱狀態）、溫蒂、約翰、奇妙仙子
- **生命圖示**：🧭 航海羅盤（SVG，三色輪替：琥珀金、翠海綠、暮光紅）
- **難度名稱**：暮光水手（25題・5命）／斬影劍士（40題・7命）／不沉船長（50題・10命）
- **視覺配色**：黃昏暮光紫紅 × 暗金（呼應夕陽餘暉、黑巫術與海盜船油燈）
- **四關設定**：
  1. 第一關：印第安部落的危機（`native_american_camp`｜`4-Ⅲ-1`、`4-Ⅲ-2`、`4-Ⅲ-3`、`四字語詞`）
  2. 第二關：迷霧森林的考驗（`misty_forest`｜`5-Ⅲ-2`、`5-Ⅲ-3`）
  3. 第三關：骷髏礁石窟的尾隨者（`coastal_scene_in_neverland`｜`5-Ⅲ-4`、`5-Ⅲ-5`、`5-Ⅲ-6`）
  4. 第四關：快樂羅傑號的終極對決（`captain_hook_s_cabin`｜`5-Ⅲ-8`、`5-Ⅲ-11`）

## 上次做到哪（2026-11-01）
- 完成第三部網站建置：`index.html`、`css/style.css`、`js/game.js`、`js/bank_mc.js`（154題）、`js/bank_drag.js`（35題）、`assets/img/*.webp`
- 實作拖拉題答案框依字數動態計算寬度（`charEm()` → `--w`），並在放入卡片後透過 `.drop:has(.chip)` 自動貼合包覆
- 完成配對題 `2 × 2` 對稱排版、填空題單行化微調，以及桌面／行動端響應式字體放大（`clamp`）
- 修正拖曳殘影 `#ghost` 隱藏權重問題與手機版閱讀題 `.qcard` 選項被底部對話框遮擋問題（加入 `min-height: 0; overflow-y: auto` 與手機版緊湊化配置）
- 完成 `D:\永無島三部曲\畫面設計參考` 11 張畫面設計圖高解析度拼接總覽（`畫面設計總覽.png`、`畫面設計總覽_無字版.png`）
- 完成第三部 11 個遊戲畫面擷取（`1600×900`）與高解析度總覽圖拼接（`D:\永無島三部曲\畫面設計總覽-3.png`、`畫面設計總覽.png`、`畫面設計總覽_無字版.png`）
- 目前資源快取版本號：`?v=10`
- 建立 GitHub 遠端公開儲存庫並啟用 GitHub Pages：
  - **GitHub Repo**：`https://github.com/grethel1988-ai/neverland-twilight-3`
  - **GitHub Pages**：`https://grethel1988-ai.github.io/neverland-twilight-3/`

## 下一步
- 若需清理 GitHub 帳號下兩個封存備份庫（`neverland-twilight-3-bak-170017`、`neverland-twilight-3-archive`），可執行 `gh auth refresh -h github.com -s delete_repo` 授權後刪除，或於 GitHub 網頁 Settings 刪除
- 課堂實際施測與收集學生回饋

## 踩坑與注意事項
- Windows 環境下 `python` 為 WindowsApps 假捷徑，需使用 `C:\Users\User\AppData\Local\Python\bin\python.exe -X utf8`
- 標楷體（KaiTi）視覺字級較黑體小，分類標題（`.cat h4`）與拖拉卡片（`.chip`）需使用較大的 `clamp()` 字級確保注音與國字清晰
- 配對題與填空題的 `.drop` 若設固定寬度或給 `.chip` 設 `max-width: 100%` 搭配 `white-space: nowrap`，長文字會超出黃色卡片邊框；改由 JS 依字數計算 `--w` 並搭配 `width: max-content` 與 `.drop:has(.chip)` 即可完美貼合
- 為 `.chip` 設定 `display: inline-flex` 時，會覆蓋瀏覽器預設 `[hidden] { display: none; }` 導致 `#ghost.chip[hidden]` 殘影無法隱藏，必須在全域 CSS 宣告 `[hidden] { display: none !important; }` 並搭配行內 `style="display:none"`
- 手機版 `.quiz-body` 為 `flex-direction: column` 時，`.qcard` 必須設定 `min-height: 0; overflow-y: auto;`，且選擇題需以 `.q-actions:has(#btn-check[hidden]) { display: none; }` 收合底部空白，避免選項溢出至 `.quiz-vn` 後方
- 以 Headless Chrome + CDP 自動擷取遊戲對話畫面時，需先清除 `typeText` 的 `setInterval` 計時器再填入完整台詞，避免逐字打字機計時器覆寫文字造成截圖台詞被截斷
