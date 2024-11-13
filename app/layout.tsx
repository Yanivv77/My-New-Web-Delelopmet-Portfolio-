import type { Metadata, Viewport  } from "next";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { cn } from "@/lib/utils";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Nunito, Poppins } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"],variable: "--font-sans" });

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  style: ['normal', 'italic'],
  variable: '--font-nunito',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Yaniv's Portfolio",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="" style={{ fontSize: '120%' }}>
      <head>
        <link rel="icon" href="/" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          nunito.variable,
          
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}