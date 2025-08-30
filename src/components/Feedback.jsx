import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import qrImage from "../assets/qr.png"; // adjust path if needed

function Feedback() {
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
        <h2 className="text-2xl mb-6 text-center">FEEDBACK</h2>

        <p className="text-center text-lg">
          Please check your spam folder to answer the Google Form so that we can 
          know your experience on our system! Your feedback is very valuable to us.
        </p>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full h-64 p-4 rounded-md border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
        />

        {/* QR code below textarea */}
        <div className="flex flex-col items-center mt-4">
          <img
            src={qrImage}
            alt="Feedback QR Code"
            className="w-36 h-36"
          />
          <p className="mt-2 text-gray-400 text-center text-sm">
            Scan this QR code and answer our post-survey for a chance to win 500 pesos sa Gcash mo :P.
          </p>
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.startsWith("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Feedback;
