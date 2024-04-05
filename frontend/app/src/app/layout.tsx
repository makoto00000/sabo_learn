import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./styles/globals.css";
import "ress";
import NextAuthProvider from "./providers/NextAuth";
import Script from "next/script";

const sans = DM_Sans({ subsets: ["latin"] });
const title = "SaboLlearn";
const description = "サボりを減らして生産性を上げる作業部屋";
const url = "https://app.sabolearn.com";

export const metadata: Metadata = {
  title: "SaboLearn",
  description: "サボりを減らして生産性を上げる作業部屋",
  openGraph: {
    title: title,
    description: description,
    url,
    siteName: title,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    site: "@sabolearn",
    creator: "@makoblog2",
  },
  alternates: {
    canonical: url,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "htts://localhost:4000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={sans.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Script
          src="https://docs.opencv.org/3.4.0/opencv.js"
          strategy="beforeInteractive"
          async={true}
        />
      </body>
    </html>
  );
}
