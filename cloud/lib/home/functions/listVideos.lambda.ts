import cors from "@middy/http-cors";
import error from "@middy/http-error-handler";
const env = require("middy-env");
import middy from "@middy/core";
import validator from "@middy/validator";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import { Logger } from "@aws-lambda-powertools/logger";
import { LogLevel } from "@aws-lambda-powertools/logger/types";
import { logMetrics } from "@aws-lambda-powertools/metrics/middleware";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";
import { transpileSchema } from "@middy/validator/transpile";

const db = require("data-api-client")({
  secretArn: process.env.AURORA_SECRET_ARN,
  resourceArn: process.env.AURORA_CLUSTER_ARN,
  database: process.env.AURORA_DATABASE_NAME,
});

import { Video } from "../video";
import { Page } from "../page";

const serviceName = process.env.SERVICE_NAME!;
const logLevel = (process.env.LOG_LEVEL || "ERROR") as LogLevel;
const corsOrigins = process.env.CORS_ORIGINS || "[]";

const metrics = new Metrics({ namespace: serviceName });
const logger = new Logger({ logLevel, serviceName });
const tracer = new Tracer({ serviceName });

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("event", JSON.stringify(event));

    const queryParams = event.queryStringParameters || {};
    const currentPage = Math.max(parseInt(queryParams.page || "0"), 0);
    const pageSize = Math.min(parseInt(queryParams.pageSize || "24"), 64);

    const limit = pageSize;
    const offset = currentPage * pageSize;

    const result = await db.query(
      `
       SELECT 
           v.*,
           c.name as channel_name,
           c.avatar as channel_avatar,
           count(*) OVER() AS total
       FROM videos v
       INNER JOIN channels c ON v.channel_id = c.id
       ORDER BY v.published_at ASC
       LIMIT :limit
       OFFSET :offset;
     `,
      [
        {
          name: "limit",
          value: limit,
        },
        {
          name: "offset",
          value: offset,
        },
      ]
    );

    const videos = result.records.map((r: VideoRecord) => ({
      id: r.id,
      title: r.title,
      thumbnail: r.thumbnail,
      duration: r.duration,
      url: r.url,
      publishedAt: r.published_at,
      channel: {
        id: r.channel_id,
        name: r.channel_name,
        avatar: r.channel_avatar,
      },
    }));

    const total = result.records?.[0]?.total || 0;
    const totalPages = Math.ceil(total / pageSize);
    const hasNextPage = currentPage < totalPages - 1;

    const page: Page<Video> = {
      items: videos,
      currentPage,
      hasNextPage,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(page),
    };
  } catch (e: any) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: e.message,
      }),
    };
  }
};

interface VideoRecord {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
  published_at: string;
  channel_id: string;
  channel_name: string;
  channel_avatar: string;
  total: number;
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
    queryStringParameters: {
      type: ["object", "null"],
      properties: {
        page: {
          type: "string",
          pattern: "^[0-9]+$",
        },
        pageSize: {
          type: "string",
          pattern: "^[1-9][0-9]*$",
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
    cors({
      origins: JSON.parse(corsOrigins),
      methods: "GET,OPTIONS",
    })
  )
  .use(
    error({ logger: (message) => logger.error("http-error-handler", message) })
  );
