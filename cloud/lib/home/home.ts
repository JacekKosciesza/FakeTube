import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { Construct } from "constructs";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

import { Aurora } from "../aurora";
import { Gateway } from "../gateway";
import { Lambda } from "../lambda";

interface Props {
  aurora: Aurora;
  gateway: Gateway;
}

export class Home extends Construct {
  constructor(scope: Construct, id: string, { aurora, gateway }: Props) {
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

    this.rest(gateway.rest, listVideosLambda.function);
    this.http(gateway.http, listVideosLambda.function);
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
