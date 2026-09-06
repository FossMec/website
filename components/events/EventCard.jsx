"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { HiCursorClick } from "react-icons/hi";
import Image from "next/image";

const useDraggable = (initialPosition, onPositionChange) => {
  const [position, setPosition] = React.useState(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const [hasMoved, setHasMoved] = React.useState(false);
  const hasMovedRef = useRef(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = React.useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!elementRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const startPos = { x: clientX, y: clientY };
    setStartPosition(startPos);
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
    setIsDragging(true);
    setHasMoved(false);
    hasMovedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const moveDistance = Math.sqrt(
      Math.pow(clientX - startPosition.x, 2) +
        Math.pow(clientY - startPosition.y, 2)
    );

    if (moveDistance > 5) {
      hasMovedRef.current = true;
      setHasMoved(true);
    }

    const newPosition = {
      x: clientX - dragOffset.x,
      y: clientY - dragOffset.y,
    };

    setPosition(newPosition);
    if (onPositionChange) {
      onPositionChange(newPosition);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (onPositionChange) {
        onPositionChange(position);
      }
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, position, startPosition]);

  return {
    elementRef,
    position,
    handleMouseDown,
    isDragging,
    hasMoved,
    hasMovedRef,
  };
};

export const EventCard = ({
  title,
  borderColor,
  id,
  position,
  onDragEnd,
  image,
  onCardClick,
  backContent,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  const handlePositionChange = (newPosition) => {
    if (onDragEnd) {
      onDragEnd(id, newPosition);
    }
  };

  const {
    elementRef,
    position: currentPosition,
    handleMouseDown,
    isDragging,
    hasMoved,
  } = useDraggable(position || { x: 0, y: 0 }, handlePositionChange);

  const isInCarousel = !onDragEnd || position === undefined;

  const handleCardClick = (e) => {
  //If the card was dragged/moved, prevent navigating
    if (!isInCarousel && (hasMoved || hasMovedRef.current)) {
      e.preventDefault();
      return;
    } 
    if (onCardClick) {
      onCardClick(id);
    }
  };

  const onMouseDownWrapper = (e) => {
    setHasInteracted(true);
    if (!isInCarousel) handleMouseDown(e);
  };

  return (
    <div
      ref={elementRef}
      className={`relative ${
        isInCarousel ? "w-full h-full" : ""
      }`}
      onMouseDown={!isInCarousel ? onMouseDownWrapper : undefined}
      onTouchStart={!isInCarousel ? onMouseDownWrapper : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        isInCarousel
          ? {}
          : {
              position: "absolute",
              left: currentPosition.x,
              top: currentPosition.y,
              width: "400px",
              height: "320px",
              zIndex: isDragging ? 1000 : 1,
              transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: isDragging
                ? "grabbing"
                : isHovered
                ? "pointer"
                : hasInteracted
                ? "grab"
                : "pointer",
            }
      }
    >
      <Link 
        href={`/events/${id}`} 
        onClick={handleCardClick} 
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className="block w-full h-full">
      <div className="w-full h-full flex flex-col justify-between pt-6 px-6 pb-3.5 group items-center transition-all duration-[0.75s] border border-white/10 hover:border-[#ACAB4F]/38 relative before:absolute before:min-h-[10px] before:min-w-[10px] before:transition-all before:duration-[0.75s] before:border-white/10 hover:before:border-[#ACAB4F] after:transition-all after:duration-[0.75s] after:border-white/10 hover:after:border-[#ACAB4F] before:border-t-[3px] before:border-l-[3px] before:top-[-2px] before:left-[-2px] after:absolute after:h-[10px] after:w-[10px] after:border-t-[3px] after:border-r-[3px] after:top-[-2px] after:right-[-2px] backdrop-blur-[1px] bg-[#121f38]">
        <div className="absolute h-full w-full before:absolute before:min-h-[10px] z-20 top-0 before:min-w-[10px] before:transition-all before:duration-[0.75s] before:border-white/10 group-hover:before:border-[#ACAB4F] after:transition-all after:duration-[0.75s] after:border-white/10 hover:after:border-[#ACAB4F] before:border-b-[3px] before:border-l-[3px] before:bottom-[-2px] before:left-[-2px] after:absolute after:h-[10px] after:w-[10px] after:border-b-[3px] after:border-r-[3px] after:bottom-[-2px] after:right-[-2px]" />
        <div className="h-[75%] w-full relative">
          <Image
            src={image}
            alt={`${title} - FOSS MEC Event`}
            className="w-full h-full object-cover"
            draggable="false"
            width={400}
            height={320}
          />
        </div>
        <div className="relative w-full flex justify-between items-center mt-4">
          <h3 className="font-uncut-sans font-medium text-[18px] leading-[20px] tracking-[0px] text-white/80">
            {title}
          </h3>
          <div className="text-white/80 hover:text-white transition-colors p-2 bg-white/6 rounded-md !cursor-pointer">
            <HiCursorClick size={20} />
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
};
