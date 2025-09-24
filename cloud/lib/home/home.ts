import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { Construct } from "constructs";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

import { AppSync } from "../appsync";
import { AppsyncResolver } from "../appsyncResolver";
import { Aurora } from "../aurora";
import { DynamoDB } from "../dynamodb";
import { Gateway } from "../gateway";
import { Lambda } from "../lambda";

interface Props {
  appsync: AppSync;
  aurora: Aurora;
  dynamodb: DynamoDB;
  gateway: Gateway;
}

export class Home extends Construct {
  constructor(
    scope: Construct,
    id: string,
    { appsync, aurora, dynamodb, gateway }: Props
  ) {
    super(scope, id);

    const listVideosLambda = new Lambda(this, "listVideos", {
      name: "listVideos",
      description: "Retrieve a paginated list of videos",
      entry: path.join(__dirname, "functions", "listVideos.lambda.ts"),
      environment: {
        SERVICE_NAME: "Home",
        LOG_LEVEL: "INFO",
        AURORA_SECRET_ARN: aurora.credentials.secretArn,
        AURORA_CLUSTER_ARN: aurora.cluster.clusterArn,
        AURORA_DATABASE_NAME: aurora.defaultName,
      },
    });
    aurora.cluster.grantDataApiAccess(listVideosLambda.function);

    // this.dynamodbResolver(appsync);
    this.lambdaResolver(appsync, dynamodb);
    this.rest(gateway.rest, listVideosLambda.function);
    this.http(gateway.http, listVideosLambda.function);
  }

  dynamodbResolver(appsync: AppSync): void {
    new AppsyncResolver(this, "listVideosResolver", {
      name: "listVideos",
      typeName: "Query",
      entry: path.join(__dirname, "resolvers", "listVideos.resolver.js"),
      appsync,
    });

    new AppsyncResolver(this, "getChannelResolver", {
      name: "channel",
      typeName: "Video",
      entry: path.join(__dirname, "resolvers", "getChannel.resolver.js"),
      appsync,
    });
  }

  lambdaResolver(appsync: AppSync, dynamodb: DynamoDB): void {
    const listVideosProxyLambda = new Lambda(this, "listVideosProxy", {
      name: "listVideosProxy",
      description: "Retrieve a paginated list of videos",
      entry: path.join(__dirname, "functions", "listVideosProxy.lambda.ts"),
      environment: {
        SERVICE_NAME: "Home",
        LOG_LEVEL: "INFO",
      },
    });
    dynamodb.table.grantReadData(listVideosProxyLambda.function);

    const lambdaDS = appsync.api.addLambdaDataSource(
      `listVideosProxyDS`,
      listVideosProxyLambda.function
    );

    lambdaDS.createResolver("listVideosProxy", {
      typeName: "Query",
      fieldName: "listVideosProxy",
    });
  }

  rest(rest: apigw.RestApi, handler: lambda.IFunction): void {
    const videos = rest.root.addResource("videos", {
      defaultCorsPreflightOptions: {
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
        allowMethods: ["GET", "OPTIONS"],
        allowOrigins: this.node.tryGetContext("corsOrigins") || [],
      },
    });

    videos.addMethod("GET", new apigw.LambdaIntegration(handler));
  }

  http(http: apigwv2.HttpApi, handler: lambda.IFunction): void {
    const integration = new HttpLambdaIntegration("VideosIntegration", handler);

    http.addRoutes({
      path: "/videos",
      methods: [apigwv2.HttpMethod.GET],
      integration,
    });
  }
}
