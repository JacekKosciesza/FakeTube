import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { Construct } from "constructs";

export class WebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, "WebApp", {
      appName: "codetube-web",
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "JacekKosciesza",
        repository: "CodeTube",
        oauthToken: cdk.SecretValue.secretsManager("github-token"),
      }),
      platform: amplify.Platform.WEB_COMPUTE,
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: "1",
        applications: [
          {
            appRoot: "web",
            frontend: {
              phases: {
                preBuild: {
                  commands: ["cd .. && npm ci"],
                },
                build: {
                  commands: ["cd .. && npm run build -w web"],
                },
              },
              artifacts: {
                baseDirectory: ".next",
                files: ["**/*"],
              },
              cache: {
                paths: ["../node_modules/**/*"],
              },
            },
          },
        ],
      }),
    });

    const mainBranch = amplifyApp.addBranch("main", {
      autoBuild: true,
      stage: "PRODUCTION",
    });

    amplifyApp.addDomain("codetube.app", {
      subDomains: [{ branch: mainBranch, prefix: "" }],
    });

    new cdk.CfnOutput(this, "AmplifyAppId", {
      value: amplifyApp.appId,
      description: "Amplify App ID for the web app",
    });

    new cdk.CfnOutput(this, "AmplifyDefaultDomain", {
      value: `main.${amplifyApp.defaultDomain}`,
      description: "Default Amplify domain",
    });
  }
}
