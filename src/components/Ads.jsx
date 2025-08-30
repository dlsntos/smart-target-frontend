import { useEffect, useState } from "react";

function Ads({ index, total }) {
  const [adCategory, setAdCategory] = useState("idle");
  const [adImages, setAdImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Poll backend for current locked category
  useEffect(() => {
    let isMounted = true;

    const fetchCategory = async () => {
      try {
        const res = await fetch("http://localhost:5000/ad-category");
        const data = await res.json();
        const category = data.category || "idle";
        if (!isMounted) return;
        setAdCategory(category);
      } catch (err) {
        console.error("Error fetching ad category:", err);
        if (isMounted) setAdCategory("idle");
      }
    };

    fetchCategory();
    const interval = setInterval(fetchCategory, 2000); // poll every 2s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Fetch images for current category
  useEffect(() => {
    if (!adCategory) return;
    const urls = [];

    // Preload multiple images for scrolling
    // Use timestamps to prevent caching
    for (let i = 0; i < 10; i++) {
      urls.push(`http://localhost:5000/ad-image?category=${adCategory}&t=${Date.now()}_${i}`);
    }

    setAdImages(urls);
    setCurrentIndex(0);
  }, [adCategory]);

  // Cycle images in this box
  useEffect(() => {
    if (adImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adImages.length);
    }, 8000); // change every 5s
    return () => clearInterval(interval);
  }, [adImages]);

  const adImgUrl = adImages.length
    ? adImages[(currentIndex + index) % adImages.length]
    : "http://localhost:5000/ad-image";

  return (
    <div className="h-48 w-64 bg-white text-black border border-gray-300 shadow-lg overflow-hidden relative rounded-2xl">
      <img
        className="w-full h-full object-cover"
        src={adImgUrl}
        alt={`Ad - ${adCategory}`}
        onError={(e) => (e.target.src = "http://localhost:5000/ad-image")}
      />
    </div>
  );
}

export default Ads;
