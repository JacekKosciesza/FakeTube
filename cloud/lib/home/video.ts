import { Channel } from "./channel";

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
  publishedAt: string;
  channel: Channel;
}
