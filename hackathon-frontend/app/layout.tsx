import type { Metadata } from "next";
// import localFont from "next/font/local"; // We are using Inter from Google Fonts mostly, but let's stick to standard imports if needed or rely on variable fonts if configured.
import "./globals.css";
import { CursorReactiveBackground } from "@/components/ui/CursorReactiveBackground";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voice AI Hotel Assistant",
  description: "Next-generation voice concierge for premium hospitality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen relative`}>
        <CursorReactiveBackground />
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

