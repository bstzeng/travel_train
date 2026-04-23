import { html } from '../utils/html.js';
import { BadgeShelf } from './BadgeShelf.js';
import { MapPanel } from './MapPanel.js';
import { QuestionCard } from './QuestionCard.js';

export const GameScreen = ({
  title,
  subtitle,
  state,
  question,
  stations,
  isReview,
  onPronounce,
  onSpeakResult,
  onImageAnswer,
  onDepart,
  onHome
}) => html`
  <section className="play-scene">
    <header className="top-banner card-panel">
      <div>
        <span className="eyebrow">${subtitle}</span>
        <h1>${title}</h1>
      </div>
      <button className="tertiary-button" type="button" onClick=${onHome}>
        回首頁
      </button>
    </header>

    <div className="game-layout">
      <div className="question-column">
        <${QuestionCard}
          key=${question?.id}
          question=${question}
          isReview=${isReview}
          onPronounce=${onPronounce}
          onSpeakResult=${onSpeakResult}
          onImageAnswer=${onImageAnswer}
        />
      </div>

      <div className="map-column">
        <${MapPanel}
          stations=${stations}
          currentStationIndex=${state.currentStationIndex}
          fuel=${state.fuel}
          streak=${state.streak}
          badges=${state.badges}
          isReview=${isReview}
          reviewRemainingCount=${state.reviewRemainingIds.length}
          canDepart=${state.fuel >= 2 && !state.journeyComplete}
          onDepart=${onDepart}
        />
      </div>
    </div>

    <${BadgeShelf} stations=${stations} badges=${state.badges} />
  </section>
`;
