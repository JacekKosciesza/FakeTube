import error from "@middy/http-error-handler";
const env = require("middy-env");
import middy from "@middy/core";
import validator from "@middy/validator";
import { AppSyncResolverEvent } from "aws-lambda";
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import { Logger } from "@aws-lambda-powertools/logger";
import { LogLevel } from "@aws-lambda-powertools/logger/types";
import { logMetrics } from "@aws-lambda-powertools/metrics/middleware";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { transpileSchema } from "@middy/validator/transpile";

import { Channel } from "../channel";
import { Video } from "../video";
import { Page } from "../page";

const serviceName = process.env.SERVICE_NAME!;
const logLevel = (process.env.LOG_LEVEL || "ERROR") as LogLevel;

const metrics = new Metrics({ namespace: serviceName });
const logger = new Logger({ logLevel, serviceName });
const tracer = new Tracer({ serviceName });

interface Arguments {
  nextToken?: string;
  limit?: number;
}

const dynamodb = DynamoDBDocument.from(new DynamoDB());

export const lambdaHandler = async (
  event: AppSyncResolverEvent<Arguments, Page<Video[]>>
) => {
  try {
    console.log("event", JSON.stringify(event));

    const { nextToken, limit } = event.arguments || {};

    const { Items, LastEvaluatedKey } = await dynamodb.query({
      TableName: "FakeTube",
      IndexName: "GSI1",
      KeyConditions: {
        GSI1_PK: {
          ComparisonOperator: "EQ",
          AttributeValueList: ["video"],
        },
      },
      Limit: limit,
      ExclusiveStartKey: nextToken ? JSON.parse(nextToken) : undefined,
    });

    const videos = (Items || []) as VideoItem[];

    const uniqueChannelIds = Array.from(
      new Set(videos.map((video) => video.channelId))
    );

    const channels = (
      await dynamodb.batchGet({
        RequestItems: {
          ["FakeTube"]: {
            Keys: uniqueChannelIds.map((channelId) => ({
              PK: `c#${channelId}`,
              SK: `c#${channelId}`,
            })),
          },
        },
      })
    ).Responses!["FakeTube"] as Channel[];

    const videosWithChannel: Video[] = videos.map((video) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      duration: video.duration,
      url: video.url,
      publishedAt: video.publishedAt,
      channel: (() => {
        const c = channels.find((channel) => channel.id === video.channelId)!;
        return { id: c.id, name: c.name, avatar: c.avatar };
      })(),
    }));

    const page: Page<Video> = {
      items: (videosWithChannel || []) as Video[],
      nextToken: LastEvaluatedKey
        ? JSON.stringify(LastEvaluatedKey)
        : undefined,
    };
    console.log("Page:", page);

    return page;
  } catch (e: any) {
    console.error(e);
    return {
      items: [],
    };
  }
};

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
  publishedAt: string;
  channelId: string;
}

const envMap = {
  names: {
    serviceName: ["SERVICE_NAME"],
    logLevel: ["LOG_LEVEL"],
    corsOrigins: ["CORS_ORIGINS"],
  },
};

const eventSchema = {
  type: "object",
  properties: {
    arguments: {
      type: "object",
      properties: {
        nextToken: {
          type: ["string", "null"],
        },
        limit: {
          type: "integer",
          minimum: 1,
        },
      },
      additionalProperties: true,
    },
  },
};

export const handler = middy(lambdaHandler)
  .use(captureLambdaHandler(tracer))
  .use(logMetrics(metrics, { captureColdStartMetric: true }))
  .use(injectLambdaContext(logger, { logEvent: true }))
  .use(env(envMap))
  .use(validator({ eventSchema: transpileSchema(eventSchema) }))
  .use(
    error({ logger: (message) => logger.error("http-error-handler", message) })
  );
