"use client";

import { Amplify } from "aws-amplify";

import amplifyConfig from "@/amplify-configuration";

Amplify.configure(amplifyConfig, { ssr: true });

export function ConfigureAmplifyClientSide({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
