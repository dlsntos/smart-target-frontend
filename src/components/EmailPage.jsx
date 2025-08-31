import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError("⚠️ Please enter a valid email address.");
      return;
    }
    setError("");

    try {
      const res = await fetch("http://localhost:5000/submit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      console.log("Email submitted & sent:", data);

      navigate("/ads");  // go to ads page
      navigate("/ads", { state: { email } });
    } catch (err) {
      console.error("Error submitting email:", err);
      setError("Failed to submit email. Try again.");
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-9xl font-extrabold mb-10 italic tracking-tighter">
          INDÚ
        </h1>
        <h2 className="text-2xl mb-6">Please Enter Your Email Here!</h2>

        <div className="flex flex-col w-80">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email here"
            className={`px-4 py-2 rounded-md border bg-transparent text-white placeholder-gray-400 focus:outline-none 
              ${error ? "border-red-500" : "border-white"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <p className="mb-6 text-center px-4">
          This will be used later on so that we can send the recommendations to you!
        </p>

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

export default EmailPage;
