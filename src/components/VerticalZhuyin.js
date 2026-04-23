import { html } from '../utils/html.js';

const toneMarks = new Set(['ˊ', 'ˇ', 'ˋ', '˙']);

const parseZhuyin = (text) =>
  (text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((syllable) => {
      const characters = [...syllable];
      const tone = characters.find((character) => toneMarks.has(character)) || '';
      const symbols = characters.filter((character) => !toneMarks.has(character));
      return { tone, symbols };
    });

export const VerticalZhuyin = ({ text, compact = false }) => {
  const syllables = parseZhuyin(text);

  return html`
    <div className=${`vertical-zhuyin ${compact ? 'compact' : ''}`} aria-label=${text}>
      ${syllables.map(
        (syllable, index) => html`
          <div key=${`${text}-${index}`} className="zhuyin-syllable">
            <div className="zhuyin-symbols">
              ${syllable.symbols.map(
                (symbol, symbolIndex) => html`
                  <span key=${`${text}-${index}-${symbolIndex}`} className="zhuyin-symbol">
                    ${symbol}
                  </span>
                `
              )}
            </div>
            <span className="zhuyin-tone">${syllable.tone || ''}</span>
          </div>
        `
      )}
    </div>
  `;
};
