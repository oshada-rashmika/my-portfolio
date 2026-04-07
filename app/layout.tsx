import type { Metadata, Viewport } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer"; 
import PetCompanion from "./PetCompanion"; 
import FaviconAnimator from "@/components/FaviconAnimator";
import EasterEggs from "@/components/EasterEggs";

const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani"
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Oshada Rashmika | Portfolio",
  description: "Oshada Rashmika's interactive gamified portfolio website. Explore achievements, certifications, and more about Oshada Rashmika.",
  keywords: [
    "Oshada Rashmika",
    "portfolio",
    "web developer",
    "achievements",
    "certifications",
    "gamified portfolio"
  ],
  openGraph: {
    title: "Oshada Rashmika | Portfolio",
    description: "Oshada Rashmika's interactive gamified portfolio website. Explore achievements, certifications, and more about Oshada Rashmika.",
    url: "https://yourdomain.com/",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oshada Rashmika Portfolio Open Graph Image"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Oshada Rashmika | Portfolio",
    description: "Oshada Rashmika's interactive gamified portfolio website. Explore achievements, certifications, and more about Oshada Rashmika.",
    images: ["/assets/og-image.jpg"]
  },
  metadataBase: new URL("https://yourdomain.com/"),
  alternates: {
    canonical: "/"
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Oshada Rashmika',
              url: 'https://yourdomain.com/',
              sameAs: [
                'https://www.linkedin.com/in/oshadarashmika',
                'https://github.com/oshadarashmika'
              ],
              jobTitle: 'Web Developer',
              description: "Oshada Rashmika's interactive gamified portfolio website. Explore achievements, certifications, and more about Oshada Rashmika."
            })
          }}
        />
      </head>
      <body className={`${rajdhani.variable} font-sans bg-black text-white antialiased overflow-x-hidden`}>
        <FaviconAnimator />
        <AudioPlayer />
        <PetCompanion />
        <EasterEggs />
        {children}
      </body>
    </html>
  )
}