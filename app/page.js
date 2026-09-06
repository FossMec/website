"use client";

import { useEffect, useState } from "react";
import About from "@/components/About";
import Events from "@/components/events/Events";
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Team from "@/components/Team";
// import LenisWrapper from "@/utils/LenisWrapper";
import bg from "@/assets/bg.svg";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import JsonLd from "@/components/seo/JsonLd";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "FOSS MEC",
  description:
    "FOSS MEC is a non-profit foundation dedicated to promoting and strengthening the Free and Open Source Software (FOSS) ecosystem within the MEC community.",
  url: "https://foss.mec.ac.in",
  logo: "https://foss.mec.ac.in/og-image.png",
  parentOrganization: {
    "@type": "EducationalOrganization",
    name: "Govt. Model Engineering College, Thrikkakara, Kochi",
  },
  sameAs: [
    "https://instagram.com/foss_mec",
    "https://t.me/joinchat/_wHtSpuMBQxhODhl",
    "https://linkedin.com/company/fossmec",
    "https://github.com/FOSSMEC",
    "https://x.com/FossMec",
    "https://mastodon.social/@FOSS_MEC",
  ],
};
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FOSS MEC",
  url: "https://foss.mec.ac.in",
};
const page = () => {
  const [marqueeTexts, setMarqueeTexts] = useState(null);

  useEffect(() => {
    const fetchMarqueeTexts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "marquee" && _id == "feae9369-5087-43a0-b41e-87cae7f4005e"][0]{
            texts 
        }`);

        setMarqueeTexts(data);
      } catch (error) {
        console.error("Error fetching marquee texts:", error);
      }
    };

    fetchMarqueeTexts();
  }, []); 

  return (
  <>
    <JsonLd data={organizationSchema} />
    <JsonLd data={websiteSchema} />

    <div className="flex flex-col font-dm-mono overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div>
        {/* <LenisWrapper> */}
        <div className="relative min-h-screen">
          <div className="fixed inset-0 z-0">
            <Image
              src={bg}
              alt="bg"
              fill
              className="object-cover max-h-screen z-[-1]"
            />
          </div>

          <Landing />
          <About />
          <Events />
          <Team />

          {marqueeTexts && marqueeTexts.texts.length > 0 && (
            <Marquee marqueeTexts={marqueeTexts.texts} />
          )}
        </div>
        {/* </LenisWrapper> */}
      </div>

      <Footer />
    </div>
  </>
);
};

export default page;
