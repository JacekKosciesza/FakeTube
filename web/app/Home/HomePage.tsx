"use client";

import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useInView } from "react-intersection-observer";

import { BrowseGrid } from "./BrowseGrid";
import { MediaItem } from "./MediaItem";
import { MediaSkeleton } from "./MediaSkeleton";
import { PAGE_SIZE, useListVideos } from "./useListVideos";

export function HomePage() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useListVideos();

  const videos = data?.pages.flatMap((page) => page.items);

  React.useEffect(() => {
    if (inView) {
      if (!isFetching && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const skeleton = (
    <>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <MediaSkeleton key={index} />
      ))}
    </>
  );

  return (
    <>
      <BrowseGrid>
        {status === "pending" ? (
          skeleton
        ) : (
          <>
            {(videos || []).map((video) => (
              <MediaItem key={video.id} video={video} />
            ))}
            {isFetchingNextPage && skeleton}
          </>
        )}
      </BrowseGrid>
      <Box ref={ref} sx={{ textAlign: "center", height: 2, my: 2 }}>
        {isFetchingNextPage && <CircularProgress />}
      </Box>
    </>
  );
}
