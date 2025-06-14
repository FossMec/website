import React from "react";
import landingBg from "../assets/landing_bg.svg";
import Image from "next/image";

const Landing = () => {
  return (
    <div
      className="min-h-screen w-screen flex z-10 flex-col max-sm:pl-7 items-center justify-start max-md:pt-50 md:justify-center relative bg-our-bg"
      id="home"
    >
      <div className="absolute -top-2 left-0 inset-0 z-[0] overflow-hidden">
        <Image
          src={landingBg}
          alt="Background image"
          fill
          className="object-cover"
        />
      </div>

      <div className="z-10 max-w-[80%] -ml-13 max-md:text-center w-full px-4 flex flex-col items-start">
        <div className="flex flex-col items-start text-center md:text-left">
          <h1 className="text-[38px] md:text-5xl lg:text-7xl xl:text-[95px] font-uncut-sans font-extrabold leading-[1]">
            FOSSMEC — Where Innovation Meets Openness
          </h1>
        </div>

        <p className="text-sm max-sm:leading-[1.5] md:text-sm lg:text-md xl:text-[18px] font-dm-mono italic mt-5 leading-[32px] max-w-full md:max-w-4/5 uppercase text-[#DAE2E9E0] opacity-88">
          A community driven by curiosity, collaboration, and creativity —
          empowering the innovators of tomorrow at Model Engineering College.
        </p>
      </div>
    </div>
  );
};

export default Landing;
