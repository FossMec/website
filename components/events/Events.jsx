"use client";
import React, { useState, useEffect } from "react";
import { EventCard } from "./EventCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useMediaQuery from "@/hooks/use-media-query";
import { client } from "@/sanity/lib/client";

const Events = () => {
  const isMobile = useMediaQuery("(max-width: 920px)");
  const [cards, setCards] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const calculateContainerHeight = (cardCount) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return cardCount * 360 + 80;
    }

    const cardHeight = 320;
    const gap = 40;
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    const containerPadding = 20;
    const cardWidth = 400;

    const maxCardsPerRow = Math.max(
      1,
      Math.floor((viewportWidth - containerPadding * 2) / (cardWidth + gap))
    );
    const rows = Math.ceil(cardCount / maxCardsPerRow);

    const topMargin = 40;
    const bottomPadding = 60;

    return topMargin + rows * (cardHeight + gap) - gap + bottomPadding;
  };

  const calculateFallbackPosition = (index, totalCards) => {
    const cardWidth = 400;
    const cardHeight = 320;
    const gap = 40;

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : 768;
      const startX = Math.max(20, (viewportWidth - cardWidth) / 2);
      const topMargin = 40;
      return { x: startX, y: topMargin + index * (cardHeight + gap) };
    }

    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    const containerPadding = 20;

    const maxCardsPerRow = Math.max(
      1,
      Math.floor((viewportWidth - containerPadding * 2) / (cardWidth + gap))
    );

    const row = Math.floor(index / maxCardsPerRow);
    const col = index % maxCardsPerRow;

    const totalRowWidth =
      maxCardsPerRow * cardWidth + (maxCardsPerRow - 1) * gap;
    const startX = Math.max(
      containerPadding,
      (viewportWidth - totalRowWidth) / 2
    );

    const topMargin = 40;

    return {
      x: startX + col * (cardWidth + gap),
      y: topMargin + row * (cardHeight + gap),
    };
  };

  const getInitialPositions = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const topMargin = 40;
      const cardWidth = 400;
      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : 768;
      const startX = Math.max(20, (viewportWidth - cardWidth) / 2);

      return [
        { x: startX, y: topMargin },
        { x: startX, y: topMargin + 360 },
        { x: startX, y: topMargin + 700 },
        { x: startX, y: topMargin + 1040 },
        { x: startX, y: topMargin + 1380 },
        { x: startX, y: topMargin + 1720 },
        { x: startX, y: topMargin + 2060 },
      ];
    }

    const cardWidth = 400;
    const cardHeight = 320;
    const gap = 40;

    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    const containerPadding = 20;

    const maxCardsPerRow = Math.max(
      1,
      Math.floor((viewportWidth - containerPadding * 2) / (cardWidth + gap))
    );

    const totalRowWidth =
      maxCardsPerRow * cardWidth + (maxCardsPerRow - 1) * gap;
    const startX = Math.max(
      containerPadding,
      (viewportWidth - totalRowWidth) / 2
    );

    const topMargin = 40;

    const positions = [];
    for (let i = 0; i < 7; i++) {
      const row = Math.floor(i / maxCardsPerRow);
      const col = i % maxCardsPerRow;

      positions.push({
        x: startX + col * (cardWidth + gap),
        y: topMargin + row * (cardHeight + gap),
      });
    }

    return positions;
  };

  // Function to assign border colors based on index
  const getBorderColor = (index) => {
    const colors = [
      "border-yellow-500/60",
      "border-blue-500/60",
      "border-teal-500/60",
      "border-purple-500/60",
      "border-orange-500/60",
      "border-yellow-500/60",
      "border-blue-500/60",
    ];
    return colors[index % colors.length];
  };

  // Helper: given a filtered list, attach fresh positions
  const applyPositions = (filteredEvents) => {
    const positions = getInitialPositions();
    return filteredEvents.map((event, index) => ({
      ...event,
      borderColor: getBorderColor(index),
      position:
        positions[index] ||
        calculateFallbackPosition(index, filteredEvents.length),
    }));
  };

  // Fetch events from Sanity
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const data = await client.fetch(`
          *[_type == "event"] | order(defined(date) desc, date desc, _createdAt desc){
            _id,
            name,
            event_short_desc,
            year,
            date,
            date_label,
            "slug": slug.current,
            cover_image{
              asset->{
                url
              }
            }
          }
        `);

        if (data) {
          const mappedEvents = data.map((event) => ({
            id: event._id,
            title: event.name,
            borderColor: "", // assigned per filtered set
            position: { x: 0, y: 0 }, // placeholder
            image: event.cover_image.asset.url,
            backContent: event.event_short_desc,
            year: parseInt(event.year),
            date_label: event.date_label,
          }));

          const availableYears = [...new Set(mappedEvents.map((e) => e.year))].sort(
            (a, b) => b - a
          );
          const defaultYear = availableYears[0]; // most recent year in data
          const defaultYearEvents = mappedEvents.filter(
            (e) => e.year === defaultYear
          );

          setAllEvents(mappedEvents);
          setSelectedYear(defaultYear);
          setCards(applyPositions(defaultYearEvents));
          setIsInitialized(true);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to filter events by year and recalculate positions
  const filterEventsByYear = (year) => {
    const parsed = parseInt(year);
    setSelectedYear(parsed);
    const filtered = allEvents.filter((event) => event.year === parsed);
    setCards(applyPositions(filtered));
  };

  // Get unique years with labels from events
  const getYearOptions = () => {
    const yearMap = {};
    allEvents.forEach((event) => {
      if (!yearMap[event.year]) {
        yearMap[event.year] = event.date_label || `Events ${event.year}`;
      }
    });
    return Object.entries(yearMap)
      .sort(([a], [b]) => b - a)
      .map(([year, label]) => ({ year: Number(year), label }));
  };

  // Recalculate positions on window resize
  useEffect(() => {
    const handleResize = () => {
      setCards((prevCards) => applyPositions(prevCards));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clampPosition = (position) => {
    const cardWidth = 400;
    const cardHeight = 320;
    const doc =
      typeof document !== "undefined" ? document.documentElement : null;
    const pageWidth = doc
      ? Math.max(doc.scrollWidth, doc.clientWidth)
      : 1200;
    const pageHeight = doc
      ? Math.max(doc.scrollHeight, doc.clientHeight)
      : 2000;

    return {
      x: Math.max(0, Math.min(position.x, pageWidth - cardWidth - 20)),
      y: Math.max(0, Math.min(position.y, pageHeight - cardHeight - 20)),
    };
  };

  const handleDragEnd = (id, newPosition) => {
    const clampedPosition = clampPosition(newPosition);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, position: clampedPosition } : card
      )
    );
  };

  return (
    <div className="min-h-screen relative flex flex-col" id="events">
      <div className="w-full relative z-10 flex flex-col h-full py-8">
        <h2 className="text-3xl md:text-4xl font-semibold italic uppercase text-center px-2 mt-25 mb-6 font-uncut-sans tracking-tight leading-none bg-gradient-to-r from-[#C0AE42] via-[#379CA2] to-[#2C7FDC] bg-clip-text text-transparent">
          &lt;WHAT ABOUT EVENTS?&gt;
        </h2>

        {!loading && allEvents.length > 0 && (
          <div className="mb-8 w-fit mx-auto max-md:scale-90">
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => filterEventsByYear(e.target.value)}
                className="bg-transparent border-2 border-[#DAE2E9E0]/12 rounded-xs px-4 py-2 pr-12 text-[#DAE2E9E0] focus:outline-none transition-colors cursor-pointer appearance-none w-full"
              >
                {getYearOptions().map(({ year, label }) => (
                  <option
                    key={year}
                    value={year.toString()}
                    className="bg-[#1a1a1a] text-[#DAE2E9E0]"
                  >
                    {label}
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-[19px] h-[19px] text-[#DAE2E9E0]/70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        <p className="text-white lg:text-[23px] sm:text-xl leading-relaxed font-mono text-center mx-auto mb-8 max-w-[1000px] mt-10 px-[20px]">
          Our events focus on FOSS, featuring expert talks, practical workshops,
          and collaborative spaces for students and tech enthusiasts.
        </p>

        <div className="relative mt-8 overflow-visible">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                <p className="text-white font-dm-mono text-lg">
                  Loading events...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-red-400 font-dm-mono text-lg mb-4">
                  Error loading events
                </p>
                <p className="text-white/70 font-dm-mono text-sm">{error}</p>
              </div>
            </div>
          ) : cards.length === 0 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-white/70 font-dm-mono text-lg">
                  No events found for {selectedYear}
                </p>
              </div>
            </div>
          ) : (
            <>
              {isMobile ? (
                <div className="px-2">
                  <Carousel className="w-full max-w-[480px] mx-auto max-sm:max-w-[360px]">
                    <CarouselContent>
                      {cards.map((card) => (
                        <CarouselItem key={card.id} className="w-full">
                          <div className="p-1 flex items-center justify-center h-[320px]">
                            <EventCard
                              id={card.id}
                              title={card.title}
                              borderColor={card.borderColor}
                              position={{ x: 0, y: 0 }}
                              onDragEnd={null}
                              image={card.image}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-8">
                      <CarouselPrevious className="static mx-2 transform-none" />
                      <CarouselNext className="static mx-2 transform-none" />
                    </div>
                  </Carousel>
                </div>
              ) : (
                <div
                  className="relative px-4"
                  style={{
                    minHeight:
                      cards.length > 0
                        ? `${calculateContainerHeight(cards.length)}px`
                        : "800px",
                  }}
                >
                  {cards.map((card, index) => (
                    <EventCard
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      borderColor={card.borderColor}
                      position={card.position}
                      onDragEnd={handleDragEnd}
                      image={card.image}
                      backContent={card.backContent}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;