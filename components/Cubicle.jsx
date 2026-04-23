import React, { useEffect, useState, useRef } from "react";
import Worker from "./cubeWorker?worker";

function Rubcsolution() {
  const [solution, setsolution] = useState([]);
  const [status, setStatus] = useState("Initializing solver... (this might take a few seconds)");
  const [inputString, setInputString] = useState("DLRUURRDDBDBRRLLLBDBLDFBUUFRRUUDDDFLLLFULFBFFUBFFBBURR");
  const [isReady, setIsReady] = useState(false);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker();
    
    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'INIT_DONE') {
        setIsReady(true);
        setStatus("Solver ready! Enter a cube string below.");
      } else if (e.data.type === 'SOLUTION') {
        setStatus("Solution found!");
        setsolution(e.data.solution.split(" "));
      } else if (e.data.type === 'ERROR') {
        setStatus("Error: " + e.data.error);
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleSolve = () => {
    if (!isReady) return;
    setStatus("Solving cube...");
    setsolution([]);
    workerRef.current.postMessage({
      type: 'SOLVE',
      string: inputString.toUpperCase()
    });
  };

  return (
    <div className="p-6 text-white max-w-2xl mx-auto">
      <div className="mb-4 text-xl font-bold">{status}</div>

      <div className="flex flex-col gap-3 mb-6">
        <label className="text-sm text-gray-300">
          Cube Facelet String (54 characters, exactly 9 of each: U, R, F, D, L, B)
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            placeholder="e.g. DLRUURRDDBDBRRLLLBDBLDFBUUFRRUUDDDFLLLFULFBFFUBFFBBURR"
            className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
          <button 
            onClick={handleSolve}
            disabled={!isReady}
            className={`px-6 py-2 rounded font-semibold transition-colors ${
              isReady 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Solve
          </button>
        </div>
      </div>

      {solution.length > 0 && (
        <div>
          <h3 className="text-lg mb-2 font-semibold text-gray-300">Moves ({solution.length}):</h3>
          <div className="flex flex-wrap gap-2">
            {solution.map((item, index) => (
              <div key={item + index} className="px-3 py-1 bg-blue-600 rounded shadow">
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Rubcsolution;