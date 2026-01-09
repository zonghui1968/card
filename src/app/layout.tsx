import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "数字贺卡生成器 - AI驱动的个性化贺卡",
  description: "使用AI技术生成精美的个性化贺卡，支持多种类型和主题，带有3D翻转效果和背景音乐",
  keywords: "贺卡生成器,AI贺卡,数字贺卡,生日贺卡,祝福贺卡",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
