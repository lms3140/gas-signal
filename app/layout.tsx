import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "천연가스 대시보드",
  description:
    "천연가스 저장량 추이와 HDD 데이터를 한눈에 확인할 수 있는 대시보드입니다.",
  openGraph: {
    title: "천연가스 대시보드",
    description:
      "천연가스 저장량 추이와 HDD 데이터를 한눈에 확인할 수 있는 대시보드입니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
