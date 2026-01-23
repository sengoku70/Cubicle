import React, { useEffect,useState,useRef } from 'react';
import Cube from './Cube.jsx';

function Rubcstopology() {

  const cubeRef = useRef(null)
  const [top, setTop] = useState(["y","y","y","y","y","y","y","y","y",]);
  const [left, setLeft] = useState(["o","o","o","o","o","o","o","o","o",]);
  const [right, setRight] = useState(["r","r","r","r","r","r","r","r","r",]);
  const [bottom, setBottom] = useState(["w","w","w","w","w","w","w","w","w",]);
  const [front, setFront] = useState(["g","g","g","g","g","g","g","g","g",]);
  const [back, setBack] = useState(["b","b","b","b","b","b","b","b","b",]);

  const [rotate, setrotate] = useState("");

  const ColorDot = ({ color, index }) => (
  <div
    className={`w-5 h-5 rounded-full text-black text-center font-bold ${
      color === "r"
        ? "bg-red-500"
        : color === "y"
        ? "bg-yellow-400"
        : color === "g"
        ? "bg-green-500"
        : color === "b"
        ? "bg-blue-500"
        : color === "o"
        ? "bg-orange-500"
        : "bg-white"
    }`}
  >{index}</div>
);

const sift = (
  a, setA, aIdx,
  b, setB, bIdx,
  c, setC, cIdx,
  d, setD, dIdx
) => {
  // clone faces (important: React immutability)
  const A = [...a];
  const B = [...b];
  const C = [...c];
  const D = [...d];

  // store d → temp
  const temp = dIdx.map(i => D[i]);

  // d ← c
  dIdx.forEach((di, i) => {
    D[di] = C[cIdx[i]];
  });

  // c ← b
  cIdx.forEach((ci, i) => {
    C[ci] = B[bIdx[i]];
  });

  // b ← a
  bIdx.forEach((bi, i) => {
    B[bi] = A[aIdx[i]];
  });

  // a ← temp
  aIdx.forEach((ai, i) => {
    A[ai] = temp[i];
  });

  // update state
  setA(A);
  setB(B);
  setC(C);
  setD(D);
};


  
  
  return (

    <div className="">
      {/* <button onClick={()=>{sift(back,setBack,left,setLeft,front,setFront,right,setRight)}} className='absolute rounded-l-full left-75 top-35  h-15 w-5 bg-yellow-400 rotate-15 hover:bg-blue-400 z-20'></button> */}
      {/* <button onClick={()=>{sift(right,setRight,front,setFront,left,setLeft,back,setBack)}} className='absolute rounded-r-full left-160 top-35 h-15 w-5 bg-yellow-400 -rotate-15 hover:bg-blue-400 z-20'></button> */}
      
      {/* <button onClick={()=>{sift(back,setBack,top,setTop,front,setFront,bottom,setBottom)}} className='absolute rounded-l-full left-150 top-144  h-15 w-5 bg-blue-400 -rotate-90 hover:bg-blue-400 z-20'></button>
      <button onClick={()=>{sift(bottom,setBottom,front,setFront,top,setTop,back,setBack)}} className='absolute rounded-r-full left-180 top-66 h-15 w-5 bg-blue-400 -rotate-45 hover:bg-blue-400 z-20'></button> */}
      
      {/* <button onClick={()=>{sift(bottom,setBottom,left,setLeft,top,setTop,right,setRight)}} className='absolute rounded-l-full left-45 top-85  h-15 w-5 bg-red-400 rotate-15 hover:bg-blue-400 z-20'></button>
      <button onClick={()=>{sift(right,setRight,top,setTop,left,setLeft,bottom,setBottom)}} className='absolute rounded-r-full left-77 top-142 h-15 w-5 bg-red-400 rotate-106 hover:bg-blue-400 z-20'></button> */}


        

      <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[476px] top-[285px] text-center font-bold text-[40px]'>T</h1>
      <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[330px] top-[600px] text-center font-bold text-[40px]'>F</h1>
      <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[630px] top-[600px] text-center font-bold text-[40px]'>L</h1>
      <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[770px] top-[280px] text-center font-bold text-[40px]'>Bk</h1>
      <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[190px] top-[280px] text-center font-bold text-[40px]'>R</h1>
      <h1 className='bg-neutral-700 opacity-35 w-15 h-15 absolute left-[480px] top-[810px] text-center font-bold text-[40px]'>Bt</h1>








<table className="absolute z-20  h-19 w-19 left-[470px] top-[360px] grid grid-cols-3 -skew-3 rotate-45">
  {top.map((c, i) => <ColorDot key={i} color={c} index={i} />)}

</table>

<div className="absolute z-20  h-19 w-19 left-[245px] top-[327px] rotate-80 skew-11 grid grid-cols-3">
  {right.map((c, i) => <ColorDot key={i} color={c}  index={i} />)}
  
</div>

<div className="absolute z-20 h-19 w-19 left-[695px] top-[325px] -skew-10 -rotate-80 grid grid-cols-3">
  {back.map((c, i) => <ColorDot key={i} color={c}  index={i} />)}
  
</div>

<div className="absolute z-20 h-19 w-19 left-[391px] top-[540px] skew-5 rotate-12 grid grid-cols-3">
  {front.map((c, i) => <ColorDot key={i} color={c}  index={i} />)}
  
</div>

<div className="absolute z-20 h-19 w-19 left-[558px] top-[540px] -skew-6 -rotate-9 grid grid-cols-3">
  {left.map((c, i) => <ColorDot key={i} color={c}  index={i} />)}
  
</div>

<div className="absolute z-20  h-19 w-19 left-[475px] top-[710px] rotate-43 -skew-9 grid grid-cols-3">
  {bottom.map((c, i) => <ColorDot key={i} color={c}  index={i} />)}
  
</div>


          
      {/* Parent Box */}
 

      <div className="absolute left-65 top-30 w-[500px] h-[500px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
        <button onClick={()=>{sift(
  back,  setBack,  [0,1,2],
  left,  setLeft,  [0,1,2],
  front, setFront, [0,1,2],
  right, setRight, [0,1,2]
)
}} className='absolute rounded-full left-6 top-15  h-10 w-10 bg-yellow-400 rotate-35 hover:bg-blue-400 z-20'>1</button>
 
        
      <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
         <button onClick={()=>{sift(
  back,  setBack,  [3,4,5],
  left,  setLeft,  [3,4,5],
  front, setFront, [3,4,5],
  right, setRight, [3,4,5]
)
}} className='absolute rounded-full left-18 top-15  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>2</button>
 
      <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full ">
        <button onClick={()=>{sift(
  back,  setBack,  [6,7,8],
  left,  setLeft,  [6,7,8],
  front, setFront, [6,7,8],
  right, setRight, [6,7,8]
)
}} className='absolute rounded-full left-32 top-15  h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>3</button>
        <button onClick={()=>{sift(
  right, setRight, [6,7,8],
  front, setFront, [6,7,8],
  left,  setLeft,  [6,7,8],
  back,  setBack,  [6,7,8]
)
}} className='absolute rounded-full left-110 top-15 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>4</button>
 
          
      </div>
           <button onClick={()=>{sift(
  right, setRight, [3,4,5],
  front, setFront, [3,4,5],
  left,  setLeft,  [3,4,5],
  back,  setBack,  [3,4,5]
)
}} className='absolute rounded-full left-95 top-15 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>5</button>
 
      </div>

<button onClick={()=>{sift(
  right, setRight, [0,1,2],
  front, setFront, [0,1,2],
  left,  setLeft,  [0,1,2],
  back,  setBack,  [0,1,2]
)
}} className='absolute rounded-full left-80 top-15 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>6</button>
 
      </div>


   

      <div className="absolute left-30 top-80 w-[500px] h-[500px] border-2 border-white border-dashed  rounded-full flex justify-center items-center">
          <button onClick={()=>{sift(
  bottom, setBottom, [6,7,8],
  left,   setLeft,   [0,3,6],
  top,    setTop,    [0,1,2],
  right,  setRight,  [2,5,8]
)
}} className='absolute rounded-full left-4 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>7</button>
 
          <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
          <button onClick={()=>{sift(
  bottom, setBottom, [3,4,5],
  left,   setLeft,   [1,4,7],
  top,    setTop,    [3,4,5],
  right,  setRight,  [1,4,7]
)
}} className='absolute rounded-full left-4 top-38  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>8</button>
 
          <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full ">
            <button onClick={()=>{sift(
  bottom, setBottom, [0,1,2],
  left,   setLeft,   [2,5,8],
  top,    setTop,    [6,7,8],
  right,  setRight,  [0,3,6]
)
}} className='absolute rounded-full left-8 top-51  h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>9</button>

            <button onClick={()=>{sift(
  right,  setRight,  [1,4,7],
  top,    setTop,    [3,4,5],
  left,   setLeft,   [1,4,7],
  bottom, setBottom, [3,4,5]
)
}} className='absolute rounded-full left-40 top-110 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>10</button>
 
</div>

<button onClick={()=>{sift(
  right,  setRight,  [0,3,6],
  top,    setTop,    [6,7,8],
  left,   setLeft,   [2,5,8],
  bottom, setBottom, [0,1,2]
)

}} className='absolute rounded-full left-30 top-98 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>11</button>
 
      </div>
          <button onClick={()=>{sift(
  right,  setRight,  [2,5,8],
  top,    setTop,    [0,1,2],
  left,   setLeft,   [0,3,6],
  bottom, setBottom, [6,7,8]
)
}} className='absolute rounded-full left-50 top-120 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'>12</button>
 
      </div>




     
      <div className="absolute left-100 top-80 w-[500px] h-[500px] border-2 border-green-300 border-dashed  rounded-full flex  justify-center items-center">
           <button onClick={()=>{sift(
  bottom, setBottom, [0,3,6],
  front,  setFront,  [0,3,6],
  top,    setTop,    [0,3,6],
  back,   setBack,   [2,5,8]
)
}} className='absolute rounded-full left-116 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>13</button>

          <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">

             <button onClick={()=>{sift(
  bottom, setBottom, [1,4,7],
  front,  setFront,  [1,4,7],
  top,    setTop,    [1,4,7],
  back,   setBack,   [1,4,7]
)
}} className='absolute rounded-full left-106 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>14</button> 

          <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full ">
            <button onClick={()=>{sift(
  bottom, setBottom, [0,3,6],
  front,  setFront, [0,3,6],
  top,    setTop, [0,3,6],
  back,   setBack, [2,5,8]
)
}} className='absolute rounded-full left-96 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>15</button> 


            <button onClick={()=>{sift(
  back,   setBack,   [2,5,8],
  top,    setTop,    [0,3,6],
  front,  setFront,  [0,3,6],
  bottom, setBottom, [0,3,6]
)
}} className='absolute rounded-full left-46 top-105  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>16</button> 
      </div>
            <button onClick={()=>{sift(
  back,   setBack,   [1,4,7],
  top,    setTop,    [1,4,7],
  front,  setFront,  [1,4,7],
  bottom, setBottom, [1,4,7]
)
}} className='absolute rounded-full left-56 top-113  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'>17</button> 
          
      </div>
            <button onClick={()=>{sift(
  back,   setBack,   [0,3,6],
  top,    setTop,    [2,5,8],
  front,  setFront,  [2,5,8],
  bottom, setBottom, [2,5,8]
)
}} className='absolute rounded-full left-66 top-120  h-10 w-10 bg-yellow-400 rotate-35 hover:bg-blue-400 z-20'>18</button> 
       
      </div>

      <div className='ml-[1200px] mt-[200px]'>
        <Cube
          top={top}
          bottom={bottom}
          left={left}
          right={right}
          front={front}
          back={back}
        />

      </div>

    </div>

  )

}

export default Rubcstopology;

