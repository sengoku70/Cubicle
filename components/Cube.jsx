import React, { useRef, useState } from "react";

// RubiksCubePage.jsx
// Single-file React component that renders a 3D "Rubik's" style cube made of 54
// small individual "cubies" (9 per face × 6 faces = 54). Each cubie is a thin
// cube placed on a face of an invisible 3x3x3 center. The whole cube can be
// rotated by dragging with the mouse (or touch).

export default function Cube() {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: -30, y: -30 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Colors for typical Rubik's faces: front, back, right, left, up, down
  const faceColors = {
    front: "#FF7A1A", // orange
    back: "#F44336", // red  
    right: "#4CAF50", // green
    left: "#2196F3", // blue
    up: "#FFFFFF", // white
    down: "#FFEB3B", // yellow
  };

  // Generate cubies for a face (3x3 grid). faceName determines orientation.
  function generateFaceCubies(faceName) {
    const cubies = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const key = `${faceName}-${row}-${col}`;
        cubies.push(
          <Cubie
            key={key}
            faceName={faceName}
            row={row}
            col={col}
            color={faceColors[faceName]}
          />
        );
      }
    }
    return cubies;
  }

  // Pointer / drag handlers for rotating the whole cube
  function onPointerDown(e) {
    dragging.current = true;
    lastPos.current = { x: e.clientX ?? e.touches?.[0].clientX, y: e.clientY ?? e.touches?.[0].clientY };
    // capture pointer for mouse events
    if (containerRef.current && e.target.setPointerCapture) {
      try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
    }
  }

  function onPointerMove(e) {
    if (!dragging.current) return;
    const x = e.clientX ?? e.touches?.[0].clientX;
    const y = e.clientY ?? e.touches?.[0].clientY;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    lastPos.current = { x, y };
    setRotation(prev => ({ x: prev.x - dy * 0.3, y: prev.y + dx * 0.3 }));
  }

  function onPointerUp() {
    dragging.current = false;
  }

  return (
    <div className="w-[30%] min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-white text-2xl font-semibold mb-4 text-center">  Drag to rotate</h1>
        

        <div
          ref={containerRef}
          className="cube-viewport mx-auto"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ width: 520, height: 520 }}
        >
          <div
            className="scene"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            {/* Faces: front, back, right, left, up, down */}
            <div className="face-plane front">{generateFaceCubies("front")}</div>
            <div className="face-plane back">{generateFaceCubies("back")}</div>
            <div className="face-plane right">{generateFaceCubies("right")}</div>
            <div className="face-plane left">{generateFaceCubies("left")}</div>
            <div className="face-plane up">{generateFaceCubies("up")}</div>
            <div className="face-plane down">{generateFaceCubies("down")}</div>
          </div>
        </div>

        

        <style>{`
          .cube-viewport {
            perspective: 1200px;
            margin: 0 auto;
            touch-action: none; /* allow pointer dragging */
          }

          .scene {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 120ms linear;
            display: grid;
            place-items: center;
          }

          /* face-plane is a container for the 3x3 cubies for one face. We will
             rotate/translate the whole plane to the appropriate face position. */
          .face-plane {
            position: absolute;
            background: rgba(0,0,0,.7);
            backdrop-filter: blur(10px);
            width: 220px; /* 3 * (cubie size + gap) */
            height: 220px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 6px;
            transform-style: preserve-3d;
            pointer-events: none; /* allow dragging through cubies */
          }

          /* place each face-plane in 3D space */
          .face-plane.front  { transform: translateZ(110px); }
          .face-plane.back   { transform: rotateY(180deg) translateZ(110px); }
          .face-plane.right  { transform: rotateY(90deg) translateZ(110px); }
          .face-plane.left   { transform: rotateY(-90deg) translateZ(110px); }
          .face-plane.up     { transform: rotateX(90deg) translateZ(110px); }
          .face-plane.down   { transform: rotateX(-90deg) translateZ(110px); }

          /* a cubie is a thin cube — small depth so they appear like tiles but
             have a little 3D thickness so the whole object feels 3D */
          .cubie {
            width: 66px;  /* fits into face-plane 3 columns + gaps */
            height: 66px;
            transform-style: preserve-3d;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            pointer-events: auto;
          }

          .cubie .sticker {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translateZ(6px); /* make sticker pop out a bit */
            border-radius: 4px;
            box-shadow: 0 2px 0 rgba(0,0,0,0.35) inset;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
            color: rgba(0,0,0,0.7);
          }

          /* a subtle edge to the sticker so we can see depth */
          .cubie::after {
            content: "";
            position: absolute;
            inset: 0;
            transform: translateZ(0px);
            border-radius: 6px;
            box-shadow: 0 6px 18px rgba(0,0,0,0.35);
            opacity: 0.12;
          }

          /* hover highlight */
          .cubie:hover .sticker {
            transform: translateZ(9px) scale(1.02);
          }

          /* Responsive tweak */
          @media (max-width: 640px) {
            .face-plane { width: 300px; height: 300px; }
            .cubie { width: calc((300px - 12px) / 3); height: calc((300px - 12px) / 3); }
          }
        `}</style>
      </div>
    </div>
  );
}

// Cubie component: a thin cube representing one sticker on a face. The face-plane
// placement handles the major orientation of the sticker — each cubie is just a
// small square with a colored front face.
function Cubie({ faceName, row, col, color }) {
  // We center the 3x3 grid; CSS grid handles the layout so we don't need
  // per-cubie transforms here. We include a small label with coordinates.
  return (
    <div className="cubie" style={{ pointerEvents: "auto" }}>
      <div className="sticker" style={{ background: color }}></div>
    </div>
  );
}
