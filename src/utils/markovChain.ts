export const buildMarkovChain = (text: string) => {
  const words: string[] = text.split(/\s+/);
  const markovChain: { [key: string]: { [key: string]: number } } = {};

  for (let i = 0; i < words.length - 1; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    if (!markovChain[word]) {
      markovChain[word] = {};
    }
    if (!markovChain[word][nextWord]) {
      markovChain[word][nextWord] = 0;
    }
    markovChain[word][nextWord]++;
  }

  return markovChain;
};

export const generatePoem = (
  chain: { [key: string]: { [key: string]: number } },
  length: number = 50,
) => {
  const words = Object.keys(chain);
  let word = words[Math.floor(Math.random() * words.length)];
  let poem = word;

  for (let i = 0; i < length - 1; i++) {
    const nextWords = chain[word];
    const nextWord = chooseNextWord(nextWords);
    poem += " " + nextWord;
    word = nextWord;
    if (!chain[word]) {
      // If we can't find the next word, choose a random word
      // from the list of words
      //word = words[Math.floor(Math.random() * words.length)];
      break;
    }
  }

  // Capitalize the first letter of the poem
  poem = poem.charAt(0).toUpperCase() + poem.slice(1);

  // Add a period at the end of the poem
  poem += ".";

  return poem;
};

const chooseNextWord = (nextWords: { [key: string]: number }) => {
  const words = Object.keys(nextWords);
  const weights = Object.values(nextWords);
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

  let random = Math.random() * totalWeight;
  for (let i = 0; i < words.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return words[i];
    }
  }

  return words[words.length - 1];
};
