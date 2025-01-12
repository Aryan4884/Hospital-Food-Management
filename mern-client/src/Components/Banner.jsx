import React from "react";
import HospitalBanner2 from "../assets/HospitalBanner2.jpg"; // Adjust the path as per your folder structure

const Banner = () => {
  return (
    <div className="px-6 lg:px-32 bg-teal-100 flex items-center mt-20">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-20">
        {/* Text Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800 font-serif">
            Welcome to one stop platform{" "}
            <span className="text-blue-700">for Hospital Food Management</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 md:w-4/5 font-light leading-relaxed tracking-wide font-sans">
            Track and manage food delivery and patient diets efficiently. Our
            platform ensures timely meal preparation, delivery, and nutritional
            tracking for patients. From planning meals to monitoring dietary
            restrictions, we make hospital food management seamless and
            stress-free.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={HospitalBanner2}
            alt="Hospital Food Management"
            className="w-full max-w-md lg:max-w-lg rounded-lg shadow-lg border-4 border-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
