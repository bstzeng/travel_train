const wordBank = [
  { key: 'apple', word: '蘋果', zhuyin: 'ㄆㄧㄥˊ ㄍㄨㄛˇ', emoji: '🍎', category: '水果' },
  { key: 'banana', word: '香蕉', zhuyin: 'ㄒㄧㄤ ㄐㄧㄠ', emoji: '🍌', category: '水果' },
  { key: 'grape', word: '葡萄', zhuyin: 'ㄆㄨˊ ㄊㄠˊ', emoji: '🍇', category: '水果' },
  { key: 'strawberry', word: '草莓', zhuyin: 'ㄘㄠˇ ㄇㄟˊ', emoji: '🍓', category: '水果' },
  { key: 'watermelon', word: '西瓜', zhuyin: 'ㄒㄧ ㄍㄨㄚ', emoji: '🍉', category: '水果' },

  { key: 'rabbit', word: '兔子', zhuyin: 'ㄊㄨˋ ㄗˇ', emoji: '🐰', category: '動物' },
  { key: 'lion', word: '獅子', zhuyin: 'ㄕ ㄗˇ', emoji: '🦁', category: '動物' },
  { key: 'panda', word: '熊貓', zhuyin: 'ㄒㄩㄥˊ ㄇㄠ', emoji: '🐼', category: '動物' },
  { key: 'dolphin', word: '海豚', zhuyin: 'ㄏㄞˇ ㄊㄨㄣˊ', emoji: '🐬', category: '動物' },
  { key: 'penguin', word: '企鵝', zhuyin: 'ㄑㄧˇ ㄜˊ', emoji: '🐧', category: '動物' },

  { key: 'train', word: '火車', zhuyin: 'ㄏㄨㄛˇ ㄔㄜ', emoji: '🚂', category: '交通工具' },
  { key: 'bus', word: '公車', zhuyin: 'ㄍㄨㄥ ㄔㄜ', emoji: '🚌', category: '交通工具' },
  { key: 'plane', word: '飛機', zhuyin: 'ㄈㄟ ㄐㄧ', emoji: '✈️', category: '交通工具' },
  { key: 'bicycle', word: '腳踏車', zhuyin: 'ㄐㄧㄠˇ ㄊㄚˋ ㄔㄜ', emoji: '🚲', category: '交通工具' },
  { key: 'boat', word: '小船', zhuyin: 'ㄒㄧㄠˇ ㄔㄨㄢˊ', emoji: '⛵', category: '交通工具' },

  { key: 'schoolbag', word: '書包', zhuyin: 'ㄕㄨ ㄅㄠ', emoji: '🎒', category: '日常用品' },
  { key: 'pencil', word: '鉛筆', zhuyin: 'ㄑㄧㄢ ㄅㄧˇ', emoji: '✏️', category: '日常用品' },
  { key: 'cap', word: '帽子', zhuyin: 'ㄇㄠˋ ㄗˇ', emoji: '🧢', category: '日常用品' },
  { key: 'umbrella', word: '雨傘', zhuyin: 'ㄩˇ ㄙㄢˇ', emoji: '☂️', category: '日常用品' },
  { key: 'cup', word: '杯子', zhuyin: 'ㄅㄟ ㄗˇ', emoji: '🥤', category: '日常用品' },

  { key: 'milk', word: '牛奶', zhuyin: 'ㄋㄧㄡˊ ㄋㄞˇ', emoji: '🥛', category: '食物' },
  { key: 'cake', word: '蛋糕', zhuyin: 'ㄉㄢˋ ㄍㄠ', emoji: '🎂', category: '食物' },
  { key: 'cookie', word: '餅乾', zhuyin: 'ㄅㄧㄥˇ ㄍㄢ', emoji: '🍪', category: '食物' },
  { key: 'rice', word: '米飯', zhuyin: 'ㄇㄧˇ ㄈㄢˋ', emoji: '🍚', category: '食物' },
  { key: 'bread', word: '麵包', zhuyin: 'ㄇㄧㄢˋ ㄅㄠ', emoji: '🍞', category: '食物' },

  { key: 'red', word: '紅色', zhuyin: 'ㄏㄨㄥˊ ㄙㄜˋ', emoji: '❤️', category: '顏色' },
  { key: 'blue', word: '藍色', zhuyin: 'ㄌㄢˊ ㄙㄜˋ', emoji: '💙', category: '顏色' },
  { key: 'green', word: '綠色', zhuyin: 'ㄌㄩˋ ㄙㄜˋ', emoji: '💚', category: '顏色' },
  { key: 'yellow', word: '黃色', zhuyin: 'ㄏㄨㄤˊ ㄙㄜˋ', emoji: '💛', category: '顏色' },
  { key: 'white', word: '白色', zhuyin: 'ㄅㄞˊ ㄙㄜˋ', emoji: '🤍', category: '顏色' },

  { key: 'eyes', word: '眼睛', zhuyin: 'ㄧㄢˇ ㄐㄧㄥ', emoji: '👀', category: '身體部位' },
  { key: 'ears', word: '耳朵', zhuyin: 'ㄦˇ ㄉㄨㄛˇ', emoji: '👂', category: '身體部位' },
  { key: 'mouth', word: '嘴巴', zhuyin: 'ㄗㄨㄟˇ ㄅㄚ', emoji: '👄', category: '身體部位' },
  { key: 'nose', word: '鼻子', zhuyin: 'ㄅㄧˊ ㄗˇ', emoji: '👃', category: '身體部位' },
  { key: 'belly', word: '肚子', zhuyin: 'ㄉㄨˋ ㄗˇ', emoji: '🫄', category: '身體部位' },

  { key: 'table', word: '桌子', zhuyin: 'ㄓㄨㄛ ㄗˇ', emoji: '🪑', category: '家裡物品' },
  { key: 'chair', word: '椅子', zhuyin: 'ㄧˇ ㄗˇ', emoji: '🪑', category: '家裡物品' },
  { key: 'pillow', word: '枕頭', zhuyin: 'ㄓㄣˇ ㄊㄡˊ', emoji: '🛏️', category: '家裡物品' },
  { key: 'quilt', word: '棉被', zhuyin: 'ㄇㄧㄢˊ ㄅㄟˋ', emoji: '🛌', category: '家裡物品' },
  { key: 'toothbrush', word: '牙刷', zhuyin: 'ㄧㄚˊ ㄕㄨㄚ', emoji: '🪥', category: '家裡物品' },

  { key: 'teacher', word: '老師', zhuyin: 'ㄌㄠˇ ㄕ', emoji: '🧑‍🏫', category: '學校教室' },
  { key: 'classmate', word: '同學', zhuyin: 'ㄊㄨㄥˊ ㄒㄩㄝˊ', emoji: '🧒', category: '學校教室' },
  { key: 'blackboard', word: '黑板', zhuyin: 'ㄏㄟ ㄅㄢˇ', emoji: '⬛', category: '學校教室' },
  { key: 'scissors', word: '剪刀', zhuyin: 'ㄐㄧㄢˇ ㄉㄠ', emoji: '✂️', category: '學校教室' },
  { key: 'ruler', word: '尺子', zhuyin: 'ㄔˇ ㄗˇ', emoji: '📏', category: '學校教室' },

  { key: 'park', word: '公園', zhuyin: 'ㄍㄨㄥ ㄩㄢˊ', emoji: '🛝', category: '場所空間' },
  { key: 'classroom', word: '教室', zhuyin: 'ㄐㄧㄠˋ ㄕˋ', emoji: '🏫', category: '場所空間' },
  { key: 'kitchen', word: '廚房', zhuyin: 'ㄔㄨˊ ㄈㄤˊ', emoji: '🍳', category: '場所空間' },
  { key: 'bathroom', word: '浴室', zhuyin: 'ㄩˋ ㄕˋ', emoji: '🛁', category: '場所空間' },
  { key: 'station', word: '車站', zhuyin: 'ㄔㄜ ㄓㄢˋ', emoji: '🚉', category: '場所空間' },

  { key: 'sun', word: '太陽', zhuyin: 'ㄊㄞˋ ㄧㄤˊ', emoji: '☀️', category: '天氣自然' },
  { key: 'moon', word: '月亮', zhuyin: 'ㄩㄝˋ ㄌㄧㄤˋ', emoji: '🌙', category: '天氣自然' },
  { key: 'cloud', word: '白雲', zhuyin: 'ㄅㄞˊ ㄩㄣˊ', emoji: '☁️', category: '天氣自然' },
  { key: 'flower', word: '花朵', zhuyin: 'ㄏㄨㄚ ㄉㄨㄛˇ', emoji: '🌸', category: '天氣自然' },
  { key: 'leaf', word: '樹葉', zhuyin: 'ㄕㄨˋ ㄧㄝˋ', emoji: '🍃', category: '天氣自然' },

  { key: 'bubble-tea', word: '珍奶', zhuyin: 'ㄓㄣ ㄋㄞˇ', emoji: '🧋', category: '台灣旅行' },
  { key: 'night-market', word: '夜市', zhuyin: 'ㄧㄝˋ ㄕˋ', emoji: '🏮', category: '台灣旅行' },
  { key: 'sky-lantern', word: '天燈', zhuyin: 'ㄊㄧㄢ ㄉㄥ', emoji: '🏮', category: '台灣旅行' },
  { key: 'xiaolongbao', word: '小籠包', zhuyin: 'ㄒㄧㄠˇ ㄌㄨㄥˊ ㄅㄠ', emoji: '🥟', category: '台灣旅行' },
  { key: 'lighthouse', word: '燈塔', zhuyin: 'ㄉㄥ ㄊㄚˇ', emoji: '🗼', category: '台灣旅行' },

  { key: 'wash-hands', word: '洗手', zhuyin: 'ㄒㄧˇ ㄕㄡˇ', emoji: '🧼', category: '生活動作' },
  { key: 'brush-teeth', word: '刷牙', zhuyin: 'ㄕㄨㄚ ㄧㄚˊ', emoji: '🪥', category: '生活動作' },
  { key: 'eat-rice', word: '吃飯', zhuyin: 'ㄔ ㄈㄢˋ', emoji: '🍽️', category: '生活動作' },
  { key: 'sleep', word: '睡覺', zhuyin: 'ㄕㄨㄟˋ ㄐㄧㄠˋ', emoji: '😴', category: '生活動作' },
  { key: 'draw', word: '畫畫', zhuyin: 'ㄏㄨㄚˋ ㄏㄨㄚˋ', emoji: '🎨', category: '生活動作' }
];

