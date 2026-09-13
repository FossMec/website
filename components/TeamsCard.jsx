import React from "react";
import Image from "next/image";
import NoImage from "@/assets/noimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { urlFor } from "@/sanity/lib/image";

function TeamsCard({ img, name, position, linkedin, github }) {
  const imgSrc = img
    ? urlFor(img).width(176).format("webp").url()
    : NoImage;

  return (
    <div className="relative overflow-hidden w-[176px] h-[240px] before:w-full before:h-full before:bg-white/6 before:top-0 before:left-0 before:absolute before:-translate-y-full before:transition-all before:duration-[0.75s] hover:before:translate-y-0 transition-transform duration-300 hover:scale-105 max-sm:w-[150px] max-sm:h-[230px]">
      <div className="w-full h-full flex flex-col justify-between pt-7 pb-3.5 group items-center transition-all duration-[0.75s] border border-white/10 hover:border-[#ACAB4F]/38 relative before:absolute before:min-h-[10px] before:min-w-[10px] before:transition-all before:duration-[0.75s] before:border-white/10 hover:before:border-[#ACAB4F] after:transition-all after:duration-[0.75s] after:border-white/10 hover:after:border-[#ACAB4F] before:border-t-[3px] before:border-l-[3px] before:top-[-2px] before:left-[-2px] after:absolute after:h-[10px] after:w-[10px] after:border-t-[3px] after:border-r-[3px] after:top-[-2px] after:right-[-2px] backdrop-blur-[3px]">
        <div className="absolute h-full w-full before:absolute before:min-h-[10px] z-20 top-0 before:min-w-[10px] before:transition-all before:duration-[0.75s] before:border-white/10 group-hover:before:border-[#ACAB4F] after:transition-all after:duration-[0.75s] after:border-white/10 group-hover:after:border-[#ACAB4F] before:border-b-[3px] before:border-l-[3px] before:bottom-[-2px] before:left-[-2px] after:absolute after:h-[10px] after:w-[10px] after:border-b-[3px] after:border-r-[3px] after:bottom-[-2px] after:right-[-2px]" />

        {/* Image + Icons container */}
        <div className="relative flex justify-center">
          <div className="relative w-28 h-28 overflow-hidden rounded-lg">
            <Image
              src={imgSrc}
              alt={`${name} - ${position} at FOSS MEC`}
              fill
              className="object-cover"
            />
          </div>

          {(linkedin || github) && (
            <div className="absolute bottom-1 left-1 flex z-30 overflow-hidden">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name}'s LinkedIn profile`}
                  className={`bg-black/60 backdrop-blur-2xl text-white px-1.5 py-1 flex items-center justify-center border-r border-white/20 hover:bg-black/45 transition ${
                    !github ? "rounded-md" : "rounded-l-md"
                  }`}
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-2.5 h-2.5" />
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name}'s GitHub profile`}
                  className={`bg-black/60 backdrop-blur-2xl text-white px-1.5 py-1 flex items-center justify-center border-white/20 hover:bg-black/45 transition ${
                    !linkedin ? "rounded-md" : "rounded-r-md"
                  }`}
                >
                  <FontAwesomeIcon icon={faGithub} className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="relative w-full flex justify-center items-center flex-col grow my-4">
          <h3 className="font-uncut-sans font-medium text-sm leading-tight tracking-[0px] text-center align-middle uppercase text-white/80">
            {name}
          </h3>
          <p className="font-dm-mono font-normal text-xs min-h-6 relative tracking-[0.3px] text-center align-middle text-white/54">
            <span className="absolute text-center w-full min-w-[100px] mx-auto translate-x-[-50%] py-1.5">
              {position}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeamsCard;
