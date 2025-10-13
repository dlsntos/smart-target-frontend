import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:5000"; //Always use 127.0.0.1 for backend

function WebCam() {
  const [adCategory, setAdCategory] = useState("idle");
  const [attributes, setAttributes] = useState({
    age: "Unknown",
    gender: "Unknown",
    skin: "Unknown",
  });
  const [adUrl, setAdUrl] = useState("");
  const [processedReady, setProcessedReady] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [streamKey, setStreamKey] = useState(Date.now());

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sendIntervalRef = useRef(null);
  const sendEnabledRef = useRef(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = useState(() => {
    return location.state?.email || localStorage.getItem("userEmail") || "";
  });

  //Persist email
  useEffect(() => {
    if (location.state?.email) {
      localStorage.setItem("userEmail", location.state.email);
      setUserEmail(location.state.email);
    }
  }, [location.state]);

  //Poll backend every 2s for attributes + ad category
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [attrRes, catRes] = await Promise.all([
          fetch(`${API_BASE}/attributes`),
          fetch(`${API_BASE}/ad-category`),
        ]);
        if (!attrRes.ok || !catRes.ok) return;

        const attrData = await attrRes.json();
        const catData = await catRes.json();

        if (mounted) {
          setAttributes(attrData);
          setAdCategory(catData.category || "idle");
          setAdUrl(`${API_BASE}/dynamic-ad?t=${Date.now()}`);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  //Start camera + send frames
  useEffect(() => {
    let stream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();

          const width = videoRef.current.videoWidth || 640;
          const height = videoRef.current.videoHeight || 480;
          if (canvasRef.current) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
          }

          console.log("Camera's starting', sending frames!");
          sendEnabledRef.current = true;

          //Send frames ~10 FPS
          sendIntervalRef.current = setInterval(() => {
            if (sendEnabledRef.current) sendFrame();
          }, 50);
        }
      } catch (err) {
        console.error("Camera start error:", err);
      }
    }

    startCamera();

    return () => {
      sendEnabledRef.current = false;
      if (sendIntervalRef.current) clearInterval(sendIntervalRef.current);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  //Send frame to backend
  const sendFrame = async () => {
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
      console.log("📸 Sending frame to backend...");

      const res = await fetch(`${API_BASE}/upload_frame`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });

      if (res.ok) {
        console.log("✅ Frame sent successfully");
        if (!processedReady) {
          setProcessedReady(true);
          setStreamError(false);
        }
      } else {
        console.warn("⚠️ upload_frame failed:", res.status);
      }
    } catch (err) {
      console.error("Error sending frame:", err);
    }
  };

  //MJPEG stream reconnect logic
  useEffect(() => {
    if (!processedReady) return;
    const interval = setInterval(() => {
      setStreamKey(Date.now());
    }, 15000);
    return () => clearInterval(interval);
  }, [processedReady]);

  const handleStreamLoad = () => {
    setStreamError(false);
    setProcessedReady(true);
  };

  const handleStreamError = () => {
    console.warn("Stream load error — retrying...");
    setStreamError(true);
    setTimeout(() => {
      setStreamKey(Date.now());
      setStreamError(false);
    }, 1500);
  };

  const handleProceed = async () => {
    await fetch(`${API_BASE}/close-camera`, { method: "POST" });
    navigate("/feedback", { state: { email: userEmail } });
  };

const handleReset = async () => {
  try {
    await fetch("http://localhost:5000/reset", { method: "POST" });
    setAdCategory("idle");

    //Temporarily pause sending frames
    sendEnabledRef.current = false;

    //Wait a moment for backend to clear the locked_category for another scan.
    setTimeout(() => {
      sendEnabledRef.current = true;
      console.log("Camera feed resumed after reset");
    }, 2000);
  } catch (err) {
    console.error("Reset failed:", err);
  }
};

  const handleProblem = () => {
    fetch(`${API_BASE}/close-camera`, { method: "POST" })
      .then(() => navigate("/wrongpage", { state: { email: userEmail } }))
      .catch(console.error);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">Ad Category: {adCategory}</h2>
      <div className="w-[500px] flex justify-evenly">
        <h3>Age: {attributes.age}</h3>
        <h3>Gender: {attributes.gender}</h3>
        <h3>Skin: {attributes.skin}</h3>
      </div>

      {/* Camera & Processed Feed */}
      <div className="flex gap-4 mt-4">
        {/* Live Camera */}
        <div className="relative flex flex-col items-center">
          <video
            ref={videoRef}
            className="w-[320px] h-[240px] object-cover rounded-lg border"
            muted
            playsInline
          />
          <span className="text-sm mt-2 text-gray-500">Live Camera</span>
        </div>

        {/* Processed View */}
        <div className="relative flex flex-col items-center">
          {processedReady ? (
            <img
              key={streamKey}
              src={`${API_BASE}/video_feed`}
              alt="Processed"
              className="w-[320px] h-[240px] object-cover rounded-lg border"
              crossOrigin="anonymous"
              onLoad={handleStreamLoad}
              onError={handleStreamError}
            />
          ) : (
            <div className="w-[320px] h-[240px] flex items-center justify-center bg-gray-200 border rounded-lg text-gray-500">
              Waiting for processed view...
            </div>
          )}
          <span className="text-sm mt-2 text-gray-500">
            Server Processed View
          </span>
          {streamError && (
            <div className="text-xs mt-1 text-red-500">
              Stream error — retrying...
            </div>
          )}
        </div>
      </div>

      {/* Ad Display */}
      <img
        src={adUrl}
        alt="Advertisement"
        className="w-[660px] h-[240px] object-cover rounded-lg border mt-4"
      />

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleProceed}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Yes — Proceed to Feedback
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-600"
        >
          No — Reset and Scan Again
        </button>
        <button
          onClick={handleProblem}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          My demographic isn’t showing up
        </button>
      </div>
    </div>
  );
}

export default WebCam;
