import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { Construct } from "constructs";

export class DocsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, "DocsApp", {
      appName: "codetube-docs",
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "JacekKosciesza",
        repository: "CodeTube",
        oauthToken: cdk.SecretValue.secretsManager("github-token"),
      }),
      platform: amplify.Platform.WEB,
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: "1",
        frontend: {
          phases: {
            preBuild: {
              commands: ["npm ci"],
            },
            build: {
              commands: ["npm run build -w docs"],
            },
          },
          artifacts: {
            baseDirectory: "docs/out",
            files: ["**/*"],
          },
          cache: {
            paths: ["node_modules/**/*"],
          },
        },
      }),
    });

    const mainBranch = amplifyApp.addBranch("main", {
      autoBuild: true,
      stage: "PRODUCTION",
    });

    amplifyApp.addDomain("codetube.org", {
      subDomains: [{ branch: mainBranch, prefix: "" }],
    });

    new cdk.CfnOutput(this, "AmplifyAppId", {
      value: amplifyApp.appId,
      description: "Amplify App ID for the docs site",
    });

    new cdk.CfnOutput(this, "AmplifyDefaultDomain", {
      value: `main.${amplifyApp.defaultDomain}`,
      description:
        "Default Amplify domain (usable before custom domain is verified)",
    });
  }
}
