import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class Gateway extends Construct {
  public rest: apigw.RestApi;
  public http: apigwv2.HttpApi;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.rest = new apigw.RestApi(this, "faketubeRest", {
      defaultCorsPreflightOptions: {
        allowHeaders: apigw.Cors.DEFAULT_HEADERS,
        allowMethods: ["GET", "OPTIONS"],
        allowOrigins: this.node.tryGetContext("corsOrigins") || [],
      },
    });

    new cdk.CfnOutput(this, "ApiGatewayRestUrlExport", {
      value: this.rest.url,
    });

    this.http = new apigwv2.HttpApi(this, "faketubeHttp", {
      corsPreflight: {
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: this.node.tryGetContext("corsOrigins") || [],
      },
    });

    new cdk.CfnOutput(this, "ApiGatewayHttpUrlExport", {
      value: this.http.url!,
    });
  }
}
