import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

import { VPC } from "./vpc";

interface Props {
  vpc: VPC;
}

export class Aurora extends Construct {
  public readonly defaultName = "faketube";
  public readonly cluster: rds.DatabaseCluster;

  public get credentials(): secretsmanager.Secret {
    return this.cluster.node.children.filter(
      (child) => child instanceof rds.DatabaseSecret
    )[0] as rds.DatabaseSecret;
  }

  constructor(scope: Construct, id: string, { vpc }: Props) {
    super(scope, id);

    this.cluster = new rds.DatabaseCluster(this, "rds-database-cluster", {
      clusterIdentifier: this.defaultName,
      defaultDatabaseName: this.defaultName,
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_16_6,
      }),
      enableDataApi: true,
      vpc: vpc.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      writer: rds.ClusterInstance.serverlessV2("writer"),
      readers: [rds.ClusterInstance.serverlessV2("reader1")],
      serverlessV2MinCapacity: 0,
      serverlessV2MaxCapacity: 1,
      serverlessV2AutoPauseDuration: cdk.Duration.hours(0.5),
    });

    new cdk.CfnOutput(this, "AuroraClusterArn", {
      value: this.cluster.clusterArn,
    });

    new cdk.CfnOutput(this, "AuroraClusterSecretArn", {
      value: this.credentials.secretArn,
    });
  }
}
