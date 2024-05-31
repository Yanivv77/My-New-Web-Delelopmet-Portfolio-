import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogFooter } from "@/components/BlogFooter";
import { Providers } from "@/components/providers";

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
          "min-h-screen bg-background dark:bg-red-100 font-sans antialiased","flex flex-col min-h-screen",
    inter.variable
  )}
>
        <Providers
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    <div className="relative flex flex-col flex-1 min-h-dvh f bg-background dark:bg-red-100 ">
      <BlogHeader />
      <main className="flex-1 dark:bg-grid-black/[0.08] bg-grid-small-black/[0.1]">{children}</main>
      <BlogFooter />
    </div>
        </Providers>
</div>
  );
}

export default BlogLayout;