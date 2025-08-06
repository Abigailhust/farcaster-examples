import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculator Mini App",
  description: "A beautiful calculator mini app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}