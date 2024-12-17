"use client";
import { CONSUMET_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

type paramsType = Promise<{ id: string; episodes: string }>;

const WatchEpisode = ({ params }: { params: paramsType }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{
    id: string;
    episodes: string;
  } | null>(null);
  const [episodeData, setEpisodeData] = useState<any>(null);

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
          const response = await axios.get(
            `${CONSUMET_URL}/servers/${id}-episode-${episodes}`
          );
          setEpisodeData(response.data);
        } catch (error) {
          console.error("Failed to fetch episode data:", error);
        }
      };

      getEpisode();
    }
  }, [unwrappedParams]);

  if (!unwrappedParams) {
    return <p>Loading...</p>;
  }

  if (episodeData) {
    window.location.href = episodeData[0]?.url;
  }

  return (
    <div className=" bg-black mt-32">
      {episodeData ? (
        <div className=" flex justify-center mt-64">
          <p className=" animate-pulse">Redirecting to episode...</p>
        </div>
      ) : (
        <div className=" flex justify-center mt-52">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default WatchEpisode;
