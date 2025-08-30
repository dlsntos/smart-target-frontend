import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import qrImage from "../assets/qr.png"; // optional QR for feedback

function Wrongpage() {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!feedback.trim()) {
      setMessage("⚠️ Please enter your feedback before submitting.");
      return;
    }

    setMessage("✅ Feedback submitted! Redirecting...");
    setFeedback(""); // clear textarea

    // Redirect after short delay
    setTimeout(() => {
      navigate("/"); // go back to landing page
    }, 1500); // 1.5 seconds
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
        <h1 className="text-9xl font-extrabold mb-10 italic tracking-tighter">
          INDÚ
        </h1>
        <h2 className="text-3xl mb-4 text-center">Oops!</h2>

        <p className="text-center text-lg">
          It looks like your demographic isn’t currently being selected. 
          We apologize for the inconvenience. Please provide your feedback so we can improve. Answer the post-survey in the QR CODE for a chance to win 500 pesos in gcash :P
        </p>

        {/* Large textarea input */}
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full h-64 p-4 rounded-md border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
        />

        {message && (
          <p
            className={`text-sm ${
              message.startsWith("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Optional QR code for feedback */}
        <div className="flex flex-col items-center mt-4">
          <img
            src={qrImage}
            alt="Feedback QR Code"
            className="w-36 h-36"
          />
          <p className="mt-2 text-gray-400 text-center text-sm">
            Scan this QR code to submit feedback
          </p>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Wrongpage;
