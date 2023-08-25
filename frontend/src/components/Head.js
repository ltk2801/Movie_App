import React from "react";

const Head = ({ title }) => {
  return (
    <div className="w-full bg-deepGray lg:h-64 relative overflow-hidden rounded-md">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/2c00861d-ff2c-4015-ad91-91bf106b80a3/VN-vi-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="aboutus"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-800 to-transparent opacity-75"></div>
      <div className="absolute lg:top-24 top-16 w-full flex-colo">
        <h1 className="text-2xl lg:text-h1 text-white text-center font-bold">
          {title && title}
        </h1>
      </div>
    </div>
  );
};

export default Head;
