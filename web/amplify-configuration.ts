import { ResourcesConfig } from "aws-amplify";

export const config: ResourcesConfig = {
  API: {
    REST: {
      faketubeHttp: {
        region: process.env.NEXT_PUBLIC_FAKETUBE_AWS_REGION!,
        endpoint:
          process.env.NEXT_PUBLIC_FAKETUBE_AWS_API_GATEWAY_HTTP_ENDPOINT!,
      },
      faketubeRest: {
        region: process.env.NEXT_PUBLIC_FAKETUBE_AWS_REGION!,
        endpoint:
          process.env.NEXT_PUBLIC_FAKETUBE_AWS_API_GATEWAY_REST_ENDPOINT!,
      },
    },
  },
};

export default config;