const rotate = (items, count) => {
  if (!items.length) {
    return items;
  }

  const offset = count % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
};

const pickFromSameCategory = (index) => {
  const item = wordBank[index];
  const siblings = wordBank.filter((candidate) => candidate.category === item.category && candidate.key !== item.key);
  return siblings.length ? siblings[index % siblings.length].zhuyin : null;
};

const createImageChoices = (index) => {
  const answer = wordBank[index].zhuyin;
  const candidateZhuyin = [
    answer,
    pickFromSameCategory(index),
    wordBank[(index + 7) % wordBank.length].zhuyin,
    wordBank[(index + 17) % wordBank.length].zhuyin,
    wordBank[(index + 29) % wordBank.length].zhuyin
  ].filter(Boolean);

  const uniqueChoices = Array.from(new Set(candidateZhuyin)).slice(0, 4);

  if (uniqueChoices.length < 4) {
    wordBank.forEach((item) => {
      if (uniqueChoices.length < 4 && !uniqueChoices.includes(item.zhuyin)) {
        uniqueChoices.push(item.zhuyin);
      }
    });
  }

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

export const wordBankCategories = Array.from(new Set(wordBank.map((item) => item.category)));
export const questions = [...speakQuestions, ...imageQuestions];
export const questionMap = Object.fromEntries(questions.map((question) => [question.id, question]));
