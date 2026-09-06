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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://foss.mec.ac.in"
  ),

  title: "FOSS MEC | Free and Open Source Software Community at MEC",

  description:
    "FOSS MEC is a non-profit foundation dedicated to promoting and strengthening the Free and Open Source Software (FOSS) ecosystem within the MEC community.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "FOSS MEC | Free and Open Source Software Community at MEC",
    description:
      "FOSS MEC is a non-profit foundation dedicated to promoting and strengthening the Free and Open Source Software ecosystem within the MEC community.",
    url: "/",
    siteName: "FOSS MEC",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FOSS MEC - Free and Open Source Software Community at MEC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@FossMec",
    creator: "@FossMec",
    images: ["/og-image.png"],
  },

  keywords: [
    "FOSS MEC",
    "Model Engineering College",
    "MEC Kochi",
    "open source community",
    "hackathons",
    "workshops",
    "student developers",
    "Kerala tech community",
  ],

  robots: {
    index: true,
    follow: true,
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
