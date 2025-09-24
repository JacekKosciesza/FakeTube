import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { AppSync } from "./appsync";
import { Aurora } from "./aurora";
import { DynamoDB } from "./dynamodb";
import { Gateway } from "./gateway";
import { Home } from "./home";
import { VPC } from "./vpc";

export class FakeTubeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new VPC(this, "vpc");
    const aurora = new Aurora(this, "aurora", { vpc });
    const dynamodb = new DynamoDB(this, "dynamodb");
    const gateway = new Gateway(this, "gateway");
    const appsync = new AppSync(this, "appsync", { dynamodb });

    new Home(this, "home", {
      appsync,
      aurora,
      dynamodb,
      gateway,
    });
  }
}
