import React from "react";
import { Link } from "react-router-dom";
import { IoPawOutline } from "react-icons/io5";
import heroImg from "../assets/home.png";
import user1 from "../assets/user1.jpeg";
import user2 from "../assets/user2.jpeg";
import user3 from "../assets/user3.jpeg";
import user4 from "../assets/user4.jpeg";

const Home: React.FC = () => {
  return (
    <section className="bg-[#f7f3ed] flex flex-col md:flex-row md:gap-10 items-center md:items-start justify-center px-6 md:px-16 py-16 md:h-[600px] w-full">
      {/* Left Text Section */}
      <div className="flex flex-col gap-6 text-center md:text-left">
        <p className="text-3xl md:text-5xl text-[#212121] leading-snug">
          Book <span className="text-[#f57d38] font-semibold">vet appointments</span>{" "}
          with ease, <span className="text-[#f57d38] font-semibold">track your pet’s health</span> and{" "}
          get trusted care — all in one place.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center md:justify-start">
          <Link to="/appointments">
            <button className="relative flex items-center justify-center gap-2 px-6 py-3 border border-[#f57d38] text-[#f57d38] font-semibold rounded-full overflow-hidden group transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                Book Appointment <IoPawOutline className="text-xl" />
              </span>
              <span className="absolute inset-0 bg-[#f57d38] w-0 group-hover:w-full transition-all duration-300"></span>
            </button>
          </Link>
        </div>

        {/* Overlapping User Images */}
        <div className="flex justify-center md:justify-start mt-4">
          <div className="flex items-center">
            <img
              src={user1}
              alt="user1"
              className="w-13 h-13 rounded-full border-3 border-[#f7f3ed] -mr-4"
            />
            <img
              src={user2}
              alt="user2"
              className="w-13 h-13 rounded-full border-3 border-[#f7f3ed] -mr-4"
            />
            <img
              src={user3}
              alt="user3"
              className="w-13 h-13 rounded-full border-3 border-[#f7f3ed] -mr-4"
            />
            <img
              src={user4}
              alt="user4"
              className="w-13 h-13 rounded-full border-3 border-[#f7f3ed]"
            />

          </div>
        </div>
      </div>

      {/* Right Hero Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src={heroImg}
          alt="Vet hero"
          className="w-100 max-w-md md:max-w-xl object-cover"
        />
      </div>
    </section>
  );
};

export default Home;
