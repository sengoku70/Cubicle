import React from 'react';

// Reusable ColorDot component from the main app for consistency
const ColorDot = ({ color, index }) => (
  <div
    className={`w-13 h-13 border border-black  text-black text-center font-bold ${color === "r" ? "bg-red-500" :
      color === "y" ? "bg-yellow-400" :
        color === "g" ? "bg-green-500" :
          color === "b" ? "bg-blue-500" :
            color === "o" ? "bg-orange-500" : "bg-white"
      }`}
  >{index}</div>
);

// New component for the opened cube view
function OpenedCubeView({ top, left, right, bottom, front, back, moveFunctions }) {
  const faces = [
    { name: "Top", data: top, gridClass: "col-start-2 row-start-1", title: "Yellow",},
    { name: "Left", data: left, gridClass: "col-start-1 row-start-2", title: "Orange",},
    { name: "Front", data: front, gridClass: "col-start-2 row-start-2", title: "Green", },
    { name: "Back", data: back, gridClass: "col-start-4 row-start-2", title: "Blue",  },
    { name: "Right", data: right, gridClass: "col-start-3 row-start-2", title: "Red", },
    { name: "Bottom", data: bottom, gridClass: "col-start-2 row-start-3", title: "White",  },
  ];

  const MoveBtn = ({ onClick, label }) => (
    <button
      onClick={onClick}
      className="w-7 h-7 rounded-full bg-yellow-400/30 hover:bg-blue-400 border border-white/20 text-white font-bold text-[10px] flex items-center justify-center transition-all shadow-lg hover:scale-110 active:scale-90"
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-2 scale-110">
      <div className="grid grid-cols-4 grid-rows-3 gap-6 relative w-[700px] h-[650px] border-4 border-dashed border-white/10 rounded-[40px] p-10 bg-white/5 backdrop-blur-md shadow-2xl">

        {faces.map((face) => (
          <div key={face.name} className={`${face.gridClass} flex flex-col items-center justify-center relative group`}>
            {/* Control Panel (Title + Buttons) */}
            <div className="flex flex-col items-center gap-1.5 mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 group-hover:text-purple-400 transition-colors">
                {face.title}
              </span>
              {/* {face.buttons.length > 0 && (
                <div className="flex gap-1 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                  {face.map(btnId => (
                    "hellp"

                  ))}
                </div>
              )} */}
            </div>

            {/* Face Grid */}
            <div className="grid grid-cols-3 h-36 w-36 border-2 border-white/10 bg-black/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group-hover:border-purple-500/50 transition-all duration-500 rounded-lg overflow-hidden">
              {face.data.map((color, index) => (
                <ColorDot key={index} color={color} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpenedCubeView;