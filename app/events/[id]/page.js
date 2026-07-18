"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import bg from "@/assets/bg.svg";
import EventGalleryMarquee from "@/components/events/EventGalleryMarquee";
import { client } from "@/sanity/lib/client";

const EventDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get gallery images from event data
  const getGalleryImages = () => {
    if (
      !event ||
      !event.gallery_images ||
      !Array.isArray(event.gallery_images)
    ) {
      return [];
    }

    // Filter out empty or invalid image paths
    return event.gallery_images
      .map((img) => img.asset.url)
      .filter((img) => img && typeof img === "string" && img.trim() !== "");
  };

  // Fetch event data from Supabase
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

        const data = await client.fetch(`
        *[_type == "event" && _id == "${eventId}"][0]{
            _id,
            name,
            event_oneline,
            event_short_desc,
            event_content,
            event_venue,
            year,
            date_label,
            cover_image{
              asset->{
                url
              }
            },
            gallery_images[]{
              _key,
              asset->{
                url
              }
            }
          }
`);

        if (error) {
          throw error;
        }

        if (data) {
          setEvent(data);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleBackToEvents = () => {
    router.push("/#events");
    setTimeout(() => {
      const eventsSection = document.getElementById("events");
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-our-bg">
        <div className="text-white font-martian-mono">Loading event...</div>
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-our-bg">
        <div className="text-white font-martian-mono">Event not found</div>
      </div>
    );
  }

  const galleryImages = getGalleryImages();
  const hasGalleryImages = galleryImages.length > 0;

  return (
    <div className="flex flex-col font-dm-mono overflow-x-hidden min-h-screen">
      {/* Fixed background */}
      <div className="fixed inset-0 z-0">
        <Image src={bg} alt="bg" fill className="object-cover" />
      </div>

      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          selectedEvent={event}
          onEventTitleClick={handleBackToEvents}
          isEventPage={true}
        />
      </div>

      {/* Main Event Content */}
      <div className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToEvents}
            className="flex items-center cursor-pointer gap-2 text-white/70 hover:text-white transition-all duration-200 group mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-martian-mono text-sm sm:text-base">Back</span>
          </button>

          {/* Hero Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            {/* Event Title */}
            <h1 className="font-martian-mono font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-4 sm:mb-6 uppercase">
              {event.name}
            </h1>

            {/* Subtitle */}
            {event.event_oneline && (
              <p className="font-martian-mono text-base sm:text-lg md:text-xl text-[#ABA9A7] max-w-5xl leading-relaxed">
                {event.event_oneline}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 mt-6 sm:mt-8">
              {(event.year || event.date_label) && (
                <div className="flex items-center gap-2 text-[#ABA9A7]">
                  <Calendar className="w-4.01 h-4 text-[#FFD022]" />
                  <span className="font-martian-mono text-sm sm:text-base">
                    {event.date_label || event.year}
                  </span>
                </div>
              )}
              {event.event_venue && (
                <div className="flex items-center gap-2 text-[#ABA9A7]">
                  <MapPin className="w-4.01 h-4.5 text-[#FFD022]" />
                  <span className="font-martian-mono text-sm sm:text-base">
                    {event.event_venue}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Cover Image Section */}
          {event.cover_image && (
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div
                className="relative w-full aspect-video sm:aspect-[16/9] overflow-hidden
                            border border-white/10 bg-white/5 backdrop-blur-sm
                            before:absolute before:h-3 before:w-3 sm:before:h-4 sm:before:w-4 before:border-[#FFD022] before:border-t-2 before:border-l-2 before:top-0 before:left-0 z-10
                            after:absolute after:h-3 after:w-3 sm:after:h-4 sm:after:w-4 after:border-[#FFD022] after:border-t-2 after:border-r-2 after:top-0 after:right-0 z-10
                            group py-1.5 px-1"
              >
                {/* Bottom corners */}
                <div className="absolute bottom-0 left-0 h-3 w-3 sm:h-4 sm:w-4 border-[#FFD022] border-b-2 border-l-2 z-10" />
                <div className="absolute bottom-0 right-0 h-3 w-3 sm:h-4 sm:w-4 border-[#FFD022] border-b-2 border-r-2 z-10" />

                {/* Image */}
                <div className="relative w-full h-full p-1 sm:p-2">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={event.cover_image.asset.url}
                      alt={event.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16 md:mb-20">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-10 md:space-y-12">
              {/* Overview Section */}
              {event.event_short_desc && (
                <section>
                  <h2 className="font-martian-mono text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-4 sm:mb-6">
                    Overview
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="font-martian-mono text-sm sm:text-base md:text-lg text-[#ABA9A7] leading-relaxed">
                      {event.event_short_desc}
                    </p>
                  </div>
                </section>
              )}

              {/* Event Content Section */}
              {event.event_content && (
                <section>
                  <div className="prose prose-invert max-w-none">
                    <p className="font-martian-mono text-sm sm:text-base md:text-lg text-[#ABA9A7] leading-relaxed whitespace-pre-line">
                      {event.event_content}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6 sm:space-y-8">
                {/* Event Details Card */}
                <div
                  className="border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-6
                              before:absolute before:h-3 before:w-3 sm:before:h-4 sm:before:w-4 before:border-[#FFD022] before:border-t-2 before:border-l-2 before:top-0 before:left-0
                              after:absolute after:h-3 after:w-3 sm:after:h-4 sm:after:w-4 after:border-[#FFD022] after:border-t-2 after:border-r-2 after:top-0 after:right-0
                              relative"
                >
                  {/* Bottom corners */}
                  <div className="absolute bottom-0 left-0 h-3 w-3 sm:h-4 sm:w-4 border-[#FFD022] border-b-2 border-l-2" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 sm:h-4 sm:w-4 border-[#FFD022] border-b-2 border-r-2" />

                  <h3 className="font-martian-mono text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                    Event Details
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {(event.year || event.date_label) && (
                      <div>
                        <span className="font-martian-mono text-xs sm:text-sm text-[#ABA9A7] uppercase tracking-wider">
                          {event.date_label ? "Date" : "Year"}
                        </span>
                        <p className="font-martian-mono text-sm sm:text-base text-white mt-1">
                          {event.date_label || event.year}
                        </p>
                      </div>
                    )}
                    {event.event_venue && (
                      <div>
                        <span className="font-martian-mono text-xs sm:text-sm text-[#ABA9A7] uppercase tracking-wider">
                          Venue
                        </span>
                        <p className="font-martian-mono text-sm sm:text-base text-white mt-1">
                          {event.event_venue}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          {hasGalleryImages && (
            <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
              <div className="relative w-full">
                <EventGalleryMarquee images={galleryImages} />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
