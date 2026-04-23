import { html, React } from '../utils/html.js';
import { questions, questionMap } from '../data/questions.js';
import { stations } from '../data/stations.js';
import { GameScreen } from '../components/GameScreen.js';
import { HomeScreen } from '../components/HomeScreen.js';
import { ArrivalScreen } from '../components/ArrivalScreen.js';
import { CompletionScreen } from '../components/CompletionScreen.js';
import { FeedbackToast } from '../components/FeedbackToast.js';
import { playSound, speakText } from '../utils/audio.js';
import {
  appendRecentQuestion,
  createInitialGameState,
  getNextQuestionAfterAnswer,
  sanitizeState,
  travelToNextStation
} from '../utils/gameState.js';
import { loadPersistedState, persistState } from '../utils/storage.js';

const SUCCESS_LINES = [
  '燃料補充成功！',
  '小小列車長真厲害！',
  '火車準備出發！',
  '前往下一站！'
];

const REVIEW_SUCCESS_LINES = [
  '這題複習成功！',
  '讀音越來越熟了！',
  '補給記憶成功！',
  '繼續保持，超棒！'
];

const GENTLE_LINES = [
  '沒關係，我們再試一次。',
  '先補充一下讀音，再來挑戰。',
  '小火車等等你，再聽一次也很棒。',
  '慢慢來，下一題再出發。'
];

const ARRIVAL_LINES = [
  '城市徽章入手！',
  '列車平安抵達！',
  '旅程又前進一大步！',
  '下一段冒險準備中！'
];

const randomLine = (items) => items[Math.floor(Math.random() * items.length)];

const setScreenState = (state, screen) => ({
  ...state,
  lastScreen: screen
});

