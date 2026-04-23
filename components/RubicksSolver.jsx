import React, { useState } from 'react';
import Cube from 'cubejs';

// Initialize the solver algorithm
Cube.initSolver();

const RubiksSolver = ({ top, left, right, bottom, front, back, moveFunctions }) => {
  const [solutionMoves, setSolutionMoves] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSolution = () => {
    setLoading(true);

    const colorMap = {
      [top[4]]: 'U',
      [right[4]]: 'R',
      [front[4]]: 'F',
      [bottom[4]]: 'D',
      [left[4]]: 'L',
      [back[4]]: 'B'
    };

    // Correct mapping based on Cubefunc.jsx move indices
    const buttonMap = {
      "U": "3", "U'": "6",
      "D": "4", "D'": "1",
      "L": "18", "L'": "13",
      "R": "15", "R'": "16",
      "F": "10", "F'": "9",
      "B": "7", "B'": "12"
    };

    try {
      const cubeString = [
        ...top.map(c => colorMap[c]),
        ...right.map(c => colorMap[c]),
        ...front.map(c => colorMap[c]),
        ...bottom.map(c => colorMap[c]),
        ...left.map(c => colorMap[c]),
        ...back.map(c => colorMap[c])
      ].join('');
      console.log("Cube String:", cubeString);  
      const cube = Cube.fromString(cubeString);

      if (cube.isSolved()) {
        console.log("Cube is already solved!");
        setSolutionMoves([{ notation: "✓", button: "a3", label: "Solved", isDouble: false }]);
      } else {
        const rawSolution = cube.solve();
        console.log("Raw Solution:", rawSolution);
        const mapped = rawSolution.split(" ").map(move => {
          const isDouble = move.endsWith("2");
          const baseMove = isDouble ? move.slice(0, -1) : move;
          return {
            notation: move,
            button: `a${buttonMap[baseMove]}`,
            label: `a${buttonMap[baseMove]}${isDouble ? ' x2' : ''}`,
            isDouble: isDouble
          };
        });
        setSolutionMoves(mapped);
      }
    } catch (e) {
      console.error(e);
      setSolutionMoves([{ notation: "Error", button: "err", label: "Invalid State", isDouble: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white/10 p-3 pl-6 rounded-full backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300">
      <button
        onClick={generateSolution}
        disabled={loading}
        className="whitespace-nowrap bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-6 rounded-full text-sm transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Solve"}
      </button>

      {solutionMoves.length > 0 && <div className="h-8 w-[1px] bg-white/20" />}

      <div className="flex gap-1.5">
        {solutionMoves.length > 0 ? (
          solutionMoves.map((step, i) => (
            <button
              onClick={() => {
                if (step.button === "err") return;
                moveFunctions[step.button]?.();
                if (step.isDouble) setTimeout(() => moveFunctions[step.button]?.(), 250);
              }}
              key={i}
              className="flex-shrink-0 bg-white/5 hover:bg-white/20 border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 transition-all group"
            >
              <span className="text-[9px] text-purple-300 font-mono group-hover:text-white">{i + 1}</span>
              <span className="font-bold text-[11px]">{step.notation}</span>
            </button>
          ))
        ) : (
          <div className="text-gray-400 text-[10px] px-2 whitespace-nowrap italic flex items-center gap-2">
            <span className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
            Ready
          </div>
        )}
      </div>
    </div>
  );
};

export default RubiksSolver;