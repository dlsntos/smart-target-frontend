import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function WebCam() {
  const [adCategory, setAdCategory] = useState("idle");
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email;
  
  const [attributes, setAttributes] = useState({
    age: "Unknown",
    gender: "Unknown",
    skin: "Unknown",
  });
  const [adUrl, setAdUrl] = useState("");

  // ---------------- Poll backend for attributes + category ----------------
  useEffect(() => {
    const fetchAdData = async () => {
      try {
        // Fetch attributes
        const attrRes = await fetch("http://localhost:5000/attributes");
        const attrData = await attrRes.json();
        setAttributes(attrData);

        // Fetch locked category
        const catRes = await fetch("http://localhost:5000/ad-category");
        const catData = await catRes.json();
        const category = catData.category || "idle";
        setAdCategory(category);

        // Set ad based on category
        if (category !== "idle") {
          setAdUrl(`http://localhost:5000/ad-image?category=${category}&t=${Date.now()}`);
        } else {
          setAdUrl(""); // no ad if idle
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchAdData(); // initial fetch
    const interval = setInterval(fetchAdData, 2000); // refresh every 2s
    return () => clearInterval(interval);
  }, []);

  // ---------------- Action Handlers ----------------
  const handleProceed = async () => {
  try {
    // Send confirmation email
    await fetch("http://localhost:5000/confirm-email", { method: "POST" });

    // Close camera
    await fetch("http://localhost:5000/close-camera", { method: "POST" });
    
    // Navigate to feedback
    navigate("/feedback", { state: { email: userEmail } });
  } catch (err) {
    console.error("Error sending email or closing camera:", err);
  }
};
//navigate("/feedback", { state: { email: userEmail } });

  const handleReset = () => {
    fetch("http://localhost:5000/reset", { method: "POST" })
      .then(() => setAdCategory("idle"))
      .catch((err) => console.error("Error resetting category:", err));
  };

  const handleProblem = () => {
    fetch("http://localhost:5000/close-camera", { method: "POST" })
      .then(() => (window.location.href = "/wrong"))
      .catch((err) => console.error("Error closing camera:", err));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">Ad Category: {adCategory}</h2>
      <h3>Age Range: {attributes.age}</h3>
      <h3>Gender: {attributes.gender}</h3>
      <h3>Skin Color: {attributes.skin}</h3>

      <div className="relative w-[320px] h-[240px] mt-4 border-4 border-black rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="http://localhost:5000/video_feed"
          alt="Webcam Stream"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            "--r": "110px",
            "--cx": "50%",
            "--cy": "50%",
            "--ring": "4px",
            background: `
              radial-gradient(
                circle at var(--cx) var(--cy),
                rgba(0,0,0,0) 0 calc(var(--r) - var(--ring)),
                rgba(255,255,255,0.35) calc(var(--r) - var(--ring)) var(--r),
                rgba(0,0,0,0.75) var(--r)
              )
            `,
          }}
        />
      </div>

      {/* Ad follows locked category */}
      {adUrl && (
        <img
          className="w-[320px] h-[180px] mt-4 object-cover rounded-lg border transition-opacity duration-500"
          src={adUrl}
          alt="Ad Display"
        />
      )}

      <p className="mt-2 text-sm text-gray-600">
        Align your face with the outline for best results. The ad preview will update according to the locked category.
      </p>

      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={handleProceed}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          ✅ Yes — Proceed to Feedback
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          🔄 No — Reset and Scan Again
        </button>
        <button
          onClick={handleProblem}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          ⚠️ My demographic isn’t showing up
        </button>
      </div>
    </div>
  );
}

export default WebCam;
