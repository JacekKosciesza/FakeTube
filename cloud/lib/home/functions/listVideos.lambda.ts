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

    const page: Page<Video> = {
      items: [],
      currentPage,
      hasNextPage: false,
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
