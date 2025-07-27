import { useInfiniteQuery } from "@tanstack/react-query";

import { Page } from "./page";
import { Video } from "./video";
import { VIDEOS } from "./videos.data";

export const PAGE_SIZE = 24;
const DELAY_MS = 1000;

const fetch = async (
  currentPage: number,
  pageSize: number = PAGE_SIZE
): Promise<Page<Video>> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  const start = currentPage * pageSize;
  const end = start + pageSize;

  return {
    items: VIDEOS.slice(start, end),
    currentPage,
    hasNextPage: end < VIDEOS.length,
  };
};

export const useListVideos = () => {
  return useInfiniteQuery({
    queryKey: ["listVideos"],
    queryFn: ({ pageParam: page }) => fetch(page),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  });
};
