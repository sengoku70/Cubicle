import React, { useRef, useState } from "react";
import "./Cube.css";

export default function Cube({
  top,
  bottom,
  left,
  right,
  front,
  back,
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

  const renderFace = (faceName) => {
    return faces[faceName].map((cell, i) => (
      <div
        key={i}
        className="cubie"
        style={{ background: colorMap[cell] }}
      >{i}</div>
    ));
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
    </div>
  );
}
