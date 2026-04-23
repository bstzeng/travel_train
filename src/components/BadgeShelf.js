import { html } from '../utils/html.js';

export const BadgeShelf = ({ stations, badges }) => html`
  <section className="badge-shelf card-panel">
    <div className="section-heading">
      <div>
        <span className="eyebrow">徽章收藏</span>
        <h3>旅程紀念冊</h3>
      </div>
      <strong>${badges.length} / ${stations.length}</strong>
    </div>

    <div className="badge-grid">
      ${stations.map((station) => {
        const unlocked = badges.includes(station.id);
        return html`
          <article
            key=${station.id}
            className=${`badge-card ${unlocked ? 'unlocked' : 'locked'}`}
            title=${`${station.name} - ${station.badgeName}`}
          >
            <div className="badge-icon">${unlocked ? station.icon : '🔒'}</div>
            <div className="badge-name">${station.badgeName}</div>
            <div className="badge-city">${station.name}</div>
          </article>
        `;
      })}
    </div>
  </section>
`;
