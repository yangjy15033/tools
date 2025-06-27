import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IP检测工具",
  keywords: ["IP检测", "IP查询", "IP地址", "地理位置", "运营商信息", "代理检测"],
  authors: [{ name: "IP检测团队", url: "https://ipcheck.example.com" }],
  creator: "IP检测团队",
  description: "最权威的IP检测工具，提供IP地址查询、地理位置、运营商信息、代理检测等多种功能。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
