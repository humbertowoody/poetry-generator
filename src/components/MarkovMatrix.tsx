import React from "react";

interface MarkovMatrixProps {
  matrix: { [key: string]: { [key: string]: number } };
}

const MarkovMatrix: React.FC<MarkovMatrixProps> = ({ matrix }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Markov Transition Matrix</h2>
      <pre className="whitespace-pre-wrap text-xs bg-transparent p-4 rounded">
        {JSON.stringify(matrix, null, 2)}
      </pre>
    </div>
  );
};

export default MarkovMatrix;
