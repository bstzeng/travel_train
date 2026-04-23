import { html } from '../utils/html.js';
import { FUEL_COST_PER_MOVE } from '../data/stations.js';

const routePoints = (items) => items.map((station) => `${station.position.x},${station.position.y}`).join(' ');

export const MapPanel = ({
  stations,
  currentStationIndex,
  fuel,
  streak,
  isReview,
  reviewRemainingCount,
  canDepart,
  onDepart
}) => {
  const currentStation = stations[currentStationIndex];
  const nextStation = stations[Math.min(currentStationIndex + 1, stations.length - 1)];
  const trainPosition = currentStation.position;
  const journeyProgress = `${currentStationIndex + 1} / ${stations.length}`;

  return html`
    <section className="map-card card-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">${isReview ? '完成環島後加強複習' : '環島地圖任務'}</span>
          <h2>${isReview ? '複習總車站' : '台灣逆時針旅程'}</h2>
        </div>
        <span className="progress-pill">${journeyProgress}</span>
      </div>

      ${!isReview
        ? html`
            <button
              className="primary-button depart-button depart-button-top"
              type="button"
              disabled=${!canDepart}
              onClick=${onDepart}
            >
              ${canDepart ? `前往下一站 ${nextStation.name}` : `需要 ${FUEL_COST_PER_MOVE} 燃料才能出發`}
            </button>
          `
        : null}

      <div className="map-content-layout">
        <div className="status-grid">
          <article className="status-card fuel">
            <span className="status-label">燃料</span>
            <strong>${fuel}</strong>
          </article>
          <article className="status-card streak">
            <span className="status-label">連續答對</span>
            <strong>${streak}</strong>
          </article>
          <article className="status-card current-place">
            <span className="status-label">目前位置</span>
            <strong>${currentStation.name}</strong>
            <span>${currentStation.feature}</span>
          </article>
          <article className="status-card next">
            <span className="status-label">${isReview ? '錯題剩餘' : '下一站'}</span>
            <strong>${isReview ? `${reviewRemainingCount} 題` : nextStation.name}</strong>
          </article>
          <article className="status-card depart-rule">
            <span className="status-label">${isReview ? '複習任務' : '出發條件'}</span>
            <strong>${isReview ? '把錯題再練熟' : `消耗 ${FUEL_COST_PER_MOVE} 燃料前進`}</strong>
            <span>${isReview ? '全部答對就完成複習' : canDepart ? '火車準備出發' : '還差一些燃料喔'}</span>
          </article>
        </div>

        <div className="map-visual-column">
          <div className="map-board">
            <svg className="taiwan-map" viewBox="0 0 360 640" aria-label="台灣地圖與火車位置">
              <defs>
                <linearGradient id="seaGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#dff8ff"></stop>
                  <stop offset="100%" stopColor="#9ed8ff"></stop>
                </linearGradient>
                <linearGradient id="islandGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#d8f8b8"></stop>
                  <stop offset="100%" stopColor="#7ecf73"></stop>
                </linearGradient>
                <filter id="islandShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#4f8f67" floodOpacity="0.18" />
                </filter>
              </defs>

              <rect x="0" y="0" width="360" height="640" rx="32" fill="url(#seaGradient)"></rect>

              <path
                d="M182 44C166 47 149 59 140 77C129 101 130 128 121 151C111 177 103 205 99 240C94 284 96 325 102 363C108 400 114 437 123 474C132 512 149 553 176 581C191 596 211 601 226 588C241 575 248 553 254 530C261 503 266 477 274 448C284 412 298 376 300 336C302 295 297 257 291 220C286 188 280 154 268 124C257 97 242 72 221 54C210 45 196 41 182 44Z"
                fill="url(#islandGradient)"
                stroke="#6fb77d"
                strokeWidth="5"
                opacity="0.94"
                filter="url(#islandShadow)"
              ></path>

              <path
                d="M171 99C189 136 204 176 210 217C215 253 214 296 206 336C198 377 191 422 185 468"
                fill="none"
                stroke="#7cab62"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.18"
              ></path>

              <path
                d="M258 170C271 176 278 188 279 202C279 217 272 231 258 238"
                fill="none"
                stroke="#7ebf87"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.24"
              ></path>

              <path
                d="M183 596C189 603 197 605 204 602C210 599 212 592 208 586C204 580 196 579 189 582C183 585 180 591 183 596Z"
                fill="#bfe7a4"
                opacity="0.82"
              ></path>

              <polyline
                points=${routePoints(stations)}
                fill="none"
                stroke="#275f7a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.32"
              ></polyline>

              <polyline
                points=${routePoints(stations.slice(0, currentStationIndex + 1))}
                fill="none"
                stroke="#ff7d4d"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></polyline>

              ${stations.map((station, index) => {
                const isCompleted = index <= currentStationIndex;
                const isCurrent = index === currentStationIndex;
                const isNext = !isReview && index === currentStationIndex + 1;
                const className = isCurrent ? 'current' : isNext ? 'next' : isCompleted ? 'completed' : 'pending';

                return html`
                  <g key=${station.id} className=${`station-mark ${className}`}>
                    <circle
                      cx=${station.position.x}
                      cy=${station.position.y}
                      r=${isCurrent ? 14 : 10}
                    ></circle>
                    <text
                      x=${station.position.x + (station.labelOffset?.x || 14)}
                      y=${station.position.y + (station.labelOffset?.y || -10)}
                      textAnchor=${station.labelAnchor || 'start'}
                      dominantBaseline="middle"
                    >
                      ${station.shortName}
                    </text>
                  </g>
                `;
              })}

              <g className="train-marker">
                <circle
                  cx=${trainPosition.x}
                  cy=${trainPosition.y}
                  r="22"
                  fill="rgba(255,255,255,0.82)"
                  stroke="#ff8c42"
                  strokeWidth="4"
                ></circle>
                <text x=${trainPosition.x} y=${trainPosition.y + 8} textAnchor="middle" fontSize="24">
                  🚂
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  `;
};
