# 環島注音火車 MVP

適合 6 歲兒童與家長一起玩的注音學習手機網頁版。孩子透過答題賺燃料，累積燃料後讓火車沿著台灣地圖逆時針環島，抵達各地蒐集城市徽章，最後進入錯題複習。

## 1. 專案資料夾結構

```text
環島注音火車/
├─ index.html
├─ 404.html
├─ package.json
├─ server.mjs
├─ README.md
└─ src/
   ├─ main.js
   ├─ app/
   │  └─ App.js
   ├─ components/
   │  ├─ ArrivalScreen.js
   │  ├─ BadgeShelf.js
   │  ├─ CompletionScreen.js
   │  ├─ FeedbackToast.js
   │  ├─ GameScreen.js
   │  ├─ HomeScreen.js
   │  ├─ MapPanel.js
   │  └─ QuestionCard.js
   ├─ data/
   │  ├─ audio.js
   │  ├─ questions.js
   │  └─ stations.js
   ├─ styles/
   │  └─ main.css
   └─ utils/
      ├─ audio.js
      ├─ gameState.js
      ├─ html.js
      └─ storage.js
```

## 2. React 元件拆分規劃

- `App`: 管理整體狀態、流程切換、localStorage 同步與互動事件。
- `HomeScreen`: 首頁、玩法說明、開始遊戲與繼續遊戲。
- `GameScreen`: 主遊戲版面組合，左側題目區、右側地圖區。
- `QuestionCard`: 題目呈現、發音按鈕、念讀題與看圖選注音互動。
- `MapPanel`: 台灣地圖、火車位置、下一站、燃料、連擊、出發按鈕。
- `BadgeShelf`: 已獲得徽章收藏展示。
- `ArrivalScreen`: 到站與城市徽章獲得畫面。
- `CompletionScreen`: 完成環島、結算與錯題複習入口。
- `FeedbackToast`: 答題與旅程提示訊息。

## 3. 遊戲流程說明

1. 進入首頁後可開始新旅程，或讀取先前進度繼續玩。
2. 主遊戲持續出題，答對一題可獲得 1 燃料。
3. 每連續答對 3 題，額外再獲得 1 燃料。
4. 玩家燃料達 2 以上時，可隨時按下「前往下一站」。
5. 火車每移動一次消耗 2 燃料，抵達城市後獲得該站徽章。
6. 完成 24 站環島後進入結算畫面。
7. 若旅途中有答錯題目，可進入錯題複習模式，只練習錯過的題目。

## 4. 題庫資料格式

題庫定義於 [src/data/questions.js](./src/data/questions.js)，核心欄位如下：

```js
{
  id: "speak-apple",
  type: "speak",
  word: "蘋果",
  zhuyin: "ㄆㄧㄥˊ ㄍㄨㄛˇ",
  emoji: "🍎",
  category: "水果",
  speechText: "蘋果"
}

{
  id: "image-apple",
  type: "image",
  word: "蘋果",
  zhuyin: "ㄆㄧㄥˊ ㄍㄨㄛˇ",
  emoji: "🍎",
  category: "水果",
  speechText: "蘋果",
  choices: ["ㄆㄧㄥˊ ㄍㄨㄛˇ", "ㄒㄧ ㄍㄨㄚ", "ㄘㄠˇ ㄇㄟˊ", "ㄆㄨˊ ㄊㄠˊ"],
  answer: "ㄆㄧㄥˊ ㄍㄨㄛˇ"
}
```

目前示範題庫使用 25 個兒童熟悉詞彙，自動生成 50 題：

- 25 題念讀題
- 25 題看圖選注音題

## 5. 站點資料格式

站點定義於 [src/data/stations.js](./src/data/stations.js)，共 24 站，欄位如下：

```js
{
  id: "taichung",
  name: "台中",
  shortName: "台中",
  county: "台中市",
  feature: "珍珠奶茶補給站",
  icon: "🧋",
  badgeName: "珍奶補給章",
  color: "#ffbe5c",
  position: { x: 118, y: 206 }
}
```

## 6. localStorage 儲存內容設計

localStorage key: `bopomofo-train-journey:v1`

```js
{
  version: 1,
  currentStationIndex: 6,
  fuel: 5,
  streak: 2,
  badges: ["hsinchu-start", "miaoli", "taichung"],
  wrongQuestionIds: ["image-panda", "speak-milk"],
  reviewRemainingIds: ["image-panda", "speak-milk"],
  currentQuestionId: "image-cake",
  recentQuestionIds: ["speak-apple", "image-apple"],
  journeyComplete: false,
  reviewComplete: false,
  lastScreen: "game",
  lastArrivedStationId: "taichung",
  stats: {
    correct: 9,
    incorrect: 2,
    questionsSeen: 11,
    moves: 2
  }
}
```

## 7. 完整 React MVP 程式碼

本 MVP 採用「無建置步驟的 React 模組化靜態專案」：

- React 與 ReactDOM 透過 ESM CDN 載入
- 元件、資料、樣式與邏輯分檔管理
- 可直接部署到 GitHub Pages
- 可透過 `node server.mjs` 本地預覽

核心檔案：

- 入口：[src/main.js](./src/main.js)
- 主程式：[src/app/App.js](./src/app/App.js)
- 題庫：[src/data/questions.js](./src/data/questions.js)
- 地圖站點：[src/data/stations.js](./src/data/stations.js)
- 樣式：[src/styles/main.css](./src/styles/main.css)

## 8. GitHub Pages 部署注意事項

- 這個版本沒有使用 React Router，所有資源都採相對路徑，直接部署到 GitHub Pages 即可。
- 最簡單做法：將整個專案推到 GitHub，Pages 設定使用 `main` branch 的 `/(root)`。
- 如果未來改用 Vite，請記得設定 `base: '/repo-name/'` 以相容 GitHub Pages 子路徑。
- 本專案使用瀏覽器 `localStorage` 儲存進度，同一台裝置同一瀏覽器可延續遊戲。
- 發音使用瀏覽器 `SpeechSynthesis`，不同裝置的聲音品質可能略有差異。

## 9. 未來可擴充方向

- 擴充題庫來源，改為依主題分包載入。
- 加入更多台灣特色站點動畫與到站小互動。
- 新增家長設定，例如每日練習目標、音效音量、題型比例。
- 改為接入真實插圖資產與精緻音效素材。
- 加入角色成就系統、連續登入獎勵、旅行相簿。
- 切換為 Vite 或 Next.js 靜態匯出流程，方便多人協作與 CI/CD。

## 本地執行

1. 需有 Node.js。
2. 在專案資料夾執行：

```bash
npm run dev
```

3. 開啟瀏覽器進入：

```text
http://localhost:4173
```
