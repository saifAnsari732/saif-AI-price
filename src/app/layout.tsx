import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AI Price Comparison",
  description: "Find the best deals across multiple e-commerce platforms using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-slate-950 text-slate-50 font-sans min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-white/10 py-8 mt-12 bg-slate-950">
            <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} PriceAI. All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
