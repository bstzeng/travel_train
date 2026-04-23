import { html } from '../utils/html.js';

export const ArrivalScreen = ({ station, totalBadges, onBackToGame }) => html`
  <section className="celebration-screen">
    <article className="celebration-card card-panel">
      <span className="eyebrow">到站成功</span>
      <div className="celebration-icon">${station.icon}</div>
      <h1>${station.name} 抵達了！</h1>
      <p className="celebration-copy">${station.feature}</p>

      <div className="badge-highlight">
        <div className="badge-highlight-icon">${station.icon}</div>
        <div>
          <span className="status-label">新獲得城市徽章</span>
          <strong>${station.badgeName}</strong>
        </div>
      </div>

      <p className="celebration-copy">目前已收藏 ${totalBadges} 枚徽章，火車補給完成後就能繼續挑戰。</p>

      <button className="primary-button" type="button" onClick=${onBackToGame}>
        返回答題補充燃料
      </button>
    </article>
  </section>
`;
