import React, { useEffect,useState,useRef } from 'react';

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
    className={`w-5 h-5 rounded-full text-center font-bold ${
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

  const sift = (a, setA, b, setB, c, setC, d, setD) => {
    console.log("r",a,"f",b,"l",c,"bk",d);
    const temp = d;
    setD(c);
    setC(b);
    setB(a);
    setA(temp);
    console.log(rotate);
  };

  
  
  return (

    <div className="">
      {/* <button onClick={()=>{sift(back,setBack,left,setLeft,front,setFront,right,setRight)}} className='absolute rounded-l-full left-75 top-35  h-15 w-5 bg-yellow-400 rotate-15 hover:bg-blue-400 z-20'></button> */}
      {/* <button onClick={()=>{sift(right,setRight,front,setFront,left,setLeft,back,setBack)}} className='absolute rounded-r-full left-160 top-35 h-15 w-5 bg-yellow-400 -rotate-15 hover:bg-blue-400 z-20'></button> */}
      
      {/* <button onClick={()=>{sift(back,setBack,top,setTop,front,setFront,bottom,setBottom)}} className='absolute rounded-l-full left-150 top-144  h-15 w-5 bg-blue-400 -rotate-90 hover:bg-blue-400 z-20'></button>
      <button onClick={()=>{sift(bottom,setBottom,front,setFront,top,setTop,back,setBack)}} className='absolute rounded-r-full left-180 top-66 h-15 w-5 bg-blue-400 -rotate-45 hover:bg-blue-400 z-20'></button> */}
      
      {/* <button onClick={()=>{sift(bottom,setBottom,left,setLeft,top,setTop,right,setRight)}} className='absolute rounded-l-full left-45 top-85  h-15 w-5 bg-red-400 rotate-15 hover:bg-blue-400 z-20'></button>
      <button onClick={()=>{sift(right,setRight,top,setTop,left,setLeft,bottom,setBottom)}} className='absolute rounded-r-full left-77 top-142 h-15 w-5 bg-red-400 rotate-106 hover:bg-blue-400 z-20'></button> */}


        

      <h1 className='bg-white opacity-15 w-15 h-15 absolute left-[476px] top-[285px] text-center font-bold text-[40px]'>T</h1>
      <h1 className='bg-white opacity-15 w-15 h-15 absolute left-[330px] top-[600px] text-center font-bold text-[40px]'>F</h1>
      <h1 className='bg-white opacity-15 w-15 h-15 absolute left-[630px] top-[600px] text-center font-bold text-[40px]'>L</h1>
      <h1 className='bg-white opacity-15 w-15 h-15 absolute left-[770px] top-[280px] text-center font-bold text-[40px]'>Bk</h1>
      <h1 className='bg-white opacity-15 w-15 h-15 absolute left-[190px] top-[280px] text-center font-bold text-[40px]'>R</h1>
      <h1 className='bg-white opacity-15 w-15 h-15 absolute left-[480px] top-[810px] text-center font-bold text-[40px]'>Bt</h1>








<table className="absolute z-20  h-19 w-19 left-[470px] top-[360px] grid grid-cols-3 -skew-3 rotate-45">
  {top.map((c, i) => <ColorDot key={i} color={c} index={i} />)}

</table>

<div className="absolute z-20  h-19 w-19 left-[253px] top-[327px] -rotate-9 -skew-11 grid grid-cols-3">
  {right.map((c, i) => <ColorDot key={i} color={c}  index={i} />)}
  
</div>

<div className="absolute z-20 h-19 w-19 left-[700px] top-[330px] skew-11 rotate-8 grid grid-cols-3">
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
        <button onClick={()=>{sift(back,setBack,left,setLeft,front,setFront,right,setRight)}} className='absolute rounded-full left-6 top-15  h-10 w-10 bg-yellow-400 rotate-35 hover:bg-blue-400 z-20'></button>
 
        
      <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
         <button onClick={()=>{sift(back,setBack,left,setLeft,front,setFront,right,setRight)}} className='absolute rounded-full left-18 top-15  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button>
 
      <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full ">
        <button onClick={()=>{sift(back,setBack,left,setLeft,front,setFront,right,setRight)}} className='absolute rounded-full left-32 top-15  h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
        <button onClick={()=>{sift(right,setRight,front,setFront,left,setLeft,back,setBack)}} className='absolute rounded-full left-110 top-15 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
 
          
      </div>
           <button onClick={()=>{sift(right,setRight,front,setFront,left,setLeft,back,setBack)}} className='absolute rounded-full left-95 top-15 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
 
      </div>
           <button onClick={()=>{sift(right,setRight,front,setFront,left,setLeft,back,setBack)}} className='absolute rounded-full left-80 top-15 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
 
      </div>


   

      <div className="absolute left-30 top-80 w-[500px] h-[500px] border-2 border-white border-dashed  rounded-full flex justify-center items-center">
          <button onClick={()=>{sift(bottom,setBottom,left,setLeft,top,setTop,right,setRight)}} className='absolute rounded-full left-4 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button>
 
          <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">
          <button onClick={()=>{sift(bottom,setBottom,left,setLeft,top,setTop,right,setRight)}} className='absolute rounded-full left-4 top-38  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button>
 
          <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full ">
            <button onClick={()=>{sift(bottom,setBottom,left,setLeft,top,setTop,right,setRight)}} className='absolute rounded-full left-8 top-51  h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
            <button onClick={()=>{sift(right,setRight,top,setTop,left,setLeft,bottom,setBottom)}} className='absolute rounded-full left-40 top-110 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
 
      </div>
          <button onClick={()=>{sift(right,setRight,top,setTop,left,setLeft,bottom,setBottom)}} className='absolute rounded-full left-30 top-98 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
 
      </div>
          <button onClick={()=>{sift(right,setRight,top,setTop,left,setLeft,bottom,setBottom)}} className='absolute rounded-full left-50 top-120 h-10 w-10 bg-yellow-400/30  hover:bg-blue-400 z-20'></button>
 
      </div>




     
      <div className="absolute left-100 top-80 w-[500px] h-[500px] border-2 border-green-300 border-dashed  rounded-full flex  justify-center items-center">
           <button onClick={()=>{sift(bottom,setBottom,front,setFront,top,setTop,back,setBack)}} className='absolute rounded-full left-116 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button>

          <div className="w-[450px] h-[450px] border-2 border-red-300 border-dashed rounded-full flex justify-center items-center">

             <button onClick={()=>{sift(bottom,setBottom,front,setFront,top,setTop,back,setBack)}} className='absolute rounded-full left-106 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button> 

          <div className="w-[400px] h-[400px] border-2 border-red-300 border-dashed rounded-full ">
            <button onClick={()=>{sift(bottom,setBottom,front,setFront,top,setTop,back,setBack)}} className='absolute rounded-full left-96 top-25  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button> 
            <button onClick={()=>{sift(back,setBack,top,setTop,front,setFront,bottom,setBottom)}} className='absolute rounded-full left-46 top-105  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button> 
      </div>
            <button onClick={()=>{sift(back,setBack,top,setTop,front,setFront,bottom,setBottom)}} className='absolute rounded-full left-56 top-113  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button> 
          
      </div>
            <button onClick={()=>{sift(back,setBack,top,setTop,front,setFront,bottom,setBottom)}} className='absolute rounded-full left-66 top-120  h-10 w-10 bg-yellow-400/30 rotate-35 hover:bg-blue-400 z-20'></button> 
       
      </div>

     <RubiksCube/>


    </div>

  )

}

export default Rubcstopology;


function RubiksCube() {

  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="scene">
      <style>{`
        :root{
          --size: 320px; /* cube overall size */
          --sticker-gap: 6px;
          --sticker-size: calc((var(--size) / 3) - var(--sticker-gap));
        }

        .scene{
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 600px;
          perspective: 1200px; /* important for CSS perspective */
          -webkit-font-smoothing: antialiased;
        }

        .cube-wrap{
          width: var(--size);
          height: var(--size);
          transform-style: preserve-3d;
          transition: transform 700ms ease;
        }

      
        .face{
          position: absolute;
          width: var(--size);
          height: var(--size);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: var(--sticker-gap);
          padding: calc(var(--sticker-gap) / 2);
          box-sizing: border-box;
          backface-visibility: hidden;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.6) inset;
        }

        .sticker{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: rgba(0,0,0,0.6);
          border-radius: 6px;
          
          transform: translateZ(2px);
        }

        /* Classic Rubik's colours */
        .white { background: #ffffff }
        .yellow{ background: #ffeb3b }
        .red   { background: #e53935 }
        .orange{ background: #fb8c00 }
        .blue  { background: #1e88e5 }
        .green { background: #43a047 }

        /* Position each face in 3D */
        .front  { transform: rotateY(  0deg) translateZ(calc(var(--size) / 2)); }
        .back   { transform: rotateY(180deg) translateZ(calc(var(--size) / 2)); }
        .right  { transform: rotateY( 90deg) translateZ(calc(var(--size) / 2)); }
        .left   { transform: rotateY(-90deg) translateZ(calc(var(--size) / 2)); }
        .top    { transform: rotateX( 90deg) translateZ(calc(var(--size) / 2)); }
        .bottom { transform: rotateX(-90deg) translateZ(calc(var(--size) / 2)); }

        /* A subtle frame around the whole cube */
        .cube-frame{
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow:
            0 10px 40px rgba(0,0,0,0.6),
            0 1px 0 rgba(255,255,255,0.02) inset;
          border-radius: 12px;
        }

        /* Responsive smaller sizes */
        @media (max-width: 480px){
          :root{ --size: 260px }
        }
      `}</style>

      <div className="cube-wrap default-rot " style={{ transform : `rotateX(-${pos.y/2}deg) rotateY(-${pos.x/2}deg)`}} aria-hidden>
        {/* We'll create 6 faces. Each face contains 9 stickers (3x3) --> total 54 stickers */}

        <div className="face front" aria-label="Front face">
          {Array.from({length:9}).map((_,i) => (
            <div key={i} className="sticker white" />
          ))}
        </div>

        <div className="face back" aria-label="Back face">
          {Array.from({length:9}).map((_,i) => (
            <div key={i} className="sticker yellow" />
          ))}
        </div>

        <div className="face right" aria-label="Right face">
          {Array.from({length:9}).map((_,i) => (
            <div key={i} className="sticker red" />
          ))}
        </div>

        <div className="face left" aria-label="Left face">
          {Array.from({length:9}).map((_,i) => (
            <div key={i} className="sticker orange" />
          ))}
        </div>

        <div className="face top" aria-label="Top face">
          {Array.from({length:9}).map((_,i) => (
            <div key={i} className="sticker blue" />
          ))}
        </div>

        <div className="face bottom" aria-label="Bottom face">
          {Array.from({length:9}).map((_,i) => (
            <div key={i} className="sticker green" />
          ))}
        </div>

        <div className="cube-frame" />
      </div>

      {/* small hint text  */}
      <div style={{position: 'absolute', bottom: 18, left: 18, color: '#ddd', fontSize: 13, opacity: 0.9}}>
        Hover to tilt · 6 faces × 9 stickers = 54 stickers {pos.x},{pos.y}
      </div>
    </div>
  )
}
