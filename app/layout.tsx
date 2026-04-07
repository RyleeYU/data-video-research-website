import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./components/top-nav";

export const metadata: Metadata = {
  title: "Data Video Research Website",
  description:
    "Research companion website for understanding human-AI collaboration in data video creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F5F5F5] text-[#1F2937]">
        <TopNav />
        {children}
      </body>
    </html>
  );
}