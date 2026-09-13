import React from "react";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center relative justify-center"
      id="about"
    >
      {/* Content Wrapper */}
      <div className="relative z-0 w-full max-w-6xl px-6 sm:px-12 flex flex-col gap-6">
        {/* Heading */}
        <h2 className="font-uncut-sans-var font-semibold italic text-center text-nowrap max-w-full text-3xl md:text-4xl leading-[100%] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#C0AE42] via-[#379CA2] to-[#2C7FDC] py-6 px-8 sm:px-16 lg:px-32">
          {"<"}WHAT WE DO?{">"}
        </h2>

        {/* Paragraph */}
        <p className="text-white lg:text-[23px] sm:text-xl leading-relaxed font-mono text-center">
          FOSSMEC is the Free and Open Source Software Cell of Government Model
          Engineering College. The cell was formed to organize the college’s
          technical initiatives under a single, structured platform and to
          actively promote free open source culture. It brings together students
          passionate about technology to work on projects, contribute to global
          free open source communities, and explore real-world tools and
          workflows. Through workshops, hands-on sessions, and events, we
          encourage learning, collaboration, and contribution to the broader
          free open source ecosystem both within the college and beyond.
        </p>
      </div>
    </div>
  );
};

export default About;
