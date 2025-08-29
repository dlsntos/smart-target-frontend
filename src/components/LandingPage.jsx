import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Link to="/consent">
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white cursor-pointer">
        <div className="opacity-0 animate-fadeIn transition-all duration-1000 ease-out flex flex-col items-center text-center">
          <h1 className="text-5xl font-extrabold mb-10 italic tracking-tight">
            WELCOME TO INDÚ
          </h1>
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
