import type { Metadata } from "next";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";
import { UAParser } from "ua-parser-js";

import { AppShell } from "./AppShell";
import { Providers } from "./providers";

const FALLBACK_DEVICE_TYPE = "mobile";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "FakeTube",
  description: "Enjoy the videos and music you love on FakeTube.",
  keywords: "video, free",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || undefined;
  const uap = new UAParser(userAgent);
  const deviceType =
    (await uap.getDevice().withFeatureCheck()).type || FALLBACK_DEVICE_TYPE;

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers deviceType={deviceType}>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
