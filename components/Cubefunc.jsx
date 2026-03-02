

import React, { useEffect, useState, useRef } from 'react';
import Cube from './Cube.jsx';
import Cookies from "js-cookie";
import OpenedCubeView from './Opencube.jsx';

function Cubefunc() {
  const [activeTab, setActiveTab] = useState("cube");

  const cubeRef = useRef(null);
  const [top, setTop] = useState(["y", "y", "y", "y", "y", "y", "y", "y", "y"]);
  const [left, setLeft] = useState(["o", "o", "o", "o", "o", "o", "o", "o", "o"]);
  const [right, setRight] = useState(["r", "r", "r", "r", "r", "r", "r", "r", "r"]);
  const [bottom, setBottom] = useState(["w", "w", "w", "w", "w", "w", "w", "w", "w"]);
  const [front, setFront] = useState(["g", "g", "g", "g", "g", "g", "g", "g", "g"]);
  const [back, setBack] = useState(["b", "b", "b", "b", "b", "b", "b", "b", "b"]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [moveStack, setMoveStack] = useState([]);

  // 1. Add this state at the top of your Cubefunc component


  const moves = {
    a1: "a4", a6: "a3", a2: "a5", a5: "a2", a3: "a6", a4: "a1",
    a7: "a12", a12: "a7", a8: "a10", a11: "a9", a9: "a11", a10: "a8",
    a13: "a18", a18: "a13", a14: "a17", a17: "a14", a15: "a16", a16: "a15",
  };

  const defaultState = {
    top: ["y", "y", "y", "y", "y", "y", "y", "y", "y"],
    left: ["o", "o", "o", "o", "o", "o", "o", "o", "o"],
    right: ["r", "r", "r", "r", "r", "r", "r", "r", "r"],
    bottom: ["w", "w", "w", "w", "w", "w", "w", "w", "w"],
    front: ["g", "g", "g", "g", "g", "g", "g", "g", "g"],
    back: ["b", "b", "b", "b", "b", "b", "b", "b", "b"],
  };

  const resetCube = () => {
    setTop(defaultState.top);
    setLeft(defaultState.left);
    setRight(defaultState.right);
    setBottom(defaultState.bottom);
    setFront(defaultState.front);
    setBack(defaultState.back);
    Cookies.remove("rubiksCube");
  };

  useEffect(() => {
    if (!isLoaded) return;
    const data = { top, left, right, bottom, front, back };
    Cookies.set("rubiksCube", JSON.stringify(data), { expires: 7 });
  }, [top, left, right, bottom, front, back, isLoaded]);

  useEffect(() => {
    const saved = Cookies.get("rubiksCube");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTop(parsed.top);
      setLeft(parsed.left);
      setRight(parsed.right);
      setBottom(parsed.bottom);
      setFront(parsed.front);
      setBack(parsed.back);
    }
    setIsLoaded(true);
  }, []);

  const ColorDot = ({ color, index }) => (
    <div
      className={`w-5 h-5 rounded-full text-black text-center font-bold ${
        color === "r" ? "bg-red-500" :
        color === "y" ? "bg-yellow-400" :
        color === "g" ? "bg-green-500" :
        color === "b" ? "bg-blue-500" :
        color === "o" ? "bg-orange-500" : "bg-white"
      }`}
    >{index}</div>
  );

  const sift = (a, setA, aIdx, b, setB, bIdx, c, setC, cIdx, d, setD, dIdx) => {
    const A = [...a], B = [...b], C = [...c], D = [...d];
    const temp = dIdx.map(i => D[i]);
    dIdx.forEach((di, i) => { D[di] = C[cIdx[i]]; });
    cIdx.forEach((ci, i) => { C[ci] = B[bIdx[i]]; });
    bIdx.forEach((bi, i) => { B[bi] = A[aIdx[i]]; });
    aIdx.forEach((ai, i) => { A[ai] = temp[i]; });
    setA(A); setB(B); setC(C); setD(D);
  };

  const a1 = () => { sift(right, setRight, [6, 7, 8], front, setFront, [6, 7, 8], left, setLeft, [6, 7, 8], back, setBack, [6, 7, 8]); setMoveStack(prev => [...prev, "a1"]); };
  const a2 = () => { sift(right, setRight, [3, 4, 5], front, setFront, [3, 4, 5], left, setLeft, [3, 4, 5], back, setBack, [3, 4, 5]); setMoveStack(prev => [...prev, "a2"]); };
  const a3 = () => { sift(right, setRight, [0, 1, 2], front, setFront, [0, 1, 2], left, setLeft, [0, 1, 2], back, setBack, [0, 1, 2]); setMoveStack(prev => [...prev, "a3"]); };
  const a4 = () => { sift(back, setBack, [6, 7, 8], left, setLeft, [6, 7, 8], front, setFront, [6, 7, 8], right, setRight, [6, 7, 8]); setMoveStack(prev => [...prev, "a4"]); };
  const a5 = () => { sift(back, setBack, [3, 4, 5], left, setLeft, [3, 4, 5], front, setFront, [3, 4, 5], right, setRight, [3, 4, 5]); setMoveStack(prev => [...prev, "a5"]); };
  const a6 = () => { sift(back, setBack, [0, 1, 2], left, setLeft, [0, 1, 2], front, setFront, [0, 1, 2], right, setRight, [0, 1, 2]); setMoveStack(prev => [...prev, "a6"]); };
  const a7 = () => { sift(right, setRight, [2, 5, 8], top, setTop, [0, 1, 2], left, setLeft, [0, 3, 6], bottom, setBottom, [6, 7, 8]); setMoveStack(prev => [...prev, "a7"]); };
  const a8 = () => { sift(right, setRight, [1, 4, 7], top, setTop, [3, 4, 5], left, setLeft, [1, 4, 7], bottom, setBottom, [3, 4, 5]); setMoveStack(prev => [...prev, "a8"]); };
  const a9 = () => { sift(right, setRight, [0, 3, 6], top, setTop, [6, 7, 8], left, setLeft, [2, 5, 8], bottom, setBottom, [0, 1, 2]); setMoveStack(prev => [...prev, "a9"]); };
  const a10 = () => { sift(bottom, setBottom, [3, 4, 5], left, setLeft, [1, 4, 7], top, setTop, [3, 4, 5], right, setRight, [1, 4, 7]); setMoveStack(prev => [...prev, "a10"]); };
  const a11 = () => { sift(bottom, setBottom, [0, 1, 2], left, setLeft, [2, 5, 8], top, setTop, [6, 7, 8], right, setRight, [0, 3, 6]); setMoveStack(prev => [...prev, "a11"]); };
  const a12 = () => { sift(bottom, setBottom, [6, 7, 8], left, setLeft, [0, 3, 6], top, setTop, [0, 1, 2], right, setRight, [2, 5, 8]); setMoveStack(prev => [...prev, "a12"]); };
  const a13 = () => { sift(bottom, setBottom, [0, 3, 6], front, setFront, [0, 3, 6], top, setTop, [0, 3, 6], back, setBack, [2, 5, 8]); setMoveStack(prev => [...prev, "a13"]); };
  const a14 = () => { sift(bottom, setBottom, [1, 4, 7], front, setFront, [1, 4, 7], top, setTop, [1, 4, 7], back, setBack, [1, 4, 7]); setMoveStack(prev => [...prev, "a14"]); };
  const a15 = () => { sift(bottom, setBottom, [2, 5, 8], front, setFront, [2, 5, 8], top, setTop, [2, 5, 8], back, setBack, [0, 3, 6]); setMoveStack(prev => [...prev, "a15"]); };
  const a16 = () => { sift(back, setBack, [0, 3, 6], top, setTop, [2, 5, 8], front, setFront, [2, 5, 8], bottom, setBottom, [2, 5, 8]); setMoveStack(prev => [...prev, "a16"]); };
  const a17 = () => { sift(back, setBack, [1, 4, 7], top, setTop, [1, 4, 7], front, setFront, [1, 4, 7], bottom, setBottom, [1, 4, 7]); setMoveStack(prev => [...prev, "a17"]); };
  const a18 = () => { sift(back, setBack, [2, 5, 8], top, setTop, [0, 3, 6], front, setFront, [0, 3, 6], bottom, setBottom, [0, 3, 6]); setMoveStack(prev => [...prev, "a18"]); };

  const moveFunctions = { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18 };

  const undo = () => {
    if (moveStack.length === 0) return;
    const lastMove = moveStack.at(-1);
    const inverseName = moves[lastMove];
    const inverseFunc = moveFunctions[inverseName];
    inverseFunc?.();
    setMoveStack(prev => prev.slice(0, -2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Navigation Tabs */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex gap-4 bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20">
        <button 
          onClick={() => setActiveTab("cube")}
          className={`px-6 py-2 rounded-full transition ${activeTab === "cube" ? "bg-purple-600 shadow-lg shadow-purple-500/50" : "hover:bg-white/10"}`}
        >
          Cube Solver
        </button>

        <div className="flex flex-col items-center justify-center h-full">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-2 rounded-lg text-center">
                <p className="text-gray-400">Total Moves {moveStack.length}</p>
                </div>
                <div className="bg-white/5 p-2 rounded-lg text-center">
                <p className="text-gray-400">Current Session</p>
                <p className="text-xl font-mono"> </p>
                </div>
            </div>
        </div>
    
        <button 
          onClick={() => setActiveTab("OpenView")}
          className={`px-6 py-2 rounded-full transition ${activeTab === "OpenView" ? "bg-purple-600 shadow-lg shadow-purple-500/50" : "hover:bg-white/10"}`}
        >
          Open view
        </button>

        </div>

            
        
     
        <>
          <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[476px] top-[285px] text-center font-bold text-[40px]'>T</h1>
          <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[330px] top-[600px] text-center font-bold text-[40px]'>F</h1>
          <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[630px] top-[600px] text-center font-bold text-[40px]'>R</h1>
          <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[770px] top-[280px] text-center font-bold text-[40px]'>Bk</h1>
          <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[190px] top-[280px] text-center font-bold text-[40px]'>L</h1>
          <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[480px] top-[810px] text-center font-bold text-[40px]'>Bt</h1>

          {/* Color Dots Grids */}
          <div className="absolute z-20 h-19 w-19 left-[472px] top-[364px] grid grid-cols-3 -skew-3 rotate-45">{top.map((c, i) => <ColorDot key={i} color={c} index={i} />)}</div>
          <div className="absolute z-20 h-19 w-19 left-[245px] top-[327px] rotate-80 skew-11 grid grid-cols-3">{left.map((c, i) => <ColorDot key={i} color={c} index={i} />)}</div>
          <div className="absolute z-20 h-19 w-19 left-[695px] top-[322px] -skew-10 -rotate-81 grid grid-cols-3">{back.map((c, i) => <ColorDot key={i} color={c} index={i} />)}</div>
          <div className="absolute z-20 h-19 w-19 left-[392px] top-[540px] skew-5 rotate-10 grid grid-cols-3">{front.map((c, i) => <ColorDot key={i} color={c} index={i} />)}</div>
          <div className="absolute z-20 h-19 w-19 left-[558px] top-[540px] -skew-6 -rotate-9 grid grid-cols-3">{right.map((c, i) => <ColorDot key={i} color={c} index={i} />)}</div>
          <div className="absolute z-20 h-19 w-19 left-[475px] top-[705px] -rotate-45 skew-8 grid grid-cols-3">{bottom.map((c, i) => <ColorDot key={i} color={c} index={i} />)}</div>

          {/* Controls UI */}
          <div className="absolute left-65 top-30 w-[500px] h-[500px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
            <button onClick={a1} className='absolute rounded-full left-8 top-15 h-10 w-10 bg-yellow-400 hover:bg-blue-400 z-20'>1</button>
            <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
              <button onClick={a2} className='absolute rounded-full left-20 top-15 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>2</button>
              <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full">
                <button onClick={a3} className='absolute rounded-full left-32 top-15 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>3</button>
                <button onClick={a4} className='absolute rounded-full left-104 top-15 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>4</button>
              </div>
              <button onClick={a5} className='absolute rounded-full left-93 top-15 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>5</button>
            </div>
            <button onClick={a6} className='absolute rounded-full left-82 top-15 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>6</button>
          </div>

          <div className="absolute left-30 top-80 w-[500px] h-[500px] border-2 border-white border-dashed rounded-full flex justify-center items-center">
            <button onClick={a7} className='absolute rounded-full left-4 top-25 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>7</button>
            <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
              <button onClick={a8} className='absolute rounded-full left-4 top-38 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>8</button>
              <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full">
                <button onClick={a9} className='absolute rounded-full left-8 top-51 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>9</button>
                <button onClick={a10} className='absolute rounded-full left-40 top-110 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>10</button>
              </div>
              <button onClick={a11} className='absolute rounded-full left-30 top-98 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>11</button>
            </div>
            <button onClick={a12} className='absolute rounded-full left-50 top-120 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>12</button>
          </div>

          <div className="absolute left-100 top-80 w-[500px] h-[500px] border-2 border-green-300 border-dashed rounded-full flex justify-center items-center">
            <button onClick={a13} className='absolute rounded-full left-112 top-25 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>13</button>
            <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
              <button onClick={a14} className='absolute rounded-full left-103 top-25 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>14</button>
              <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full">
                <button onClick={a15} className='absolute rounded-full left-92 top-25 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>15</button>
                <button onClick={a16} className='absolute rounded-full left-46 top-105 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>16</button>
              </div>
              <button onClick={a17} className='absolute rounded-full left-56 top-113 h-10 w-10 bg-yellow-400/30 hover:bg-blue-400 z-20'>17</button>
            </div>
            <button onClick={a18} className='absolute rounded-full left-66 top-120 h-10 w-10 bg-yellow-400 hover:bg-blue-400 z-20'>18</button>
          </div>

          {/* 3D Component */}
        {activeTab === "cube" ? (
          <div className='ml-[1200px] mt-[200px] relative drop-shadow-[0_0_40px_rgba(0,255,255,0.3)]'>
            <Cube top={top} bottom={bottom} left={left} right={right} front={front} back={back} />
          </div>

           ) : (
            activeTab === "OpenView" && (
              <div className='ml-[1000px] mt-[100px] relative drop-shadow-[0_0_40px_rgba(0,255,255,0.3)]'>
                <OpenedCubeView top={top} bottom={bottom} left={left} right={right} front={front} back={back}/>
              </div>
            )
           )}     


            {/* button on bottom */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
            <button 
                onClick={undo} 
                className="group relative flex flex-col items-center justify-center w-20 h-20 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/50 rounded-xl transition-all duration-300"
            >
                <span className="text-2xl group-active:scale-90 transition-transform">↩️</span>
                <span className="text-[10px] uppercase tracking-widest font-bold mt-1 text-gray-400 group-hover:text-purple-300">Undo</span>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.2)]"></div>
            </button>

            <div className="h-10 w-[1px] bg-white/10"></div>

            <button 
                onClick={resetCube} 
                className="group relative flex flex-col items-center justify-center w-20 h-20 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/50 rounded-xl transition-all duration-300"
            >
                <span className="text-2xl group-active:rotate-180 transition-transform duration-500">🧹</span>
                <span className="text-[10px] uppercase tracking-widest font-bold mt-1 text-gray-400 group-hover:text-red-300">Reset</span>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(239,68,68,0.2)]"></div>
            </button>
            </div>


        </>
      

      
    
    
      
    </div>
  );
}

export default Cubefunc;