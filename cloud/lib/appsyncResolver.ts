import * as aws_appsync from "aws-cdk-lib/aws-appsync";
import { Construct } from "constructs";

import { AppSync } from "./appsync";

interface Props {
  name: string;
  typeName: string;
  entry: string;
  appsync: AppSync;
  dataSource?: aws_appsync.BaseDataSource;
}

export class AppsyncResolver extends Construct {
  public resolver: aws_appsync.Resolver;

  constructor(
    scope: Construct,
    id: string,
    { name, typeName, entry, appsync, dataSource }: Props
  ) {
    super(scope, id);

    this.resolver = new aws_appsync.Resolver(this, name, {
      api: appsync.api,
      fieldName: name,
      typeName,
      dataSource: dataSource || appsync.dynamodbDS,
      code: aws_appsync.Code.fromAsset(entry),
      runtime: aws_appsync.FunctionRuntime.JS_1_0_0,
    });
  }
}
