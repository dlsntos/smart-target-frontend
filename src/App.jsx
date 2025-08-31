import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdSection from './components/AdSection';
import WebCam from './components/Webcam';
import EmailPage from './components/EmailPage';
import ConsentPage from './components/ConsentPage';
import LandingPage from './components/LandingPage';
import logoImage from './assets/photos/logo.png';
import Feedback from './components/Feedback';
import Wrongpage from './components/wrongpage';

// keep your original layout as Home
function Home() {
  const scrollingText = 'INDÚ•'.repeat(100);

  return (
    <div className="relative bg-black h-screen grid grid-cols-2 text-white overflow-hidden">
      <div className="absolute top-0 left-0 z-50">
        <img src={logoImage} alt="Logo" className="w-[7.5rem] h-[7.5rem] object-contain" />
      </div>

      <div className="absolute top-0 left-0 w-full h-[2.5rem] overflow-hidden z-40">
        <div className="whitespace-nowrap animate-scroll-horizontal text-2xl flex">
          <div className="ml-4">{scrollingText}</div>
        </div>
      </div>

      {/* Left: vertical scroll */}
      <div className="absolute top-0 bottom-0 left-0 w-[2.5rem] overflow-hidden z-40 flex items-center justify-center">
        <div className="animate-scroll-vertical flex flex-col">
          <div className="flex flex-col items-center">
            <div className="text-2xl rotate-[-90deg] whitespace-nowrap leading-[2.5rem]">
              {scrollingText}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-around items-center px-20 pt-10 col-span-2 h-full z-10">
        <AdSection />
        <WebCam />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  
        <Route path="/consent" element={<ConsentPage />} />  
        <Route path="/email" element={<EmailPage />} />
        <Route path="/ads" element={<Home />} />   
        <Route path="/feedback" element={<Feedback />} /> 
        <Route path="/wrongpage" element={<Wrongpage />} />       
      </Routes>
    </Router>
  );
}

export default App;
