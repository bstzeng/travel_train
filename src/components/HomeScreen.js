import { html } from '../utils/html.js';

export const HomeScreen = ({ hasSave, progressText, onStart, onContinue }) => html`
  <section className="home-screen">
    <div className="hero-panel card-panel">
      <div className="hero-copy">
        <span className="eyebrow">注音學習主題遊戲</span>
        <h1>環島注音火車</h1>
        <p>
          小朋友一邊答題補充燃料，一邊讓火車沿著台灣地圖逆時針前進。每到一站就收下一枚可愛城市徽章，最後回到新竹完成環島。
        </p>
      </div>

      <div className="hero-actions">
        <button className="primary-button" type="button" onClick=${onStart}>
          開始遊戲
        </button>
        <button
          className="secondary-button"
          type="button"
          onClick=${onContinue}
          disabled=${!hasSave}
        >
          ${hasSave ? `繼續遊戲 ${progressText}` : '尚未有可繼續的進度'}
        </button>
      </div>
    </div>

    <div className="home-grid">
      <section className="card-panel intro-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">玩法很簡單</span>
            <h2>邊玩邊學的任務流程</h2>
          </div>
        </div>
        <ol className="steps-list">
          <li>看題目念注音，或看圖片選出正確讀音。</li>
          <li>每答對一題獲得 1 燃料，連續答對 3 題再加送 1 燃料。</li>
          <li>有 2 燃料就能按下出發，火車前往下一個台灣特色站點。</li>
          <li>蒐集 24 枚徽章，完成環島後再複習旅途中答錯的題目。</li>
        </ol>
      </section>

      <section className="card-panel route-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">旅程亮點</span>
            <h2>從新竹出發的環島冒險</h2>
          </div>
        </div>
        <div className="route-preview">
          ${['新竹', '台中', '阿里山', '高雄', '墾丁', '花蓮', '台北 101', '新竹'].map(
            (stop) => html`<span key=${stop} className="route-chip">${stop}</span>`
          )}
        </div>
        <p>
          地圖上會清楚顯示目前位置、下一站、已完成站點、剩餘燃料與已獲得徽章，讓孩子像在玩闖關地圖一樣學注音。
        </p>
      </section>
    </div>
  </section>
`;
