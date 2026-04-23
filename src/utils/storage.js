export const STORAGE_KEY = 'bopomofo-train-journey:v1';

export const loadPersistedState = () => {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

export const persistState = (state) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage 失敗時，仍讓遊戲繼續運作
  }
};

export const clearPersistedState = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 忽略瀏覽器限制
  }
};
