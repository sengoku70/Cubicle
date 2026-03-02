import { useState } from 'react'
import Cubicle from '../components/Cubicle'
import './App.css'
import Testpage from '../components/Testpage'
import Cubefunc from '../components/Cubefunc'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Cubefunc/>
    </>
  )
}

export default App
