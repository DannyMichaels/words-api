const sample = (words: string[]): string => {
  return words[Math.floor(Math.random() * words.length)];
};

export default sample;
