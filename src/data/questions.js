const wordBank = [
  { key: 'apple', word: '蘋果', zhuyin: 'ㄆㄧㄥˊ ㄍㄨㄛˇ', emoji: '🍎', category: '水果' },
  { key: 'banana', word: '香蕉', zhuyin: 'ㄒㄧㄤ ㄐㄧㄠ', emoji: '🍌', category: '水果' },
  { key: 'grape', word: '葡萄', zhuyin: 'ㄆㄨˊ ㄊㄠˊ', emoji: '🍇', category: '水果' },
  { key: 'strawberry', word: '草莓', zhuyin: 'ㄘㄠˇ ㄇㄟˊ', emoji: '🍓', category: '水果' },
  { key: 'watermelon', word: '西瓜', zhuyin: 'ㄒㄧ ㄍㄨㄚ', emoji: '🍉', category: '水果' },
  { key: 'lion', word: '獅子', zhuyin: 'ㄕ ㄗˇ', emoji: '🦁', category: '動物' },
  { key: 'rabbit', word: '兔子', zhuyin: 'ㄊㄨˋ ㄗˇ', emoji: '🐰', category: '動物' },
  { key: 'panda', word: '熊貓', zhuyin: 'ㄒㄩㄥˊ ㄇㄠˊ', emoji: '🐼', category: '動物' },
  { key: 'elephant', word: '大象', zhuyin: 'ㄉㄚˋ ㄒㄧㄤˋ', emoji: '🐘', category: '動物' },
  { key: 'dolphin', word: '海豚', zhuyin: 'ㄏㄞˇ ㄊㄨㄣˊ', emoji: '🐬', category: '動物' },
  { key: 'train', word: '火車', zhuyin: 'ㄏㄨㄛˇ ㄔㄜ', emoji: '🚂', category: '交通工具' },
  { key: 'bus', word: '公車', zhuyin: 'ㄍㄨㄥ ㄔㄜ', emoji: '🚌', category: '交通工具' },
  { key: 'plane', word: '飛機', zhuyin: 'ㄈㄟ ㄐㄧ', emoji: '✈️', category: '交通工具' },
  { key: 'balloon', word: '氣球', zhuyin: 'ㄑㄧˋ ㄑㄧㄡˊ', emoji: '🎈', category: '玩具' },
  { key: 'schoolbag', word: '書包', zhuyin: 'ㄕㄨ ㄅㄠ', emoji: '🎒', category: '日常用品' },
  { key: 'pencil', word: '鉛筆', zhuyin: 'ㄑㄧㄢ ㄅㄧˇ', emoji: '✏️', category: '日常用品' },
  { key: 'umbrella', word: '雨傘', zhuyin: 'ㄩˇ ㄙㄢˇ', emoji: '☂️', category: '日常用品' },
  { key: 'cap', word: '帽子', zhuyin: 'ㄇㄠˋ ㄗˇ', emoji: '🧢', category: '日常用品' },
  { key: 'milk', word: '牛奶', zhuyin: 'ㄋㄧㄡˊ ㄋㄞˇ', emoji: '🥛', category: '食物' },
  { key: 'cake', word: '蛋糕', zhuyin: 'ㄉㄢˋ ㄍㄠ', emoji: '🎂', category: '食物' },
  { key: 'cookie', word: '餅乾', zhuyin: 'ㄅㄧㄥˇ ㄍㄢ', emoji: '🍪', category: '食物' },
  { key: 'rice', word: '米飯', zhuyin: 'ㄇㄧˇ ㄈㄢˋ', emoji: '🍚', category: '食物' },
  { key: 'red', word: '紅色', zhuyin: 'ㄏㄨㄥˊ ㄙㄜˋ', emoji: '❤️', category: '顏色' },
  { key: 'blue', word: '藍色', zhuyin: 'ㄌㄢˊ ㄙㄜˋ', emoji: '💙', category: '顏色' },
  { key: 'green', word: '綠色', zhuyin: 'ㄌㄩˋ ㄙㄜˋ', emoji: '💚', category: '顏色' }
];

const rotate = (items, count) => {
  if (!items.length) {
    return items;
  }

  const offset = count % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
};

const createImageChoices = (index) => {
  const answer = wordBank[index].zhuyin;
  const picks = [
    wordBank[(index + 3) % wordBank.length].zhuyin,
    wordBank[(index + 7) % wordBank.length].zhuyin,
    wordBank[(index + 11) % wordBank.length].zhuyin
  ];
  const uniqueChoices = Array.from(new Set([answer, ...picks]));
  return rotate(uniqueChoices, index);
};

const speakQuestions = wordBank.map((item) => ({
  ...item,
  id: `speak-${item.key}`,
  type: 'speak',
  prompt: '念念看這個注音',
  speechText: item.word
}));

const imageQuestions = wordBank.map((item, index) => ({
  ...item,
  id: `image-${item.key}`,
  type: 'image',
  prompt: '看圖找出正確注音',
  speechText: item.word,
  choices: createImageChoices(index),
  answer: item.zhuyin
}));

export const questions = [...speakQuestions, ...imageQuestions];
export const questionMap = Object.fromEntries(questions.map((question) => [question.id, question]));
