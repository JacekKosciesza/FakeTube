import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class VPC extends Construct {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.vpc = new ec2.Vpc(this, "vpc", {
      vpcName: "sitetube",
      createInternetGateway: false,
      subnetConfiguration: [
        {
          name: "aurora",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });
  }
}
