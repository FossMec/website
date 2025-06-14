"use client";
import React, { useState } from "react";
import TeamsCard from "./TeamsCard";
import { TEAM2022, TEAM2023, TEAM2024 } from "@/constants";
import DrSonyP from "@/assets/Team/DrSonyP.png";
import SonyMemoji from "@/assets/Team/memoji/sony_miss.png";
import NoImage from "@/assets/noimg.png";

const Team = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const teamsByYear = {
    "2024": TEAM2024,
    "2023": TEAM2023,
    "2022": TEAM2022,
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center relative justify-center mb-10"
      id="team"
    >
      <div className="w-full relative h-fit flex mt-40 text-center">
        <div className="xl:w-[20%] sm:w-[15%]" />
        <div className="w-full flex flex-col items-center sm:items-start gap-6">
          <h1
            className={
              "font-uncut-sans-var font-semibold italic sm:text-start top-0 px-8 sm:px-16 lg:px-32 text-3xl md:text-4xl leading-[100%] tracking-[-0.04em] align-middle capitalize text-transparent bg-clip-text bg-gradient-to-r from-[#C0AE42] via-[#379CA2] to-[#2C7FDC]"
            }
          >
            {"<"}MEET THE TEAM!{">"}
          </h1>
          
          <div className="px-8 sm:px-16 lg:px-32">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent border-2 border-[#379CA2] rounded-md px-4 py-2 text-[#DAE2E9E0] focus:outline-none focus:border-[#C0AE42] transition-colors cursor-pointer"
            >
              {Object.keys(teamsByYear).map((year) => (
                <option 
                  key={year} 
                  value={year}
                  className="bg-[#1a1a1a] text-[#DAE2E9E0]"
                >
                  Team {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="xl:h-20 lg:h-16 h-12" />
      <div className="grid lg:grid-cols-6 gap-8 xl:w-[70%] lg:w-[90%] md:w-[80%] md:grid-cols-4 sm:grid-cols-4 min-[500px]:grid-cols-3 grid-cols-2 mb-20 px-4">
        <TeamsCard
          img={selectedYear === "2024" ? SonyMemoji :  NoImage}
          name={"Dr. Sony P"}
          position={"Faculty In-Charge"}
        />
        {teamsByYear[selectedYear].map((item) => (
          <TeamsCard
            key={item.id}
            img={item?.img}
            name={item.name}
            position={item.position}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
