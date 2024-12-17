"use client";
import { Image } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, use } from "react";

interface Anidata {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
  subOrDub: string;
}

const Animedata = ({ params }: any) => {
  const searchquery: any = use(params);
  const animename = searchquery.animename;

  const [aniData, setanidata] = useState<Anidata[]>([]);
  const getAnidata = async () => {
    const response = await axios.get<{ results: Anidata[] }>(
      `https://consumet-api-9p6q.onrender.com/anime/gogoanime/${animename}`
    );
    setanidata(response.data.results);
  };

  useEffect(() => {
    getAnidata();
  }, [animename]);
  return (
    <div className=" ml-5 mr-5 mt-24  grid gap-x-2 gap-y-4 grid-cols-3">
      {aniData.map((anime) => (
        <div className=" flex  col-span-1 " key={anime.id}>
          <Link href={`/animeinfo/${anime.id}`}>
            <div>
              <Image
                // isBlurred={true}
                className=" mb-2 border border-[#3f3f46] object-cover"
                loading="lazy"
                width={400}
                height={240}
                radius="sm"
                src={anime.image}
              />

              {anime.title.length > 60
                ? anime.title.slice(0, 17) + "..."
                : anime.title}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Animedata;
