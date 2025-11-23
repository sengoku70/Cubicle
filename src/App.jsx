import { useState } from 'react'
import Cubicle from '../components/Cubicle'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <Cubicle/>
    </>
  )
}

export default App
