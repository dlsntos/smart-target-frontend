import React from "react";

function EmailPage() {
  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-9xl font-extrabold mb-10 italic tracking-tighter">
          INDÚ
        </h1>
        <h2 className="text-2xl mb-6">Please Enter Your Email Here!</h2>
        <input
          type="email"
          placeholder="example@email.com"
          className="px-4 py-2 rounded-md w-80 border-2 border-black text-black bg-transparent 
           hover:bg-black hover:text-white transition duration-300 cursor-pointer"
        />
        <p className="mb-6">
          This is for your responses so we can back to you for an improved service!
        </p>
        <button className="px-6 py-2 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition">
          Submit
        </button>
      </div>
    </div>
  );
}

export default EmailPage;
