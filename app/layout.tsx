import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ResultSessionProvider } from "@/components/result/ResultSessionProvider";

export const metadata: Metadata = {
  title: "AIDepQuiz – AI Dependence Self-Assessment",
  description: "Một công cụ giáo dục giúp bạn nhìn lại cách mình sử dụng AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <SmoothScrollProvider>
          <ResultSessionProvider>{children}</ResultSessionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

