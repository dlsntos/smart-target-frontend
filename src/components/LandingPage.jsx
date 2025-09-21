import { Link } from "react-router-dom";
import logoImage from "../assets/photos/logo.png";

function LandingPage() {
  const scrollingText = '\u00A0INDÚ\u00A0'.repeat(100);

  return (
    <Link to="/consent">
      <div className="relative bg-black h-screen text-white overflow-hidden flex flex-col cursor-pointer">
        {/* Logo */}
        <div className="absolute top-0 left-0 z-50">
          <img
            src={logoImage}
            alt="Logo"
            className="w-[7.5rem] h-[7.5rem] object-contain"
          />
        </div>

        {/* Top scrolling banner */}
        <div className="absolute top-0 left-0 w-full h-[2.5rem] overflow-hidden z-40">
          <div className="whitespace-nowrap animate-scroll-horizontal text-2xl flex font-extrabold italic tracking-tighter">
            <div className="ml-4">{scrollingText}</div>
          </div>
        </div>

        {/* Bottom scrolling banner */}
        <div className="absolute bottom-0 left-0 w-full h-[2.5rem] overflow-hidden z-40">
          <div className="whitespace-nowrap animate-scroll-horizontal text-2xl flex font-extrabold italic tracking-tighter">
            <div className="ml-4">{scrollingText}</div>
          </div>
        </div>


        {/* Center content */}
        <div className="flex flex-col items-center justify-center flex-1 z-10 text-center">
          <h1 className="text-5xl font-extrabold mb-10 italic tracking-tighter">WELCOME TO INDÚ</h1>
          <p className="text-lg mb-12 text-gray-300">
            Personalized advertising powered by Faster-RCNN and SVM.
          </p>
          <span className="text-xl text-gray-400 animate-pulse">
            Tap anywhere to proceed →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default LandingPage;
