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
function OpenedCubeView({ top, left, right, bottom, front, back }) {
  const faces = [
    { name: "Top", data: top, gridClass: "col-start-2", title: "T" },
    { name: "Left", data: left, gridClass: "col-start-1 row-start-2", title: "L" },
    { name: "Front", data: front, gridClass: "col-start-2 row-start-2", title: "F" },
    { name: "Right", data: right, gridClass: "col-start-3 row-start-2", title: "R" },
    { name: "Back", data: back, gridClass: "col-start-4 row-start-2", title: "Bk" },
    { name: "Bottom", data: bottom, gridClass: "col-start-2 row-start-3", title: "Bt" },
  ];

  return (
    <div className="flex flex-col items-center justify-center  h-full w-full">
      <h2 className="text-4xl font-bold mb-10 text-white">Opened Cube View</h2>
      <div className="grid grid-cols-4 grid-rows-3 relative w-[680px] h-[560px] border-4 border-dashed border-white/20 rounded-lg p-5 bg-white/5">
        {faces.map((face) => (
          <div key={face.name} className={`${face.gridClass} relative`}>
            <div className="grid grid-cols-3 transform-gpu transition-transform duration-300 h-39 w-39 border border-white/20 bg-gray-900/80">
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