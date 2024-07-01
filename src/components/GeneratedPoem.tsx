import React from "react";

interface GeneratedPoemProps {
  poem: string;
  onGeneratePoem: () => void;
}

const GeneratedPoem: React.FC<GeneratedPoemProps> = ({
  poem,
  onGeneratePoem,
}) => {
  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">Generated Poem</h2>
      <p className="whitespace-pre-wrap text-sm">{poem}</p>
      <button
        onClick={onGeneratePoem}
        className="mt-2 p-2 bg-green-500 text-white rounded"
      >
        Generate Another Poem
      </button>
    </div>
  );
};

export default GeneratedPoem;
