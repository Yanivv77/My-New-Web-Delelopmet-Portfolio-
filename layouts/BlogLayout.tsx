import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { BlogHeader } from "@/components/BlogHeader";
import { Providers } from "@/components/providers";
import { BlogFooter } from "@/components/BlogFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const BlogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  => {
  return (
      <div
        className={cn(
          "min-h-screen bg-background dark:bg-black-100 font-sans antialiased",
          inter.variable
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background dark:bg-black-100">
            <BlogHeader />
            <main className="flex-1">{children}</main>
            <BlogFooter />
          </div>
        </Providers>
      </div>
  );
}

export default BlogLayout;