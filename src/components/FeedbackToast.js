import { html } from '../utils/html.js';

export const FeedbackToast = ({ feedback }) => {
  if (!feedback) {
    return null;
  }

  return html`
    <aside className=${`feedback-toast ${feedback.type || 'info'}`}>
      <div className="feedback-title">${feedback.title}</div>
      <div className="feedback-text">${feedback.text}</div>
    </aside>
  `;
};
