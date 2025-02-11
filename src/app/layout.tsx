import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Providers } from "./providers";

const interFont = localFont({
  src: "../../public/fonts/inter-var-latin.woff2",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ntriodev",
  description: "ntriodev personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.variable} antialiased`}>
        <Providers>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
