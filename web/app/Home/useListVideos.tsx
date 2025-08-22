import { get } from "aws-amplify/api";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Page } from "./pagination";
import { Video } from "./video";
import { VIDEOS } from "./videos.data";

export const PAGE_SIZE = 24;
const DELAY_MS = 1000;

const fetchMock = async (
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

enum ApiType {
  MOCK = "mock",
  REST = "rest",
  HTTP = "http",
}

const getApiName = (): string => {
  switch (process.env.NEXT_PUBLIC_FAKETUBE_API_TYPE_SWITCH) {
    case ApiType.REST:
      return process.env.NEXT_PUBLIC_FAKETUBE_AWS_API_GATEWAY_REST_NAME!;
    case ApiType.HTTP:
      return process.env.NEXT_PUBLIC_FAKETUBE_AWS_API_GATEWAY_HTTP_NAME!;
    default:
      throw new Error("Invalid API switch configuration");
  }
};

const fetchApi = async (
  currentPage: number,
  pageSize: number = PAGE_SIZE
): Promise<Page<Video>> => {
  try {
    const restOperation = get({
      apiName: getApiName(),
      path: "/videos",
      options: {
        queryParams: {
          page: currentPage.toString(),
          pageSize: pageSize.toString(),
        },
      },
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log("Response from API:", response);

    const page = response as unknown as Page<Video>;

    return page;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return {
      items: [],
      currentPage,
      hasNextPage: false,
    };
  }
};

export const useListVideos = () => {
  return useInfiniteQuery({
    queryKey: ["listVideos"],
    queryFn: ({ pageParam: page }) =>
      process.env.NEXT_PUBLIC_FAKETUBE_API_TYPE_SWITCH === ApiType.MOCK
        ? fetchMock(page)
        : fetchApi(page),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
  });
};
