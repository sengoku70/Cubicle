import React, { useRef, useState } from "react";
import "./Cube.css";

export default function Cube({
  top,
  bottom,
  left,
  right,
  front,
  back,
  moveFunctions
}) {
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const [rotation, setRotation] = useState({ x: -30, y: -30 });

  // letter → color
  const colorMap = {
    y: "#FFEB3B",
    w: "#FFFFFF",
    r: "#F44336",
    o: "#FF7A1A",
    g: "#4CAF50",
    b: "#2196F3",
  };

  const faces = {
    up: top,
    down: bottom,
    left,
    right,
    front,
    back,
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };

    setRotation(prev => ({
      x: prev.x - dy * 0.3,
      y: prev.y + dx * 0.3,
    }));
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const getButtonConfig = (faceName, i) => {
    if (i === 4) return [];

    const makeFaceMap = (actions) => ({
      0: [
        { a: actions.TRL, l: '←', pos: 'left' },
        { a: actions.LCU, l: '↑', pos: 'top' }
      ],
      1: [
        { a: actions.MCU, l: '↑', pos: 'top' }
      ],
      2: [
        { a: actions.TRR, l: '→', pos: 'right' },
        { a: actions.RCU, l: '↑', pos: 'top' }
      ],
      3: [
        { a: actions.MRL, l: '←', pos: 'left' }
      ],
      5: [
        { a: actions.MRR, l: '→', pos: 'right' }
      ],
      6: [
        { a: actions.BRL, l: '←', pos: 'left' },
        { a: actions.LCD, l: '↓', pos: 'bottom' }
      ],
      7: [
        { a: actions.MCD, l: '↓', pos: 'bottom' }
      ],
      8: [
        { a: actions.BRR, l: '→', pos: 'right' },
        { a: actions.RCD, l: '↓', pos: 'bottom' }
      ]
    });

    const maps = {
      front: makeFaceMap({ TRL: 'a3', TRR: 'a6', BRL: 'a1', BRR: 'a4', LCU: 'a13', LCD: 'a18', RCU: 'a15', RCD: 'a16', MCU: 'a14', MCD: 'a17', MRL: 'a2', MRR: 'a5' }),
      back: makeFaceMap({ TRL: 'a3', TRR: 'a6', BRL: 'a1', BRR: 'a4', LCU: 'a16', LCD: 'a15', RCU: 'a18', RCD: 'a13', MCU: 'a17', MCD: 'a14', MRL: 'a2', MRR: 'a5' }),
      right: makeFaceMap({ TRL: 'a3', TRR: 'a6', BRL: 'a1', BRR: 'a4', LCU: 'a9', LCD: 'a11', RCU: 'a7', RCD: 'a12', MCU: 'a8', MCD: 'a10', MRL: 'a2', MRR: 'a5' }),
      left: makeFaceMap({ TRL: 'a3', TRR: 'a6', BRL: 'a1', BRR: 'a4', LCU: 'a12', LCD: 'a7', RCU: 'a11', RCD: 'a9', MCU: 'a10', MCD: 'a8', MRL: 'a2', MRR: 'a5' }),
      up: makeFaceMap({ TRL: 'a7', TRR: 'a12', BRL: 'a9', BRR: 'a11', LCU: 'a13', LCD: 'a18', RCU: 'a15', RCD: 'a16', MCU: 'a14', MCD: 'a17', MRL: 'a8', MRR: 'a10' }),
      down: makeFaceMap({ TRL: 'a11', TRR: 'a9', BRL: 'a12', BRR: 'a7', LCU: 'a13', LCD: 'a18', RCU: 'a15', RCD: 'a16', MCU: 'a14', MCD: 'a17', MRL: 'a10', MRR: 'a8' })
    };
    return maps[faceName][i] || [];
  };

  const posStyles = {
    left: { top: '50%', left: '16px', '--base-transform': 'translate(-50%, -50%)' },
    right: { top: '50%', left: 'calc(100% - 16px)', '--base-transform': 'translate(-50%, -50%)' },
    top: { top: '16px', left: '50%', '--base-transform': 'translate(-50%, -50%)' },
    bottom: { top: 'calc(100% - 16px)', left: '50%', '--base-transform': 'translate(-50%, -50%)' },
    center: { top: '50%', left: '50%', '--base-transform': 'translate(-50%, -50%)' }
  };

  const renderFace = (faceName) => {
    return faces[faceName].map((cell, i) => {
      const btns = moveFunctions ? getButtonConfig(faceName, i) : [];
      return (
        <div
          key={i}
          className="cubie"
          style={{ background: colorMap[cell], position: 'relative' }}
        >
          {btns.map((btn, idx) => (
            <button
              key={idx}
              className="cubie-btn"
              style={posStyles[btn.pos]}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                if (moveFunctions[btn.a]) moveFunctions[btn.a]();
              }}
            >
              {btn.l}
            </button>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="cube-page">
      <div
        ref={containerRef}
        className="cube-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="cube-scene"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          <div className="face front">{renderFace("front")}</div>
          <div className="face back">{renderFace("back")}</div>
          <div className="face right">{renderFace("right")}</div>
          <div className="face left">{renderFace("left")}</div>
          <div className="face up">{renderFace("up")}</div>
          <div className="face down">{renderFace("down")}</div>
        </div>
      </div>

      <div className="navigation-panel">
        <button className="nav-btn" onClick={() => setRotation({ x: 0, y: 0 })}>Front</button>
        <button className="nav-btn" onClick={() => setRotation({ x: 0, y: 180 })}>Back</button>
        <button className="nav-btn" onClick={() => setRotation({ x: 0, y: -90 })}>Right</button>
        <button className="nav-btn" onClick={() => setRotation({ x: 0, y: 90 })}>Left</button>
        <button className="nav-btn" onClick={() => setRotation({ x: -90, y: 0 })}>Top</button>
        <button className="nav-btn" onClick={() => setRotation({ x: 90, y: 0 })}>Bottom</button>
      </div>
    </div>
  );
}