export const App = () => {
  const initialSnapshot = React.useMemo(() => loadPersistedState(), []);
  const [gameState, setGameState] = React.useState(() => sanitizeState(initialSnapshot));
  const [screen, setScreen] = React.useState('home');
  const [feedback, setFeedback] = React.useState(null);
  const [hasSave, setHasSave] = React.useState(() => Boolean(initialSnapshot));
  const [canPersist, setCanPersist] = React.useState(() => Boolean(initialSnapshot));

  React.useEffect(() => {
    if (!canPersist) {
      return;
    }

    persistState(gameState);
    setHasSave(true);
  }, [canPersist, gameState]);

  React.useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timer = window.setTimeout(() => setFeedback(null), 2400);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const currentQuestion = questionMap[gameState.currentQuestionId];
  const lastArrivedStation =
    stations.find((station) => station.id === gameState.lastArrivedStationId) ||
    stations[gameState.currentStationIndex];
  const progressText = `(${gameState.currentStationIndex + 1}/${stations.length} 站)`;

  const showFeedback = React.useCallback((type, title, text) => {
    setFeedback({
      type,
      title,
      text,
      stamp: Date.now()
    });
  }, []);

  const openHome = React.useCallback(() => {
    playSound('button');
    setScreen('home');
  }, []);

  const startNewGame = React.useCallback(() => {
    playSound('button');
    const freshState = setScreenState(createInitialGameState(), 'game');
    setCanPersist(true);
    setGameState(freshState);
    setScreen('game');
    showFeedback('success', '旅程開始', '從新竹出發，準備補充燃料吧！');
  }, [showFeedback]);

  const continueGame = React.useCallback(() => {
    playSound('button');
    setCanPersist(true);
    setScreen(gameState.lastScreen || 'game');
    showFeedback('info', '繼續旅程', '小火車已回到上次的進度。');
  }, [gameState.lastScreen, showFeedback]);

  const pronounceQuestion = React.useCallback((question) => {
    playSound('button');
    speakText(question.speechText);
    showFeedback('info', '發音提示', `一起聽聽「${question.word}」的讀音。`);
  }, [showFeedback]);

  const handleAnswer = React.useCallback(
    (isCorrect) => {
      const isReview = screen === 'review';
      playSound(isCorrect ? 'correct' : 'button');

      setGameState((previousState) => {
        const currentQuestionId = previousState.currentQuestionId;
      const nextWrongIds = isCorrect
          ? previousState.wrongQuestionIds
          : Array.from(new Set([...previousState.wrongQuestionIds, currentQuestionId]));
        const streak = isCorrect ? previousState.streak + 1 : 0;
        const bonusFuel = isCorrect && !isReview && streak % 3 === 0 ? 1 : 0;
        const fuelGain = isCorrect && !isReview ? 1 + bonusFuel : 0;
        const nextReviewRemainingIds = isReview && isCorrect
          ? previousState.reviewRemainingIds.filter((id) => id !== currentQuestionId)
          : previousState.reviewRemainingIds;
        const reviewFinished = isReview && isCorrect && nextReviewRemainingIds.length === 0;
        const nextQuestionId = reviewFinished
          ? previousState.currentQuestionId
          : getNextQuestionAfterAnswer(
              {
                ...previousState,
                reviewRemainingIds: nextReviewRemainingIds
              },
              screen
            );
        const nextState = {
          ...previousState,
          fuel: previousState.fuel + fuelGain,
          streak,
          wrongQuestionIds: nextWrongIds,
          reviewRemainingIds: nextReviewRemainingIds,
          currentQuestionId: nextQuestionId,
          recentQuestionIds: reviewFinished
            ? previousState.recentQuestionIds
            : appendRecentQuestion(previousState.recentQuestionIds, nextQuestionId),
          reviewComplete: reviewFinished ? true : previousState.reviewComplete,
          stats: {
            ...previousState.stats,
            correct: previousState.stats.correct + (isCorrect ? 1 : 0),
            incorrect: previousState.stats.incorrect + (isCorrect ? 0 : 1),
            questionsSeen: previousState.stats.questionsSeen + 1
          }
        };

        if (reviewFinished) {
          const completedState = setScreenState(nextState, 'complete');
          window.setTimeout(() => {
            setScreen('complete');
            playSound('arrival');
            showFeedback('success', '複習完成', '全部錯題都重新練熟了！');
          }, 0);
          return completedState;
        }

        window.setTimeout(() => {
          if (isCorrect) {
            const title = isReview ? '複習成功' : randomLine(SUCCESS_LINES);
            const bonusText = bonusFuel ? ' 連續答對 3 題再加送 1 燃料！' : '';
            showFeedback(
              'success',
              title,
              isReview
                ? randomLine(REVIEW_SUCCESS_LINES)
                : `獲得 ${fuelGain} 燃料，${randomLine(SUCCESS_LINES)}${bonusText}`
            );
          } else {
            showFeedback('info', randomLine(GENTLE_LINES), '先聽一次發音，再繼續挑戰就可以了。');
          }
        }, 0);

        return setScreenState(nextState, screen);
      });
    },
    [screen, showFeedback]
  );

  const departTrain = React.useCallback(() => {
    playSound('train');

    setGameState((previousState) => {
      const { nextState, arrivedStation } = travelToNextStation(previousState);
      const destinationScreen = nextState.journeyComplete ? 'complete' : 'arrival';
      const stateWithScreen = setScreenState(nextState, destinationScreen);

      window.setTimeout(() => {
        setScreen(destinationScreen);
        playSound('arrival');
        showFeedback(
          'success',
          randomLine(ARRIVAL_LINES),
          nextState.journeyComplete
            ? '環島完成，回到新竹囉！'
            : `${arrivedStation.name} 抵達，新的徽章已加入收藏。`
        );
      }, 0);

      return stateWithScreen;
    });
  }, [showFeedback]);

  const backToGameFromArrival = React.useCallback(() => {
    playSound('button');
    setGameState((previousState) => setScreenState(previousState, 'game'));
    setScreen('game');
  }, []);

  const startReview = React.useCallback(() => {
    playSound('button');
    setGameState((previousState) => {
      const reviewIds = previousState.wrongQuestionIds.length
        ? [...previousState.wrongQuestionIds]
        : [];
      const nextQuestionId = reviewIds.length
        ? getNextQuestionAfterAnswer({
            ...previousState,
            currentQuestionId: null,
            recentQuestionIds: [],
            reviewRemainingIds: reviewIds
          }, 'review')
        : previousState.currentQuestionId;

      return setScreenState(
        {
          ...previousState,
          reviewRemainingIds: reviewIds,
          currentQuestionId: nextQuestionId,
          recentQuestionIds: reviewIds.length ? [nextQuestionId] : previousState.recentQuestionIds,
          reviewComplete: false,
          streak: 0
        },
        'review'
      );
    });
    setScreen('review');
  }, []);

  let content = null;

  if (screen === 'home') {
    content = html`
      <${HomeScreen}
        hasSave=${hasSave}
        progressText=${progressText}
        onStart=${startNewGame}
        onContinue=${continueGame}
      />
    `;
  } else if (screen === 'arrival') {
    content = html`
      <${ArrivalScreen}
        station=${lastArrivedStation}
        totalBadges=${gameState.badges.length}
        onBackToGame=${backToGameFromArrival}
      />
    `;
  } else if (screen === 'complete') {
    content = html`
      <${CompletionScreen}
        badgesCount=${gameState.badges.length}
        totalStations=${stations.length}
        wrongCount=${gameState.reviewComplete ? 0 : gameState.wrongQuestionIds.length}
        stats=${gameState.stats}
        reviewComplete=${gameState.reviewComplete}
        onReview=${startReview}
        onHome=${openHome}
        onRestart=${startNewGame}
      />
    `;
  } else {
    const isReview = screen === 'review';
    content = html`
      <${GameScreen}
        title=${isReview ? '錯題補給任務' : '燃料補給與環島地圖'}
        subtitle=${isReview ? '只會出現答錯過的題目' : '答題賺燃料，想出發就出發'}
        state=${gameState}
        question=${currentQuestion}
        stations=${stations}
        isReview=${isReview}
        onPronounce=${pronounceQuestion}
        onSpeakResult=${handleAnswer}
        onImageAnswer=${handleAnswer}
        onDepart=${departTrain}
        onHome=${openHome}
      />
    `;
  }

  return html`
    <main className="app-shell">
      <div className="cloud cloud-one"></div>
      <div className="cloud cloud-two"></div>
      <div className="cloud cloud-three"></div>
      ${content}
      <${FeedbackToast} feedback=${feedback} />
    </main>
  `;
};
