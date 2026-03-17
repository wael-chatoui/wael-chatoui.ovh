import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { syne, dmSans } from "@/app/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wael Chatoui — Developer",
  description: "Student developer turning ideas into interfaces. Portfolio of Wael Chatoui.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${syne.variable} ${dmSans.variable} font-body grain`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
