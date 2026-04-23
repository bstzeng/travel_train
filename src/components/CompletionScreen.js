import { html } from '../utils/html.js';

export const CompletionScreen = ({
  badgesCount,
  totalStations,
  wrongCount,
  stats,
  reviewComplete,
  onReview,
  onHome,
  onRestart
}) => html`
  <section className="celebration-screen">
    <article className="celebration-card card-panel final">
      <span className="eyebrow">${reviewComplete ? '複習完成' : '環島成功'}</span>
      <div className="celebration-icon">🏆</div>
      <h1>${reviewComplete ? '小小列車長完成全任務！' : '火車成功環島一圈！'}</h1>
      <p className="celebration-copy">
        ${reviewComplete
          ? '答錯題目也全部重新練過了，今天的注音冒險大成功。'
          : '從新竹出發一路繞過台灣，再次回到風城，真是超厲害。'}
      </p>

      <div className="summary-grid">
        <article className="status-card badges">
          <span className="status-label">徽章收藏</span>
          <strong>${badgesCount} / ${totalStations}</strong>
        </article>
        <article className="status-card fuel">
          <span className="status-label">答對題數</span>
          <strong>${stats.correct}</strong>
        </article>
        <article className="status-card next">
          <span className="status-label">答錯待複習</span>
          <strong>${wrongCount}</strong>
        </article>
        <article className="status-card streak">
          <span className="status-label">火車出發次數</span>
          <strong>${stats.moves}</strong>
        </article>
      </div>

      <div className="final-actions">
        ${wrongCount > 0 && !reviewComplete
          ? html`
              <button className="primary-button" type="button" onClick=${onReview}>
                進入錯題複習
              </button>
            `
          : null}
        <button className="secondary-button" type="button" onClick=${onRestart}>
          再玩一次新旅程
        </button>
        <button className="tertiary-button" type="button" onClick=${onHome}>
          回首頁
        </button>
      </div>
    </article>
  </section>
`;
