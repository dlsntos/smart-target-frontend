import React, { useState, useEffect } from "react";
import { useNavigate, useLocation,} from "react-router-dom";
import qrImage from "../assets/qr.png"; // adjust path if needed

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setUserEmail(location.state.email);
    } else {
      setMessage("⚠️ User email is missing. Please go back and enter your email.");
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      setMessage("⚠️ Please enter your feedback before submitting.");
      return;
    }

    if (!userEmail) return; // don't submit if email missing

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, message: feedback }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ Feedback submitted! Your feedback ID is ${result.id}`);
        setFeedback("");

        setTimeout(() => {
          navigate("/"); // redirect to landing page
        }, 1500);
      } else {
        setMessage(`⚠️ ${result.error}`);
      }
    } catch (err) {
      setMessage("⚠️ Failed to submit feedback. Please try again.");
      console.error(err);
    }
  };
  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center p-5">
      <div className="h-full flex flex-col items-center space-y-6 w-full max-w-3xl">
        <h1 className="text-9xl font-extrabold mb-7 italic tracking-tighter">
          INDÚ
        </h1>
        <h2 className="text-2xl mb-8 text-center font-bold">FEEDBACK</h2>

        <p className="text-center text-lg">
          Please check your spam folder to answer the Google Form so that we can 
          know your experience on our system! Your feedback is very valuable to us.
        </p>

        <div className="flex justify-evenly">
          <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
          className="w-full h-64 p-4 rounded-md border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
          />

          {/* QR code beside textarea */}
          <div className="flex flex-col items-center ml-7">
            <img
              src={qrImage}
              alt="Feedback QR Code"
              className="w-36 h-36"
            />
            <p className="mt-2 text-gray-400 text-justify text-m">
              Scan this QR code and answer our post-survey for a chance to win 500 pesos sa Gcash mo :P.
            </p>
            <button
              onClick={handleSubmit}
              className="px-16 py-2 mt-4 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition"
            >
              Submit
            </button>
          </div>
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
      </div>
    </div>
  );
}

export default Feedback;
