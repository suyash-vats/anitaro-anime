"use client";

import EpisodeContainer from "@/components/episodecontainer";
import { NavbarContainer } from "@/components/navbar";
import { CONSUMET_URL } from "@/config";
import { Button, Image, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState, use } from "react";

export default function AnimeInfo({ params }: any) {
  const resolvedParams: any = use(params);
  const animeid = resolvedParams.animeid;
  const [anidata, setAnindata] = useState<any>(null);

  const getAllaboutthatanime = async () => {
    try {
      const response = await axios.get(`${CONSUMET_URL}/info/${animeid}`);
      setAnindata(response.data);
    } catch (error) {
      console.error("Failed to fetch anime data:", error);
    }
  };

  useEffect(() => {
    if (animeid) {
      getAllaboutthatanime();
    }
  }, [animeid]);

  if (!anidata) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "var(--bg-100)" }}>
        <div className="relative">
          <Spinner size="lg" className="w-20 ml-9 h-20 text-accent-300" />
          <div className="mt-4" style={{ color: "var(--text-200)", fontSize: "1.25rem" }}>
            Loading your anime...
          </div>
        </div>
      </div>
    );
  }

  const genres =
    typeof anidata.genres === "string"
      ? anidata.genres.split(",").map((genre: string) => genre.trim())
      : Array.isArray(anidata.genres)
      ? anidata.genres
      : [];

  return (
    <div className="bg-gradient-to-b from-dark-blue via-midnight-blue to-deep-purple">
      <NavbarContainer />
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-200)" }}>
        <div
          className="absolute top-0 left-0 w-full h-[400px] opacity-30 blur-sm"
          style={{ backgroundImage: `url(${anidata.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative z-10">
          <div className="w-full h-48" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)" }} />

          <div className="max-w-7xl mx-auto px-4 -mt-24">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="relative group transform transition duration-500 hover:scale-105">
                  <Image
                    className="object-cover rounded-xl shadow-lg hover:shadow-xl transition-transform"
                    src={anidata.image}
                    width={350}
                    height={500}
                    alt={anidata.title || "Anime cover"}
                  />
                </div>
              </div>

              <div className="lg:w-2/3 space-y-6">
                <h1
                  className="text-5xl font-bold tracking-tight text-white drop-shadow-lg"
                  style={{ letterSpacing: "-0.5px" }}
                >
                  {anidata.title}
                </h1>

                <div
                  className="rounded-xl p-6 shadow-2xl"
                  style={{ backgroundColor: "var(--bg-300)", border: "1px solid var(--primary-200)" }}
                >
                  <p style={{ color: "var(--text-200)", lineHeight: "1.8" }}>{anidata.description}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-accent-300">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre: string, index: number) => (
                      <Button
                        key={index}
                        className="hover:scale-105 transition-all text-lg px-4 py-2"
                        style={{
                          backgroundColor: "var(--bg-300)",
                          color: "var(--text-100)",
                          border: "2px solid var(--accent-100)",
                          borderRadius: "1rem",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <EpisodeContainer anidata={anidata} />
          </div>
        </div>
      </div>
    </div>
  );
}
