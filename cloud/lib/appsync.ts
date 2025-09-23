import * as appsync from "aws-cdk-lib/aws-appsync";
import * as cdk from "aws-cdk-lib";
import * as path from "path";
import { Construct } from "constructs";

import { DynamoDB } from "./dynamodb";

interface Props extends cdk.StackProps {
  dynamodb: DynamoDB;
}

export class AppSync extends Construct {
  public api: appsync.GraphqlApi;
  public dynamodbDS: appsync.DynamoDbDataSource;

  constructor(scope: Construct, id: string, { dynamodb }: Props) {
    super(scope, id);

    this.api = new appsync.GraphqlApi(this, "appsync-graphql-api", {
      name: "faketube",
      definition: appsync.Definition.fromFile(
        path.join(__dirname, "schema.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
          },
        },
      },
    });

    this.dynamodbDS = this.api.addDynamoDbDataSource(
      "faketube",
      dynamodb.table
    );

    new cdk.CfnOutput(this, "GraphQLUrlExport", {
      value: this.api.graphqlUrl,
    });

    new cdk.CfnOutput(this, "GraphQLApiKeyExport", {
      value: this.api.apiKey || "",
    });
  }
}
