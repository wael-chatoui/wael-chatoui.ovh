import type { Metadata } from "next";
import { geistMono, geistSans } from "./font";
import "./globals.css";
import ContactBar from "@/components/contact-bar";
import AnimatedBackground from "@/components/animated-background";
import ThemeWrapper from "@/components/theme-wrapper";

export const metadata: Metadata = {
  title: {
    default: "Wael Chatoui",
    template: "Wael Chatoui - %s",
  },
  description: "Portefolio: Wael CHATOUI, 42 Paris student from September 2025 piscine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden scroll-smooth flex flex-col min-h-screen`}
      >
				<AnimatedBackground />
				<ContactBar />
				<ThemeWrapper>
					{children}
				</ThemeWrapper>
      </body>
    </html>
  );
}
