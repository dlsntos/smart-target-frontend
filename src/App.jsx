import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdSection from './components/AdSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='relative bg-black h-screen grid grid-cols-2 text-white overflow-hidden'>
        <div className="absolute top-0 w-full text-center py-2 text-sm tracking-widest font-bold">
          INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ
        </div>
        <div className='flex items-center justify-between px-40 pt-10 col-span-2 h-full z-10'>
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
