"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavbarContainer } from "./navbar";

const images = [
  {
    src: "/aot.jpg",
    alt: "Attack on Titan",
    link: "/animeinfo/shingeki-no-kyojin",
    year: 2013,
    name: "Attack on Titan",
  },
  {
    src: "/dandadan.webp",
    alt: "Dandadan",
    link: "/animeinfo/dandadan",
    year: 2024,
    name: "Dandadan",
  },
  {
    src: "/saiki2.jpg",
    alt: "Saiki Kusuo",
    link: "/animeinfo/saiki-kusuo-no-ps-nan",
    year: 2016,
    name: "The Disastrous Life of Saiki K.",
  },
  {
    src: "/onepiece.jpeg",
    alt: "One Piece",
    link: "/animeinfo/one-piece",
    year: 1999,
    name: "One Piece",
  },
  {
    src: "/naruto.jpg",
    alt: "Naruto",
    link: "/animeinfo/naruto",
    year: 2002,
    name: "Naruto",
  },
  {
    src: "/ds.png",
    alt: "Demon Slayer",
    link: "/animeinfo/kimetsu-no-yaiba",
    year: 2019,
    name: "Demon Slayer",
  },
];

export default function HomepageModal() {
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setCurrImageIndex((prev) => (prev + 1) % images.length);
      } else if (event.key === "ArrowLeft") {
        setCurrImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <NavbarContainer />
      <div className="pt-12 relative">
        <div className="flex justify-center">
          <div
            className="relative sm:w-[1350px] w-[340px] h-[470px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={images[currImageIndex].src}
              alt={images[currImageIndex].alt}
              fill
              className="rounded-xl sm:object-cover sm:object-center"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-8 left-8 z-10">
              <p className="text-white mb-1">{images[currImageIndex].year}</p>
              <p className="font-bold text-md sm:text-4xl text-white mb-3">
                {images[currImageIndex].name}
              </p>
              <Link
                href={images[currImageIndex].link}
                className="inline-block hover:bg-gray-300 active:scale-105 transition-all duration-300 font-semibold px-3 sm:px-4 rounded-md py-2 bg-white text-black"
              >
                Go To Show
              </Link>
            </div>

            <Link
              href={images[currImageIndex].link}
              className="absolute inset-0 rounded-xl"
              aria-label={`View ${images[currImageIndex].name}`}
            />

            {/* Left Arrow */}
            <div
              className="absolute left-[-50px] top-0 bottom-0 flex items-center justify-center cursor-pointer z-20 transition-all duration-300 bg-gradient-to-r from-transparent to-black/40 hover:from-black/20 hover:to-black/80"
              onClick={() => setCurrImageIndex((prev) => (prev - 1 + images.length) % images.length)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-12 h-12 transition-transform duration-300 hover:scale-125"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>

            {/* Right Arrow */}
            <div
              className="absolute right-[-50px] top-0 bottom-0 flex items-center justify-center cursor-pointer z-20 transition-all duration-300 bg-gradient-to-l from-transparent to-black/40 hover:from-black/20 hover:to-black/80"
              onClick={() => setCurrImageIndex((prev) => (prev + 1) % images.length)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-12 h-12 transition-transform duration-300 hover:scale-125"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
