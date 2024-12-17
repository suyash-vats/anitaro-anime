"use client";
import { CONSUMET_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const WatchEpisode = ({
  params,
}: {
  params: { id: string; episodes: string };
}) => {
  const [episodeData, setEpisodeData] = useState<any>(null);

  useEffect(() => {
    const { id, episodes } = params;
    const getEpisode = async () => {
      try {
        const response = await axios.get(
          `${CONSUMET_URL}/servers/${id}-episode-${episodes}`
        );
        setEpisodeData(response.data);
      } catch (error) {
        console.error("Failed to fetch episode data:", error);
      }
    };

    getEpisode();
  }, [params]);

  if (!episodeData) {
    return (
      <div className="flex justify-center mt-52">
        <Spinner size="lg" />
      </div>
    );
  }

  if (episodeData) {
    window.location.href = episodeData[0]?.url;
  }

  return (
    <div className="bg-black mt-32">
      <div className="flex justify-center mt-64">
        <p className="animate-pulse">Redirecting to episode...</p>
      </div>
    </div>
  );
};

export default WatchEpisode;
