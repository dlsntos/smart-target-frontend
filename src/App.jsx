import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdSection from './components/AdSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-black h-screen flex flex-col justify-center'>
        <div className='flex items-center justify-between px-40'>
          <AdSection />
          <div style={
            {
              height: '70%',
              width: '40%',
              backgroundColor: 'white',
            }
          }>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
