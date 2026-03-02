import React,{useState} from 'react'

export default function testpage() {
    
    const [moveStack, setMoveStack] = useState([]);
    


const a1 = () => {
  console.log("performing a1");
  setMoveStack(prev => [...prev, "a1"]);
};
const a6 = () => {
  console.log("performing a6");
  setMoveStack(prev => [...prev, "a6"]);
};

 const moves = {
  a1: "a6",
  a6: "a1",
  a2: "a5",
  a5: "a2",
  a3: "a4",
  a4: "a3",

  a7: "a12",
  a12: "a7",
  a8: "a11",
  a11: "a8",
  a9: "a10",
  a10: "a9",

  a13: "a18",
  a18: "a13",
  a14: "a17",
  a17: "a14",
  a15: "a16",
  a16: "a15",
};
const moveFunctions = {
  a1: a1,
  a6: a6,
};





const undo = () => {
  if (moveStack.length === 0) return;

  const lastMove = moveStack.at(-1);   // "a1"
  const inverseName = moves[lastMove]; // "a6"
  const inverseFunc = moveFunctions[inverseName];

  inverseFunc?.();

  setMoveStack(prev => prev.slice(0, -2));
};

  return (
    <div>
      <h1>test page</h1>
      <button onClick={a1}>a1</button>
      <br />
      <button onClick={undo}>undo</button>







    </div>
  )
}
