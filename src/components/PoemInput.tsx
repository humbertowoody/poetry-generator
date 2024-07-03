import React, { useState } from "react";

interface PoemInputProps {
  onPoemSubmit: (poem: string) => void;
}

// Some poems to get the user started.
const poems = [
  {
    kind: "haiku",
    poem: "An old silent pond...\nA frog jumps into the pond—\nSplash! Silence again.",
  },
  {
    kind: "couplet",
    poem: "The sun sets in the west,\nAnd birds return to their nest.",
  },
  {
    kind: "tanka",
    poem: "Over the wintry\nforest, winds howl in rage\nwith no leaves to blow.\nThen, the truth emerges clear:\nThere is only you and me.",
  },
  {
    kind: "free verse",
    poem: "The moon whispers secrets\nto the silent sea,\nwaves carry dreams\nto shores unseen.",
  },
  {
    kind: "limerick",
    poem: "There once was a man from Peru,\nWho dreamt he was eating his shoe.\nHe woke with a fright\nIn the middle of the night\nAnd found that his dream had come true.",
  },
  {
    kind: "sonnet",
    poem: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date:\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm'd;\nAnd every fair from fair sometime declines,\nBy chance or nature's changing course untrimm'd;\nBut thy eternal summer shall not fade\nNor lose possession of that fair thou owest;\nNor shall Death brag thou wanderest in his shade,\nWhen in eternal lines to time thou growest:\nSo long as men can breathe or eyes can see,\nSo long lives this, and this gives life to thee.",
  },
  {
    kind: "ballad",
    poem: "It was many and many a year ago,\nIn a kingdom by the sea,\nThat a maiden there lived whom you may know\nBy the name of Annabel Lee;\nAnd this maiden she lived with no other thought\nThan to love and be loved by me.\nI was a child and she was a child,\nIn this kingdom by the sea;\nBut we loved with a love that was more than love—\nI and my Annabel Lee—\nWith a love that the winged seraphs of heaven\nCoveted her and me.",
  },
  {
    kind: "ode",
    poem: "Ode to a Nightingale\nMy heart aches, and a drowsy numbness pains\nMy sense, as though of hemlock I had drunk,\nOr emptied some dull opiate to the drains\nOne minute past, and Lethe-wards had sunk:\n'Tis not through envy of thy happy lot,\nBut being too happy in thine happiness,—\nThat thou, light-winged Dryad of the trees\nIn some melodious plot\nOf beechen green, and shadows numberless,\nSingest of summer in full-throated ease.",
  },
];

const PoemInput: React.FC<PoemInputProps> = ({ onPoemSubmit }) => {
  const [poem, setPoem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPoemSubmit(poem);
  };

  const setRandomPoem = () => {
    const randomPoem = poems[Math.floor(Math.random() * poems.length)];

    setPoem(randomPoem.poem);

    onPoemSubmit(randomPoem.poem);

    console.log(`Random ${randomPoem.kind} poem set`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={poem}
        onChange={(e) => setPoem(e.target.value)}
        placeholder="Roses are red, violets are blue, a poem goes here, and so do you."
        className="w-full p-2 border border-black dark:border-white bg-transparent text-black dark:text-white rounded"
        rows={5}
      />
      <button
        type="submit"
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        disabled={!poem.trim()}
      >
        Generate Markov Chain&apos;s Transition Matrix
      </button>

      <button
        type="button"
        className="mt-2 p-2 ml-2 bg-gray-500 text-white rounded"
        onClick={() => setRandomPoem()}
      >
        Set Random Poem
      </button>
    </form>
  );
};

export default PoemInput;
