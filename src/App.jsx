import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdSection from './components/AdSection'
import WebCam from './components/Webcam'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='relative bg-black h-screen grid grid-cols-2 text-white overflow-hidden'>
        <div className="absolute top-0 w-full text-center py-2 text-sm tracking-widest font-bold">
          INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ•INDÚ
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-top-left text-sm tracking-widest font-semibold z-0">
          INDÚ•INDÚ•INDÚ•INDÚ•INDÚ
        </div>
        <div className='flex items-center justify-between px-40 pt-10 col-span-2 h-full z-10'>
          <AdSection />
          <div className="h-[70%] w-[40%]">
            {/*Reference: https://youtu.be/0HJ1cMBkWJ4?si=9MgO4EPotEm_ES0K*/}
            <WebCam className="h-[70%] w-[40%] bg-white"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
