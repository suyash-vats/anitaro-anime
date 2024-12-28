"use client";

import { CONSUMET_URL } from "@/config";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "@nextui-org/react";
import { NavbarContainer } from "@/components/navbar";
import { Player } from "@/components/Player";
import EpisodeContainer from "@/components/episodecontainer2";

// Define types for API responses
interface Episode {
  title: string;
  description: string;
  episodeNumber: string;
  url: string;
  server: string;
}

interface AnimeData {
  title: string;
  description: string;
  image: string;
  // Add other fields as needed
}

type paramsType = Promise<{ id: string; episodes: string }>;

const WatchEpisode = ({ params }: { params: paramsType }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{
    id: string;
    episodes: string;
  } | null>(null);
  const [episodeData, setEpisodeData] = useState<Episode | null>(null);
  const [animeData, setAnimeData] = useState<AnimeData | null>(null);
  const [previousEpisode, setPreviousEpisode] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (unwrappedParams) {
      const { id, episodes } = unwrappedParams;

      const getEpisode = async () => {
        try {
          const response = await axios.get<Episode[]>(
            `${CONSUMET_URL}/servers/${id}-episode-${episodes}`
          );
          const newEpisode = response.data[0];
          setPreviousEpisode(episodeData?.episodeNumber || null);
          setEpisodeData(newEpisode);
        } catch (error) {
          console.error("Failed to fetch episode data:", error);
        }
      };

      const getAnimeData = async () => {
        try {
          const response = await axios.get<AnimeData>(
            `${CONSUMET_URL}/info/${id}`
          );
          setAnimeData(response.data);
        } catch (error) {
          console.error("Failed to fetch anime data:", error);
        }
      };

      getEpisode();
      getAnimeData();
    }
  }, [unwrappedParams, episodeData]);

  if (!unwrappedParams || !animeData) {
    return (
      <div className="flex justify-center mt-52">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <NavbarContainer />
      <div className="mt-20 px-4 flex flex-col items-center space-y-8">
        {/* Anime Title */}
        <h1 className="text-4xl font-bold text-white text-center">
          {animeData.title}
        </h1>

        <div className="w-full max-w-7xl flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Anime Poster and Description */}
          <div className="flex flex-col lg:w-1/3 space-y-6">
            {/* Anime Poster */}
            <div className="w-100vh h-auto">
              <img
                className="object-cover rounded-lg shadow-lg"
                src={animeData.image}
                alt={animeData.title || "Anime cover"}
                width={256}
                height={384}
              />
            </div>

            {/* Anime Description */}
            <div className="bg-white p-6 rounded-lg " style={{ backgroundColor: "var(--bg-300)" }}>
              <h2 className="text-2xl font-semibold text-white">Description</h2>
              <p className="text-lg text-gray-600 mt-4">
                {showFullDescription || animeData.description.length <= 300
                  ? animeData.description
                  : `${animeData.description.slice(0, 300)}...`}
              </p>
              {animeData.description.length > 300 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-500 mt-2"
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>

          {/* Episode Player */}
          {episodeData ? (
            <div className="flex-grow mt-[110vh] lg:mt-[120px]">
              <Player
                dataUrl={episodeData.url}
                serverName={episodeData.server}
                iframeRef={iframeRef}
                frameStyle="border-none w-full h-96 lg:h-[66vh]"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {episodeData.title}
                </h3>
                <p className="text-gray-600 mt-2">{episodeData.description}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-52">
              <Spinner size="lg" />
            </div>
          )}
        </div>

        {/* Episode Navigation */}
        <div className="w-full max-w-7xl mt-12">
          <EpisodeContainer
            anidata={animeData}
            currentEpisode={episodeData?.episodeNumber}
            previousEpisode={previousEpisode}
          />
        </div>
      </div>
    </div>
  );
};

export default WatchEpisode;
