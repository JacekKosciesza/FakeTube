import { BrowseGrid } from "./BrowseGrid";
import { MediaSkeleton } from "./MediaSkeleton";

const PAGE_SIZE = 24;

export function HomePage() {
  const skeleton = (
    <>
      {Array.from({ length: PAGE_SIZE }).map((_, index) => (
        <MediaSkeleton key={index} />
      ))}
    </>
  );

  return <BrowseGrid>{skeleton}</BrowseGrid>;
}
