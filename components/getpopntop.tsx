"use client";

import { CONSUMET_URL } from "@/config";
import { Button, Image } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

import Link from "next/link";

interface Anime {
  id: string;
  title: string;
  image: string;
  episodeNumber: number;
}

export const HomePageAnimes = () => {
  const [topanime, setTopanime] = useState<Anime[]>([]);
  const [activeButton, setActiveBtn] = useState("/top-airing");
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoading, setbtnLoading] = useState<boolean>(false);
  const [animeId, setAnimeid] = useState("");

  const getTrendinganime = async (path: string) => {
    try {
      setbtnLoading(true);
      const response = await axios.get<{ results: Anime[] }>(
        CONSUMET_URL + path
      );
      setTopanime(response.data.results);
      setActiveBtn(path);
    } catch (e) {
      console.log(e);
    } finally {
      setbtnLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getTrendinganime("/top-airing");
    setLoading(false);
  }, []);
  console.log(animeId);

  return (
    <div className=" min-h-screen  -translate-y-14 bg-[#0a0a0a]">
      {loading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div>
          <div className="flex  bg-[#3f3f46] ml-10 mr-5 rounded-xl py-1 px-1">
            <Button
              className={`py-2 px-44 ${
                activeButton === "/top-airing"
                  ? "bg-black "
                  : "bg-[#3f3f46]  text-[#94949d] "
              }`}
              radius="sm"
              onPress={() => getTrendinganime("/top-airing")}
            >
              Top Airing
            </Button>

            <Button
              className={`py-2 px-44 ${
                activeButton === "/popular"
                  ? "bg-black"
                  : "bg-[#3f3f46]  text-[#94949d]"
              }`}
              radius="sm"
              onPress={() => getTrendinganime("/popular")}
            >
              Popular
            </Button>

            <Button
              className={`py-2 px-44 ${
                activeButton === "/recent-episodes"
                  ? "bg-black"
                  : "bg-[#3f3f46]  text-[#94949d]"
              }`}
              radius="sm"
              onPress={() => getTrendinganime("/recent-episodes")}
            >
              Recent
            </Button>
          </div>
          {btnLoading ? (
            <div className=" flex justify-center mt-10">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className=" ml-5 mr-5 mt-16  grid gap-x-2 gap-y-4 grid-cols-3">
              {topanime.map((anime) => (
                <div className=" flex  col-span-1 " key={anime.id}>
                  <Link href={`/animeinfo/${anime.id}`}>
                    <div>
                      <Image
                        // isBlurred={true}
                        onClick={() => {
                          setAnimeid(anime.id);
                        }}
                        className=" hover:cursor-pointer mb-2 border border-[#3f3f46] object-cover"
                        loading="lazy"
                        width={400}
                        height={240}
                        radius="sm"
                        alt="anime images"
                        src={anime.image}
                      />
                      <div className="mt-2">
                        {anime.title.length > 60
                          ? anime.title.slice(0, 17) + "..."
                          : anime.title}
                      </div>
                      <div className=" text-gray-400">
                        {activeButton === "/popular" ? null : "Episode "}
                        {anime.episodeNumber}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
