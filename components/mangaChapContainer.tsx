"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/react";

interface Chapter {
  id: string;
  title: string;
  chapterNumber: string;
  volumeNumber: string;
  pages: number;
}

interface MangaChapContainerProps {
  mangadata: {
    chapters: Chapter[];
  };
}

const MangaChapContainer = ({ mangadata }: MangaChapContainerProps) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const chapters = mangadata.chapters;

  const handleChapterClick = (id: string) => {
    if (isClient) {
      router.push(`/readmanga/${id}`);
    }
  };

  const groupedChapters = chapters.reduce((acc, chapter) => {
    const volume = `Volume ${chapter.volumeNumber}`;
    if (!acc[volume]) {
      acc[volume] = [];
    }
    acc[volume].push(chapter);
    return acc;
  }, {} as Record<string, Chapter[]>);

  const sortedVolumes = Object.entries(groupedChapters).sort((a, b) => {
    const volumeA = parseInt(a[0].split(" ")[1]);
    const volumeB = parseInt(b[0].split(" ")[1]);
    return volumeB - volumeA;
  });

  return (
    <div className="p-4 sm:p-6 mt-24 bg-gray-100 dark:bg-black border border-[#3f3f46] rounded-md shadow-md">
      <div className="text-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Chapters
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {chapters.length} chapters
        </p>
      </div>

      <div className="space-y-8">
        {sortedVolumes.map(([volume, volumeChapters]) => {
          const sortedChapters = [...volumeChapters].sort(
            (a, b) => parseFloat(b.chapterNumber) - parseFloat(a.chapterNumber)
          );

          return (
            <div
              key={volume}
              className="bg-white dark:bg-black border border-[#3f3f46] p-4 rounded-md shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {volume}
                </h2>
                <Chip color="primary">{volumeChapters.length} chapters</Chip>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-md shadow-md flex flex-col space-y-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                    onClick={() => handleChapterClick(chapter.id)}
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Chapter {chapter.chapterNumber}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {chapter.title}
                    </p>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {chapter.pages} pages
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MangaChapContainer;
