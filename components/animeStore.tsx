import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type animeStoreType = {
    isCheckedTheme: boolean;
    setIsCheckedTheme: (isCheckedTheme: boolean) => void;
    fetchCategory: string;
    setFetchCategory: (fetchCategory: string) => void;
}

const animeStore = create<animeStoreType>()(
    (set) => ({
      // Theme Toggle
      isCheckedTheme: true,
      setIsCheckedTheme: (value: boolean) => set({ isCheckedTheme: value }),
      // Fetch Category
      fetchCategory: 'trending',
      setFetchCategory: (value: string) => set({ fetchCategory: value }),
    })
  );
  
type AnimeDetailsType = {
    animeId: string;
    watchedEpisode: number[];
}

type WebStateStoreType = {
    animeDetails: AnimeDetailsType[];
    setAnimeDetails: (animeDetails: AnimeDetailsType[]) => void;
}

const useAnimeDataPersist = create<WebStateStoreType>()(
    persist(
        (set) => ({
            animeDetails: [],
            setAnimeDetails: (value: AnimeDetailsType[]) => set({ animeDetails: value }),
        }),
        {
            name: "animeData",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

type AnimeDetailsListType = {
    animeId: string;
    animeName: string;
    animeImage: string;
    totalEpisodes: number;
}

type MyListStateStoreType = {
    myListDetails: AnimeDetailsListType[];
    setMyListDetails: (myListDetails: AnimeDetailsListType[]) => void;
}

const useMyListDataPersist = create<MyListStateStoreType>()(
    persist(
        (set) => ({
            myListDetails: [],
            setMyListDetails: (value: AnimeDetailsListType[]) => set({ myListDetails: value }),
        }),
        {
            name: "myListData",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export { animeStore, useAnimeDataPersist, useMyListDataPersist };