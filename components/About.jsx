import React from "react";
import Image from "next/image";
import bg from "@/assets/bg.svg";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center relative justify-center"
      id="about"
    >
      {/* Content Wrapper */}
      <div className="relative z-0 w-full max-w-6xl px-6 sm:px-12 flex flex-col gap-6">
        {/* Heading */}
        <h1 className="font-uncut-sans-var font-semibold italic text-left text-nowrap max-w-full text-3xl md:text-4xl leading-[100%] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#C0AE42] via-[#379CA2] to-[#2C7FDC] py-6 px-8 sm:px-16 lg:px-32">
          {"<"}WHAT WE DO?{">"}
        </h1>

        {/* Paragraph */}
        <p className="text-white lg:text-[25px] sm:text-xl leading-relaxed font-mono">
        We’re a vibrant community of innovators, problem-solvers, and lifelong learners who celebrate Free and Open Source Software (FOSS) and its power to connect, empower, and transform.
          <br />
          <br />
          Whether you’re a beginner eager to learn, a coder looking to collaborate, or a creative soul with a passion for technology, FOSSMEC is your launchpad into the world of FOSS.
          Here, you can grow your skills, contribute to impactful projects, and make friendships that last a lifetime.
        </p>
      </div>
    </div>
  );
};

export default About;
