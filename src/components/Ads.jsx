import { useEffect, useState } from "react";
function Ads() {
  const [adCategory, setAdCategory] = useState("idle");
  const [adImgUrl, setAdImgUrl] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/ad-category")
        .then((res) => res.json())
        .then((data) => {
          if (data.category) {
            setAdCategory(data.category);
            setAdImgUrl(`http://localhost:5000/ad-image?${Date.now()}`); // cache-busting
          }
        });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-48 w-64 bg-white text-black flex flex-col items-center justify-center border border-gray-300 rounded-xl shadow-lg">
      {adImgUrl && (
        <img
          src={adImgUrl}
          alt="Ad"
          style={{
            width: 320,
            height: 240,
            objectFit: "cover",
            borderRadius: 8,
            border: "2px solid #222",
            marginBottom: 16,
          }}
        />
      )}
      <p className="text-2xl font-bold capitalize">
        {adCategory !== "idle" ? adCategory.replace("_", " ") : "No Target"}
      </p>
    </div>
  );
}
export default Ads;