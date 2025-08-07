import React, { useEffect, useState } from 'react';

function WebCam() {
    const [consent, setConsent] = useState(false);
    const [adCategory, setAdCategory] = useState('idle');

    // Fetch consent status from backend
    useEffect(() => {
        fetch('http://localhost:5000/consent')
            .then(res => res.json())
            .then(data => setConsent(data.consent));
    }, []);

    // Poll ad category from backend
    useEffect(() => {
        if (consent) {
            const interval = setInterval(() => {
                fetch('http://localhost:5000/ad-category')
                    .then(res => res.json())
                    .then(data => setAdCategory(data.category));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [consent]);

    // Handle consent button
    const handleConsent = () => {
        fetch('http://localhost:5000/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consent: true })
        }).then(() => setConsent(true));
    };

    if (!consent) {
        return (
            <div>
                <p>
                    By clicking Agree, you allow access to the camera for age/gender detection. Targeted Advertisement :)
                </p>
                <button onClick={handleConsent}>Agree</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Ad Category: {adCategory}</h2>
            <img
                className="w-[400px] h-[300px] object-cover rounded-[10px] border-2 border-[#222]"
                src="http://localhost:5000/video_feed"
                alt="Webcam Stream"
            />
        </div>
    );
}

export default WebCam;