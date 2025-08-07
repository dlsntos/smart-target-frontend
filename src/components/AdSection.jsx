import { useEffect, useState } from "react";
import Ads from "./Ads";
function AdSection() {
  
  return (
  <div>
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <Ads />
        <Ads />
        <Ads />
        <Ads />
        <Ads />
        <Ads />
      </div>
    </div>
  </div>
    
  );
}

export default AdSection;