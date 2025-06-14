"use client";

import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import Image from "next/image";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col px-5 md:px-15 fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${mobileMenuOpen ? "h-auto" : "h-[89px]"}
        ${
          scrolled && !mobileMenuOpen
            ? "bg-white/3 backdrop-blur-xs border-b border-white/20"
            : mobileMenuOpen
            ? "bg-white/3 backdrop-blur-xs border-b border-white/20"
            : "bg-transparent border-transparent"
        }`}
    >
      <div className="flex items-center justify-between w-full">
        <a href="#home">
          <Image src={logo} alt="FOSSMEC Logo" className="h-[85px] w-[85px]" />
        </a>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-10 font-martian-mono">
          <a
            href="#home"
            className="text-[14px] hover:text-white/80 transition-colors"
          >
            HOME
          </a>
          <a
            href="#about"
            className="text-[14px] hover:text-white/80 transition-colors"
          >
            ABOUT
          </a>
          <a
            href="#events"
            className="text-[14px] hover:text-white/80 transition-colors"
          >
            EVENTS
          </a>
          <a
            href="#team"
            className="text-[14px] hover:text-white/80 transition-colors mr-7"
          >
            TEAM
          </a>
          <div
            className="relative cursor-pointer group before:absolute before:min-h-[19px] before:min-w-[19px] before:border-[#FFD022] before:border-t before:border-l before:top-[-10px] before:left-[-10px] before:transition-all before:duration-300 after:absolute after:h-[19px] after:w-[19px] after:border-[#FFD022] after:border-t after:border-r after:top-[-10px] after:right-[-10px] after:transition-all after:duration-300 hover:before:top-[-1px] hover:before:left-[-1px] hover:before:min-h-[10px] hover:before:min-w-[10px] hover:before:border-t-2 hover:before:border-l-2 hover:after:top-[-1px] hover:after:right-[-1px] hover:after:h-[10px] hover:after:w-[10px] hover:after:border-t-2 hover:after:border-r-2"
            onClick={() =>
              window.open("https://t.me/joinchat/_wHtSpuMBQxhODhl", "_blank")
            }
          >
            <div className="absolute h-full w-full before:absolute before:min-h-[19px] before:min-w-[19px] before:border-[#FFD022] before:border-b before:border-l before:bottom-[-10px] before:left-[-10px] before:transition-all before:duration-300 after:absolute after:h-[19px] after:w-[19px] after:border-[#FFD022] after:border-b after:border-r after:bottom-[-10px] after:right-[-10px] after:transition-all after:duration-300 group-hover:before:bottom-[-1px] group-hover:before:left-[-1px] group-hover:before:min-h-[10px] group-hover:before:min-w-[10px] group-hover:before:border-b-2 group-hover:before:border-l-2 group-hover:after:bottom-[-1px] group-hover:after:right-[-1px] group-hover:after:h-[10px] group-hover:after:w-[10px] group-hover:after:border-b-2 group-hover:after:border-r-2" />
            <button className="bg-[#FFD022] font-semibold text-[14px] px-5 py-2 text-[#0C2444]">
              JOIN FOSS
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "max-h-[300px] opacity-100 py-5"
            : "max-h-0 opacity-0"
        } flex flex-col items-center gap-5 font-martian-mono`}
      >
        <a
          href="#home"
          className="text-[14px] hover:text-white/80 transition-colors"
        >
          HOME
        </a>
        <a
          href="#about"
          className="text-[14px] hover:text-white/80 transition-colors"
        >
          ABOUT
        </a>
        <a
          href="#events"
          className="text-[14px] hover:text-white/80 transition-colors"
        >
          EVENTS
        </a>
        <a
          href="#team"
          className="text-[14px] hover:text-white/80 transition-colors"
        >
          TEAM
        </a>
        <div className="relative w-fit cursor-pointer group before:absolute before:min-h-[19px] before:min-w-[19px] before:border-[#FFD022] before:border-t before:border-l before:top-[-10px] before:left-[-10px] before:transition-all before:duration-300 after:absolute after:h-[19px] after:w-[19px] after:border-[#FFD022] after:border-t after:border-r after:top-[-10px] after:right-[-10px] after:transition-all after:duration-300 hover:before:top-[-1px] hover:before:left-[-1px] hover:before:min-h-[10px] hover:before:min-w-[10px] hover:before:border-t-2 hover:before:border-l-2 hover:after:top-[-1px] hover:after:right-[-1px] hover:after:h-[10px] hover:after:w-[10px] hover:after:border-t-2 hover:after:border-r-2">
          <div className="absolute h-full w-full before:absolute before:min-h-[19px] before:min-w-[19px] before:border-[#FFD022] before:border-b before:border-l before:bottom-[-10px] before:left-[-10px] before:transition-all before:duration-300 after:absolute after:h-[19px] after:w-[19px] after:border-[#FFD022] after:border-b after:border-r after:bottom-[-10px] after:right-[-10px] after:transition-all after:duration-300 group-hover:before:bottom-[-1px] group-hover:before:left-[-1px] group-hover:before:min-h-[10px] group-hover:before:min-w-[10px] group-hover:before:border-b-2 group-hover:before:border-l-2 group-hover:after:bottom-[-1px] group-hover:after:right-[-1px] group-hover:after:h-[10px] group-hover:after:w-[10px] group-hover:after:border-b-2 group-hover:after:border-r-2" />
          <a
            className="bg-[#FFD022] font-semibold text-[14px] px-5 py-2 text-[#0C2444]"
            href="https://t.me/joinchat/_wHtSpuMBQxhODhl"
          >
            JOIN FOSS
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
