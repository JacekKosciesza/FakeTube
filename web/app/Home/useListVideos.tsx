import { get } from "aws-amplify/api";
import { generateClient } from "aws-amplify/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { Page } from "./pagination";
import { Video } from "./video";
import { VIDEOS } from "./videos.data";

const client = generateClient();

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
  API_GATEWAY_REST = "api_gateway_rest",
  API_GATEWAY_HTTP = "api_gateway_http",
  GRAPHQL_DYNAMODB_RESOLVER = "graphql_dynamodb_resolver",
  GRAPHQL_LAMBDA_RESOLVER = "graphql_lambda_resolver",
}

const getApiName = (): string => {
  switch (process.env.NEXT_PUBLIC_FAKETUBE_API_TYPE_SWITCH) {
    case ApiType.API_GATEWAY_REST:
      return process.env.NEXT_PUBLIC_FAKETUBE_AWS_API_GATEWAY_REST_NAME!;
    case ApiType.API_GATEWAY_HTTP:
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

export const Query = (variant: "" | "Proxy") => `
  query listVideos${variant}($nextToken: String, $limit: Int) {
    page: listVideos${variant}(nextToken: $nextToken, limit: $limit) {    
      items {
        id
        title
        thumbnail
        duration
        url
        publishedAt
        channel {
          id
          avatar
          name
        }
      }
      nextToken
    }
  }
`;

export interface Result {
  data: {
    page: Page<Video>;
  };
}

const fetchGraphQL = async (
  nextToken: string | undefined,
  limit: number = PAGE_SIZE
) => {
  try {
    const result = (await client.graphql({
      query: Query(
        process.env.NEXT_PUBLIC_FAKETUBE_API_TYPE_SWITCH ===
          ApiType.GRAPHQL_LAMBDA_RESOLVER
          ? "Proxy"
          : ""
      ),
      variables: { nextToken, limit },
    })) as Result;

    console.log(JSON.stringify(result, null, 2));

    return result?.data.page;
  } catch (e: unknown) {
    console.error(e);
    return {
      items: [],
    };
  }
};

const fetch = (page: number | undefined | string) => {
  switch (process.env.NEXT_PUBLIC_FAKETUBE_API_TYPE_SWITCH) {
    case ApiType.API_GATEWAY_REST:
    case ApiType.API_GATEWAY_HTTP:
      return fetchApi(+(page || 0));
    case ApiType.GRAPHQL_DYNAMODB_RESOLVER:
    case ApiType.GRAPHQL_LAMBDA_RESOLVER:
      return fetchGraphQL(page?.toString());
    default:
      return fetchMock(+(page || 0));
  }
};

const getInitialPageParam = (): number | undefined => {
  switch (process.env.NEXT_PUBLIC_FAKETUBE_API_TYPE_SWITCH) {
    case ApiType.GRAPHQL_DYNAMODB_RESOLVER:
    case ApiType.GRAPHQL_LAMBDA_RESOLVER:
      return undefined;
    default:
      return 0;
  }
};

const getNextPageParam = (
  lastPage: Page<Video>
): number | undefined | string => {
  switch (process.env.NEXT_PUBLIC_FAKETUBE_API_TYPE_SWITCH) {
    case ApiType.GRAPHQL_DYNAMODB_RESOLVER:
    case ApiType.GRAPHQL_LAMBDA_RESOLVER:
      return lastPage.nextToken;
    default:
      return lastPage.hasNextPage ? lastPage.currentPage! + 1 : undefined;
  }
};

export const useListVideos = () => {
  return useInfiniteQuery<
    Page<Video>,
    Error,
    InfiniteData<Page<Video>, number | undefined | string>,
    string[],
    number | undefined | string
  >({
    queryKey: ["listVideos"],
    queryFn: ({ pageParam: page }) => fetch(page),
    initialPageParam: getInitialPageParam(),
    getNextPageParam,
  });
};
