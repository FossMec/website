import "./globals.css";
import { Geist, Geist_Mono, Gamja_Flower } from "next/font/google";
import localFont from 'next/font/local';

const offbit = localFont({
  src: '../assets/fonts/OffBit-Bold.ttf',
  variable: '--font-offbit',
});

const uncutSansVar = localFont({
  src: [
    {
      path: '../assets/fonts/UncutSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/UncutSans-Variable.ttf',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-uncutSans',
});

const dmMono = localFont({
  src: '../assets/fonts/DMMono-Regular.ttf',
  variable: '--font-dmMono',
});

const martianMono = localFont({
  src: '../assets/fonts/MartianMono-Variable.ttf',
  variable: '--font-martianMono',
});

const redditMono = localFont({
  src: "../assets/fonts/RedditMono-VariableFont_wght.ttf",
  variable: "--font-redditMono",
});

const gamja = Gamja_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gamja",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FOSS MEC | Free and Open Source Software Community at MEC",
  description: "FOSS MEC is a non-profit foundation dedicated to promoting and strengthening the Free and Open Source Software (FOSS) ecosystem within the MEC community.",
  verification: {
    google: "vLpk3rwkMnlTYm9aCkRg0uzjFJgtqE3LCQmkv0ohx7k",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${offbit.variable} ${geistMono.variable} ${gamja.variable} ${uncutSansVar.variable} ${martianMono.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
