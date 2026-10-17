import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Sakthivel Ganesan - AI Engineer",
  description:
    "Sakthivel Ganesan is an AI engineer building reliable generative AI systems, RAG applications, AI agents, and full-stack products.",
  applicationName: "Sakthivel Ganesan - AI Engineer",
  authors: [{ name: "Sakthivel Ganesan" }],
  creator: "Sakthivel Ganesan",
  keywords: [
    "Sakthivel Ganesan",
    "AI Engineer",
    "Generative AI",
    "RAG",
    "AI Agents",
    "Full-Stack Engineer",
    "Chennai",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sakthivel Ganesan - AI Engineer",
    title: "Sakthivel Ganesan - AI Engineer",
    description:
      "AI engineer building reliable generative AI systems, RAG applications, AI agents, and full-stack products.",
  },
  twitter: {
    card: "summary",
    title: "Sakthivel Ganesan - AI Engineer",
    description:
      "AI engineer building reliable generative AI systems, RAG applications, AI agents, and full-stack products.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Global app layout intentionally loads this shared stylesheet for every route. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
