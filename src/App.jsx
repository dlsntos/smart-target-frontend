import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdSection from './components/AdSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-orange-300 h-screen'>
        <AdSection />
      </div>
    </>
  )
}

export default App
