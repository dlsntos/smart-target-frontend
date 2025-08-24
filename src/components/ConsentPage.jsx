// src/components/ConsentPage.jsx
import React from "react";

function ConsentPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white opacity-0 animate-fadeIn">

      <h1 className="text-9xl font-extrabold mb-10 italic tracking-tighter">INDÚ</h1>


      <h2 className="text-2xl mb-6">Welcome Valued Customer!</h2>

      {/* Terms and Conditions */}
      <div className="w-full max-w-lg border border-gray-400 p-4 mb-6 text-left 
                      overflow-y-auto h-40 bg-black rounded-md">
        <h3 className="font-bold mb-2">TERMS AND CONDITIONS</h3>
        <p className="text-sm leading-relaxed">
          By accepting our Terms and Conditions you give permission for the 
          collection and processing of your facial data in order to provide a 
          personalized advertising experience. You can be sure that your information 
          will be handled sensibly and in compliance with all relevant data privacy 
          laws and regulations. We are dedicated to protecting your private data. 
          Unless mandated by law, your facial data will never be sold, shared, or 
          disclosed to any third parties without your express consent. Strict 
          security measures are in place to guarantee the confidentiality and 
          protection of the data, which will only be used to improve your user
          experience on this platform. You confirm that you have read, 
          comprehended, and accepted these terms by continuing, and that you 
          still have all the rights provided by current data protection laws. <br />

          ...
        </p>
      </div>



      <p className="mb-6">
        Would you like to consent to our new custom facial advertisement?
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <button className="px-6 py-2 bg-white text-black rounded-xl font-semibold">
          YES
        </button>
        <button className="px-6 py-2 bg-white text-black rounded-xl font-semibold">
          NO
        </button>
      </div>
    </div>
  );
}

export default ConsentPage;
