"use client";
import { CONSUMET_URL } from "@/config";
import { Button } from "@nextui-org/react";
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

  const getTrendinganime = async (path: string) => {
    try {
      setbtnLoading(true);
      const response = await axios.get<{ results: Anime[] }>(
        CONSUMET_URL + path + "?limit=80"
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

  return (
    <div className="min-h-screen mt-32 bg-[#1A1F2B] text-[#FFFFFF]">
      {loading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div>
          <div className="flex bg-[#292e3b] sm:ml-[85px] ml-2 mr-2 sm:mr-[85px] rounded-xl py-3 px-4 shadow-lg justify-between space-x-6">
            <Button
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ease-in-out rounded-lg text-center border border-transparent hover:border-[#FF4D4D] ${
                activeButton === "/top-airing"
                  ? "bg-[#FF4D4D] text-[#FFFFFF] shadow-2xl transform scale-105 hover:scale-110"
                  : "bg-[#292e3b] text-[#FFFFFF] hover:text-[#1A1F2B] hover:bg-[#FF4D4D] hover:scale-105"
              }`}
              radius="sm"
              onPress={() => getTrendinganime("/top-airing")}
            >
              Top Airing
            </Button>

            <Button
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ease-in-out rounded-lg text-center border border-transparent hover:border-[#FF4D4D] ${
                activeButton === "/popular"
                  ? "bg-[#FF4D4D] text-[#FFFFFF] shadow-2xl transform scale-105 hover:scale-110"
                  : "bg-[#292e3b] text-[#FFFFFF] hover:text-[#1A1F2B] hover:bg-[#FF4D4D] hover:scale-105"
              }`}
              radius="sm"
              onPress={() => getTrendinganime("/popular")}
            >
              Popular
            </Button>

            <Button
              className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ease-in-out rounded-lg text-center border border-transparent hover:border-[#FF4D4D] ${
                activeButton === "/recent-episodes"
                  ? "bg-[#FF4D4D] text-[#FFFFFF] shadow-2xl transform scale-105 hover:scale-110"
                  : "bg-[#292e3b] text-[#FFFFFF] hover:text-[#1A1F2B] hover:bg-[#FF4D4D] hover:scale-105"
              }`}
              radius="sm"
              onPress={() => getTrendinganime("/recent-episodes")}
            >
              Recent
            </Button>
          </div>

          {btnLoading ? (
            <div className="flex justify-center mt-10">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="sm:ml-[80px] ml-4 mr-4 sm:mr-[80px] mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {topanime.map((anime) => (
                  <Link href={`/animeinfo/${anime.id}`} key={anime.id}>
                    <div className="relative bg-[#292e3b] rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 overflow-hidden">
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-[#292e3b] to-transparent p-4">
                        <h3 className="text-lg font-extrabold text-[#FFFFFF] truncate">
                          {anime.title.length > 40
                            ? anime.title.slice(0, 40) + "..."
                            : anime.title}
                        </h3>
                        <p className="text-sm text-[#FFFFFF] mt-1">
                          {activeButton === "/popular" ? null : "Episode "}
                          {anime.episodeNumber}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex justify-center items-center text-[#FFFFFF] text-lg font-bold transition-opacity duration-300">
                        View Details
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
