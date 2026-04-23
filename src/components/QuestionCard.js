import { html } from '../utils/html.js';
import { VerticalZhuyin } from './VerticalZhuyin.js';

export const QuestionCard = ({
  question,
  isReview,
  onPronounce,
  onSpeakResult,
  onImageAnswer
}) => {
  if (!question) {
    return null;
  }

  const introText = question.type === 'speak' ? '請小朋友念給家長聽' : '請選出正確的注音';

  return html`
    <section className="question-card card-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">${isReview ? '錯題複習模式' : '注音補給任務'}</span>
          <h2>${question.prompt}</h2>
        </div>
        <span className="question-type-chip">
          ${question.type === 'speak' ? '念讀題' : '看圖選注音'}
        </span>
      </div>

      <div className="question-meta">
        <span className="meta-pill">${question.category}</span>
        <span className="meta-pill">${introText}</span>
      </div>

      <button className="sound-button" onClick=${() => onPronounce(question)} type="button">
        🔊 發音提示
      </button>

      ${question.type === 'speak'
        ? html`
            <div className="speak-card">
              <div className="speak-focus-label">注音挑戰</div>
              <div className="zhuyin-word">
                <${VerticalZhuyin} text=${question.zhuyin} />
              </div>
              <div className="hint-copy">這一題不看圖片，請直接看注音念出來，再由家長按結果。</div>
            </div>

            <div className="question-actions two-column">
              <button className="primary-button success" type="button" onClick=${() => onSpeakResult(true)}>
                答對
              </button>
              <button className="secondary-button" type="button" onClick=${() => onSpeakResult(false)}>
                答錯
              </button>
            </div>
          `
        : html`
            <div className="image-card">
              <div className="question-emoji giant">${question.emoji}</div>
              <div className="hint-copy">看看圖片，找出正確的注音。</div>
            </div>

            <div className="choice-grid">
              ${question.choices.map(
                (choice) => html`
                  <button
                    key=${`${question.id}-${choice}`}
                    className="choice-button"
                    type="button"
                    onClick=${() => onImageAnswer(choice === question.answer)}
                  >
                    <${VerticalZhuyin} text=${choice} compact=${true} />
                  </button>
                `
              )}
            </div>
          `}
    </section>
  `;
};
