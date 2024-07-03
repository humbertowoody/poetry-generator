"use client";
import { useState } from "react";
import PoemInput from "../components/PoemInput";
import MarkovMatrix from "../components/MarkovMatrix";
import GeneratedPoem from "../components/GeneratedPoem";
import { buildMarkovChain, generatePoem } from "../utils/markovChain";
import Graph from "@/components/Graph";
import Heatmap from "@/components/Heatmap";

const Home = () => {
  const [matrix, setMatrix] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [generatedPoem, setGeneratedPoem] = useState<string>("");

  const handlePoemSubmit = (poem: string) => {
    // Sanitize the input
    poem = poem.replace(/[^a-zA-Z\s]/g, "").toLowerCase();

    const markovChain = buildMarkovChain(poem);
    setMatrix(markovChain);
    setGeneratedPoem(generatePoem(markovChain));
  };

  const handleGeneratePoem = () => {
    setGeneratedPoem(generatePoem(matrix));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Poetry Generator</h1>

      <p className="mb-4">
        Enter a poem below to generate a new poem using a simple{" "}
        <a
          href="https://en.wikipedia.org/wiki/Markov_chain"
          className="text-blue-500"
          target="_blank"
        >
          Markov chain
        </a>
        .
      </p>

      <PoemInput onPoemSubmit={handlePoemSubmit} />

      {Object.keys(matrix).length > 0 && (
        <>
          <MarkovMatrix matrix={matrix} />

          <Heatmap matrix={matrix} />

          <Graph data={matrix} />

          <GeneratedPoem
            poem={generatedPoem}
            onGeneratePoem={handleGeneratePoem}
          />
        </>
      )}

      <footer className="mt-auto text-center text-sm border-t pt-4">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://humbertowoody.xyz"
            className="text-blue-500"
            target="_blank"
          >
            Humberto Alcocer{" "}
          </a>
          in {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Home;
