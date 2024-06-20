import React from 'react';

const StyledImage = ({ icon }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          {/* Use a div with background image instead of img tag */}
          <div
            className="h-40 bg-center bg-no-repeat bg-contain hover:scale-105 transition-transform duration-300 ease-in-out transform-gpu"
            style={{ backgroundImage: `url(${icon})` }}
            aria-label="Technology logo"
          />
        </div>
      </div>
    </div>
  );
};

export default StyledImage;
