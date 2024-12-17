import React, { useState } from "react";
import Link from "next/link";
import { Button, Select, SelectItem } from "@nextui-org/react";

const EpisodeContainer = ({ anidata }: any) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const episodes = anidata.episodes;

  const handleGroupChange = (value: number) => {
    setSelectedGroup(value);
  };

  const renderEpisodeButtons = () => {
    const startIndex = selectedGroup * 100;
    const endIndex = Math.min(startIndex + 100, episodes.length);

    const episodeButtons = [];
    for (let i = startIndex; i < endIndex; i++) {
      const episode = episodes[i];
      episodeButtons.push(
        <Link
          key={`episode-${anidata.id}-${episode.number}`}
          href={`/${anidata.id}/${episode.number
            .toString()
            .replace(/\./g, "-")}`}
        >
          <Button color="default" variant="shadow" isIconOnly>
            {episode.number}
          </Button>
        </Link>
      );
    }
    return episodeButtons;
  };

  const renderGroupDropdown = () => {
    if (episodes.length > 100) {
      const totalGroups = Math.ceil(episodes.length / 100);
      const options = Array.from({ length: totalGroups }, (_, index) => ({
        value: index,
        label: `${index * 100 + 1}-${Math.min(
          (index + 1) * 100,
          episodes.length
        )}`,
      }));

      return (
        <Select
          size="sm"
          color="primary"
          variant="underlined"
          placeholder="Select an episode group"
          className="max-w-xs text-foreground bg-background"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-foreground bg-background"
              onClick={() => handleGroupChange(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {renderGroupDropdown()}
        <div className="flex flex-wrap gap-2 items-center pt-6">
          {renderEpisodeButtons()}
        </div>
      </div>
    </div>
  );
};

export default EpisodeContainer;
