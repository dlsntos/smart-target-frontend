import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("❌ Please enter a valid email address.");
      throw new Error("Invalid email entered"); // actually throws an exception
    } else {
      setError(""); // clear error if valid
      navigate("/ads");
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
      <div className="opacity-0 animate-fadeIn transition-all duration-1000 ease-out flex flex-col items-center space-y-6">
        <h1 className="text-9xl font-extrabold mb-10 italic tracking-tighter">
          INDÚ
        </h1>
        <h2 className="text-2xl mb-6">Please Enter Your Email Here!</h2>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please enter your email here"
          className="px-4 py-2 rounded-md w-80 border border-white bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />

        {error && <p className="text-red-500">{error}</p>}

        <p className="mb-6">
          This is for your responses so we can back to you for an improved service!
        </p>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-white text-black font-bold rounded-md transition duration-300 ease-in-out hover:scale-105"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EmailPage;
