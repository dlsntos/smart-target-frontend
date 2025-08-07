import { useEffect, useState } from "react";function Ads() {
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
    <div className="h-48 w-64 bg-white text-black border border-gray-300 shadow-lg overflow-hidden relative">
      {adImgUrl && (
        <img
          className="w-full h-full object-cover"
          src={adImgUrl}
          alt="Ad"
        />
      )}
      <p className="text-2xl font-bold capitalize text-center">
        {adCategory !== "idle" ? adCategory.replace("_", " ") : "No Target"}
      </p>
    </div>
  );
}
export default Ads;