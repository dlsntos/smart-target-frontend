import React from 'react';
import Ads from './Ads';
function AdSection() {
  return (
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
  );
}

export default AdSection;