import React from "react";
import { Link } from "react-router-dom";
import HospitalBanner4 from "../assets/HospitalBanner4.jpg";

const PromoBanner = () => {
  return (
    <div className="mt-16 py-12 bg-teal-100 px-4 lg:px-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 leading-snug">
            Excellence in Hospital Food Management for Better Recovery
          </h2>
          <Link to="/services" className="block">
            <button className="bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">
              Learn More
            </button>
          </Link>
        </div>
        <div>
          <img
            src={HospitalBanner4}
            alt="Hospital Food Management"
            className="w-96 border border-gray-400 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
