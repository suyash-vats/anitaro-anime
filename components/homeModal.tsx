"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-28  relative">
      <div className="flex justify-center ">
        <Link href={images[currImageIndex].link} passHref>
          <div className="relative sm:w-[1350px] w-[340px]  h-[470px]">
            <Image
              src={images[currImageIndex].src}
              alt={images[currImageIndex].alt}
              fill
              className="rounded-xl sm:object-cover sm:object-center"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>
          </div>
        </Link>
      </div>
      <div className=" translate-x-14  sm:translate-x-28 -translate-y-32">
        <p className=" ">{images[currImageIndex].year}</p>
        <p className=" font-bold text-md sm:text-4xl">
          {images[currImageIndex].name}
        </p>
        <div>
          <Link href={images[currImageIndex].link}>
            <button className=" hover:bg-gray-300 active:scale-105 transition-all duration-300 font-semibold px-3 sm:px-4 mt-3 rounded-md py-2 bg-white text-black">
              Go To Show
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
