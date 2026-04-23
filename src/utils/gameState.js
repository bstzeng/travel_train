import { questions, questionMap } from '../data/questions.js';
import { FUEL_COST_PER_MOVE, stations } from '../data/stations.js';

const validQuestionIds = new Set(questions.map((question) => question.id));
const validStationIds = new Set(stations.map((station) => station.id));
const RECENT_WINDOW = 8;
const CATEGORY_WINDOW = 3;

const uniqueIds = (items) => Array.from(new Set((items || []).filter(Boolean)));
const getQuestionCategory = (id) => questionMap[id]?.category || null;

export const pickNextQuestionId = ({ currentQuestionId = null, recentQuestionIds = [], allowedIds = null }) => {
  const pool = allowedIds && allowedIds.length
    ? allowedIds
        .filter((id) => validQuestionIds.has(id))
        .map((id) => questionMap[id])
        .filter(Boolean)
    : questions;

  if (!pool.length) {
    return questions[0].id;
  }

  const recentSet = new Set(recentQuestionIds.slice(-RECENT_WINDOW));
  const currentCategory = getQuestionCategory(currentQuestionId);
  const recentCategories = new Set(
    recentQuestionIds
      .slice(-CATEGORY_WINDOW)
      .map((id) => getQuestionCategory(id))
      .filter(Boolean)
  );

  const isFreshId = (question) => question.id !== currentQuestionId && !recentSet.has(question.id);
  const isFreshCategory = (question) =>
    question.category !== currentCategory && !recentCategories.has(question.category);

  const tiers = [
    pool.filter((question) => isFreshId(question) && isFreshCategory(question)),
    pool.filter((question) => isFreshId(question) && question.category !== currentCategory),
    pool.filter((question) => isFreshId(question)),
    pool.filter((question) => question.id !== currentQuestionId && isFreshCategory(question)),
    pool.filter((question) => question.id !== currentQuestionId),
    pool
  ];

  const candidates = tiers.find((tier) => tier.length) || pool;
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  return picked.id;
};

export const createInitialGameState = () => {
  const firstQuestionId = pickNextQuestionId({});

  return {
    version: 1,
    currentStationIndex: 0,
    fuel: 0,
    streak: 0,
    badges: ['hsinchu-start'],
    wrongQuestionIds: [],
    reviewRemainingIds: [],
    currentQuestionId: firstQuestionId,
    recentQuestionIds: [firstQuestionId],
    journeyComplete: false,
    reviewComplete: false,
    lastScreen: 'game',
    lastArrivedStationId: 'hsinchu-start',
    stats: {
      correct: 0,
      incorrect: 0,
      questionsSeen: 0,
      moves: 0
    }
  };
};

export const sanitizeState = (rawState) => {
  if (!rawState || typeof rawState !== 'object') {
    return createInitialGameState();
  }

  const initialState = createInitialGameState();
  const wrongQuestionIds = uniqueIds(rawState.wrongQuestionIds).filter((id) => validQuestionIds.has(id));
  const reviewRemainingIds = uniqueIds(rawState.reviewRemainingIds).filter((id) => validQuestionIds.has(id));
  const currentQuestionId = validQuestionIds.has(rawState.currentQuestionId)
    ? rawState.currentQuestionId
    : initialState.currentQuestionId;
  const recentQuestionIds = uniqueIds(rawState.recentQuestionIds).filter((id) => validQuestionIds.has(id));
  const badges = uniqueIds(rawState.badges).filter((id) => validStationIds.has(id));
  const currentStationIndex = Number.isInteger(rawState.currentStationIndex)
    ? Math.max(0, Math.min(stations.length - 1, rawState.currentStationIndex))
    : 0;
  const moves = Number.isFinite(rawState?.stats?.moves) ? Math.max(0, rawState.stats.moves) : 0;

  return {
    ...initialState,
    ...rawState,
    currentStationIndex,
    fuel: Number.isFinite(rawState.fuel) ? Math.max(0, rawState.fuel) : 0,
    streak: Number.isFinite(rawState.streak) ? Math.max(0, rawState.streak) : 0,
    badges: badges.length ? badges : ['hsinchu-start'],
    wrongQuestionIds,
    reviewRemainingIds,
    currentQuestionId,
    recentQuestionIds: recentQuestionIds.length ? recentQuestionIds : [currentQuestionId],
    journeyComplete: currentStationIndex >= stations.length - 1 || Boolean(rawState.journeyComplete),
    reviewComplete: Boolean(rawState.reviewComplete),
    lastScreen: ['game', 'arrival', 'complete', 'review'].includes(rawState.lastScreen)
      ? rawState.lastScreen
      : 'game',
    lastArrivedStationId: validStationIds.has(rawState.lastArrivedStationId)
      ? rawState.lastArrivedStationId
      : stations[currentStationIndex].id,
    stats: {
      correct: Number.isFinite(rawState?.stats?.correct) ? Math.max(0, rawState.stats.correct) : 0,
      incorrect: Number.isFinite(rawState?.stats?.incorrect) ? Math.max(0, rawState.stats.incorrect) : 0,
      questionsSeen: Number.isFinite(rawState?.stats?.questionsSeen)
        ? Math.max(0, rawState.stats.questionsSeen)
        : 0,
      moves
    }
  };
};

export const getNextQuestionAfterAnswer = (state, screen) => {
  const allowedIds = screen === 'review' ? state.reviewRemainingIds : null;
  return pickNextQuestionId({
    currentQuestionId: state.currentQuestionId,
    recentQuestionIds: state.recentQuestionIds,
    allowedIds
  });
};

export const appendRecentQuestion = (recentQuestionIds, nextQuestionId) => {
  const recent = [...recentQuestionIds, nextQuestionId];
  return recent.slice(-RECENT_WINDOW);
};

export const travelToNextStation = (state) => {
  const isJourneyDone = state.currentStationIndex >= stations.length - 1;
  if (state.fuel < FUEL_COST_PER_MOVE || isJourneyDone) {
    return {
      nextState: state,
      arrivedStation: stations[state.currentStationIndex]
    };
  }

  const nextStationIndex = Math.min(state.currentStationIndex + 1, stations.length - 1);
  const arrivedStation = stations[nextStationIndex];
  const nextBadges = uniqueIds([...state.badges, arrivedStation.id]);

  return {
    arrivedStation,
    nextState: {
      ...state,
      fuel: state.fuel - FUEL_COST_PER_MOVE,
      currentStationIndex: nextStationIndex,
      badges: nextBadges,
      journeyComplete: nextStationIndex >= stations.length - 1,
      lastArrivedStationId: arrivedStation.id,
      stats: {
        ...state.stats,
        moves: state.stats.moves + 1
      }
    }
  };
};
