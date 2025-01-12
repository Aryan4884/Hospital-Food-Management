import React from "react";
import HospitalBanner3 from "../assets/HospitalBanner3.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="mt-24">
      <section className="py-8 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6">
          <div className="lg:w-2/5 ml-16 mb-3">
            {" "}
            {/* Increased margin to move the image right */}
            <img
              className="rounded-lg w-full max-w-lg" // Increased width for a bigger image
              src={HospitalBanner3}
              alt="Hospital Food Management"
            />
          </div>

          <div className="lg:w-1/2 lg:pl-6 lg:text-left mr-10">
            <h2 className="text-3xl font-bold mb-3">
              Hospital Food Management
            </h2>
            <p className="text-lg leading-relaxed mb-3">
              Our hospital provides carefully prepared meals that support the
              health and recovery of our patients. With a focus on balanced
              nutrition, we cater to a variety of dietary needs, ensuring every
              patient receives the right meals for their recovery.
            </p>
            <p className="text-lg leading-relaxed mb-0">
              We collaborate with nutritionists to offer healthy, tasty meals
              that meet individual needs, including options for those with
              specific health conditions such as diabetes or hypertension.
            </p>
          </div>
        </div>
      </section>

      {/* Full-width section */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Join Us Today
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover how our hospital's food management system supports patient
            care and recovery. Join our community and learn more about our
            services.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
