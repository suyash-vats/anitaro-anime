"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const images = [
  {
    src: "/berserk.jpg",
    alt: "Berserk",
    link: "/mangainfo/801513ba-a712-498c-8f57-cae55b38cc92",
    year: 1989,
    name: "Berserk",
  },
  {
    src: "/vagabond.png",
    alt: "vagabond",
    link: "/mangainfo/d1a9fdeb-f713-407f-960c-8326b586e6fd",
    year: 1999,
    name: "Vagabond",
  },
  {
    src: "/mob.jpeg",
    alt: "Mob Psycho 100",
    link: "/mangainfo/736a2bf0-f875-4b52-a7b4-e8c40505b68a",
    year: 2012,
    name: "Mob Psycho 100",
  },
  {
    src: "/dorohedoro.jpeg",
    alt: "Dorohedoro",
    link: "/mangainfo/34f45c13-2b78-4900-8af2-d0bb551101f4",
    year: 2000,
    name: "Dorohedoro",
  },
  {
    src: "/opm.jpeg",
    alt: "One Punch Man",
    link: "/mangainfo/d8a959f7-648e-4c8d-8f23-f1f3f8e129f3",
    year: 2012,
    name: "One Punch Man",
  },
];

export default function MangaHomepageModal() {
  const [currImageIndex, setCurrImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" pt-[104px] font-mono pb-[72px] relative">
      <div className="flex justify-center">
        <div className="relative sm:w-[1350px] w-[340px] h-[470px]">
          <Image
            loading="lazy"
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
              Read
            </Link>
          </div>

          <Link
            href={images[currImageIndex].link}
            className="absolute inset-0 rounded-xl"
            aria-label={`View ${images[currImageIndex].name}`}
          />
        </div>
      </div>
    </div>
  );
}
