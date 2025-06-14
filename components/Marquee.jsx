import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
  return (
    <div className='font-martian-mono font-medium sticky bottom-0 w-full [background:linear-gradient(to_right,_#C0AE42_0%,_#379CA2_54%,_#2C7FDC_100%)] h-12 items-center justify-center flex z-80'>
      <Marquee autoFill={true}>
        <h1 className="text-md font-medium font-mono italic text-our-bg">🆓 OPEN SOURCE SUMMIT 2025 ANNOUNCED | 🚀 INDIA FOSS TICKETS OPEN |{" "}</h1>
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;