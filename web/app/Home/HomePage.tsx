import { BrowseGrid } from "./BrowseGrid";
import { MediaItem } from "./MediaItem";
import { MediaSkeleton } from "./MediaSkeleton";
import { VIDEOS } from "./videos.data";

const PAGE_SIZE = 24;

export function HomePage() {
  const loading = false;

  const skeleton = (
    <>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <MediaSkeleton key={index} />
      ))}
    </>
  );

  return (
    <BrowseGrid>
      {loading ? (
        skeleton
      ) : (
        <>
          {VIDEOS.map((video) => (
            <MediaItem video={video} key={video.id} />
          ))}
        </>
      )}
    </BrowseGrid>
  );
}
