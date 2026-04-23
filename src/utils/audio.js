let audioContext;

const soundProfiles = {
  button: [
    { frequency: 620, duration: 0.08, type: 'triangle', gain: 0.05 },
    { frequency: 760, duration: 0.06, type: 'triangle', gain: 0.03, delay: 0.08 }
  ],
  correct: [
    { frequency: 523, duration: 0.1, type: 'sine', gain: 0.05 },
    { frequency: 659, duration: 0.1, type: 'sine', gain: 0.05, delay: 0.08 },
    { frequency: 784, duration: 0.14, type: 'sine', gain: 0.06, delay: 0.16 }
  ],
  train: [
    { frequency: 180, duration: 0.12, type: 'square', gain: 0.045 },
    { frequency: 160, duration: 0.12, type: 'square', gain: 0.04, delay: 0.1 },
    { frequency: 210, duration: 0.12, type: 'square', gain: 0.045, delay: 0.22 },
    { frequency: 160, duration: 0.14, type: 'square', gain: 0.04, delay: 0.34 }
  ],
  arrival: [
    { frequency: 392, duration: 0.11, type: 'triangle', gain: 0.05 },
    { frequency: 494, duration: 0.11, type: 'triangle', gain: 0.05, delay: 0.1 },
    { frequency: 587, duration: 0.14, type: 'triangle', gain: 0.05, delay: 0.2 },
    { frequency: 784, duration: 0.2, type: 'triangle', gain: 0.06, delay: 0.32 }
  ]
};

const getAudioContext = () => {
  if (audioContext) {
    return audioContext;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  audioContext = new AudioContextClass();
  return audioContext;
};

const playTone = (context, profile) => {
  const now = context.currentTime + (profile.delay || 0);
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = profile.type;
  oscillator.frequency.setValueAtTime(profile.frequency, now);
  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.linearRampToValueAtTime(profile.gain, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + profile.duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + profile.duration);
};

export const playSound = async (name) => {
  try {
    const context = getAudioContext();
    const profile = soundProfiles[name];
    if (!context || !profile) {
      return;
    }

    if (context.state === 'suspended') {
      await context.resume();
    }

    profile.forEach((tone) => playTone(context, tone));
  } catch {
    // 忽略不同瀏覽器對音訊 API 的限制
  }
};

export const speakText = (text) => {
  if (!('speechSynthesis' in window) || !text) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-TW';
  utterance.rate = 0.85;
  utterance.pitch = 1.1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};
