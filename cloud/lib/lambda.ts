import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface Props {
  name: string;
  description: string;
  entry: string;
  environment?: { [key: string]: string };
}

export class Lambda extends Construct {
  public function: lambda.IFunction;

  constructor(
    scope: Construct,
    id: string,
    { name, description, entry, environment: env }: Props
  ) {
    super(scope, id);

    const environment: { [key: string]: string } = {
      ...env,
      CORS_ORIGINS: JSON.stringify(
        this.node.tryGetContext("corsOrigins") || []
      ),
    };

    const lambdaFunction = new lambdaNode.NodejsFunction(
      this,
      `${name}Lambda`,
      {
        functionName: name,
        description: description,
        runtime: lambda.Runtime.NODEJS_LATEST,
        architecture: lambda.Architecture.ARM_64,
        entry,
        environment,
      }
    );

    this.function = lambdaFunction;
  }
}
