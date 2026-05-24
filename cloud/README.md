# @faketube/cloud

AWS CDK infrastructure for FakeTube. `@faketube/cloud` workspace of the FakeTube monorepo.

The `cdk.json` file tells the CDK Toolkit how to execute the app.

## Useful commands

Run from the repo root with `-w cloud`, or from this directory directly:

* `npm run build -w cloud`   compile typescript to js
* `npm run watch -w cloud`   watch for changes and compile
* `npm test -w cloud`        run jest unit tests
* `npm run graphql -w cloud` build merged GraphQL schema
* `npx cdk deploy`           deploy this stack (run from `cloud/`)
* `npx cdk diff`             compare deployed stack with current state
* `npx cdk synth`             emit the synthesized CloudFormation template
