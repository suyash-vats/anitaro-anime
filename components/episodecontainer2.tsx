import React, { useState } from "react";
import Link from "next/link";
import { useAnimeDataPersist } from "@/components/animeStore"; // Import your zustand state to access watched episodes

const EpisodeContainer2 = ({
  anidata,
  currentEpisode,
  previousEpisode,
}: {
  anidata: any;
  currentEpisode: string;
  previousEpisode: string | null;
}) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null); // Track the selected episode

  // Access watched episodes from zustand store
  const { animeDetails } = useAnimeDataPersist.getState();

  // Validate anidata and episodes
  if (!anidata || !anidata.episodes) {
    return <p>No episode data available.</p>;
  }

  const episodes = anidata.episodes;

  // Grouping logic
  const totalGroups = Math.ceil(episodes.length / 100);

  const renderEpisodes = () => {
    const startIndex = selectedGroup * 100;
    const endIndex = Math.min(startIndex + 100, episodes.length);

    return episodes.slice(startIndex, endIndex).map((episode: any) => {
      // Ensure episode number is a string for comparison
      const episodeNumber = episode.number.toString();

      // Find the anime detail to check watched episodes
      const animeDetail = animeDetails.find((item: any) => item.animeId === anidata.id);
      const isWatched = animeDetail?.watchedEpisode.includes(episodeNumber);
      const isCurrent = episodeNumber === currentEpisode;
      const isPrevious = episodeNumber === previousEpisode;
      const isSelected = episodeNumber === selectedEpisode; // Check if the episode is selected

      // Define card classes based on the episode status
      const cardClasses = `p-6 rounded-2xl  transition-all duration-500 transform hover:scale-110 hover:opacity-90 hover:rotate-3 hover:shadow-lg ${
        isCurrent
          ? "bg-gradient-to-r from-[#FF4D4D] to-[#FFB3B3] text-[#FFFFFF]" // Gradient for current episode
          : isPrevious
          ? "bg-gradient-to-r from-[#56647b] to-[#4a5c72] text-[#FFFFFF]" // Gradient for previous episode
          : isWatched
          ? "bg-[#b4c2dc] text-[#1A1F2B]" // Watched episode color
          : isSelected
          ? "bg-[#FFECDA] text-[#1A1F2B] border-2 border-[#FF4D4D]" // Selected episode style (light yellow background with border)
          : "bg-[#292e3b] text-[#e0e0e0]" // Non-watched episode color
      }`;

      const handleClick = () => {
        if (isSelected) {
          setSelectedEpisode(null); // Unselect the episode if it's already selected
        } else {
          setSelectedEpisode(episodeNumber); // Select the episode
        }
      };

      return (
        <Link
          key={episodeNumber}
          href={`/${anidata.id}/${episodeNumber.replace(/\./g, "-")}`}
        >
          <div
            className={cardClasses}
            onClick={handleClick} // Toggle selection on click
          >
            <h4 className="font-semibold text-lg text-center">{`Episode ${episodeNumber}`}</h4>
          </div>
        </Link>
      );
    });
  };

  const groupOptions = Array.from({ length: totalGroups }, (_, index) => ({
    value: index,
    label: `${index * 100 + 1}-${Math.min((index + 1) * 100, episodes.length)}`,
  }));

  return (
    <div className="w-full h-[600px] bg-[#1A1F2B] rounded-2xl  p-8">
      <p className="text-center mb-6 mt-4 text-4xl font-bold text-[#FFFFFF] tracking-widest">
        Episodes
      </p>

      {episodes.length > 100 && (
        <div className="mb-4 px-4 flex justify-center">
          <select
            className="border p-3 rounded-md shadow-lg bg-[#414654] text-[#e0e0e0] transition duration-500 ease-in-out hover:bg-[#56647b] focus:outline-none transform hover:scale-105"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(Number(e.target.value))}
          >
            {groupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="h-[500px] overflow-y-auto pr-2 scrollbar-hide">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderEpisodes()}
        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer2;
