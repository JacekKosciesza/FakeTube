import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { Aurora } from "./aurora";
import { VPC } from "./vpc";

export class FakeTubeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new VPC(this, "vpc");
    new Aurora(this, "aurora", { vpc });
  }
}
