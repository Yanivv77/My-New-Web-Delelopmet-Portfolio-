'use client';

import Translator from "@/components/Translator";
import UrlShortener from "@/components/UrlShortener";

export default function ExtraTools() {
  return (
    <section className="py-16" id="tools">
      {/* Using CSS Grid for equal height columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="h-full">
          <Translator />
        </div>
        <div className="h-full flex">
          <div className="flex-1">
            <UrlShortener />
          </div>
        </div>
      </div>
    </section>
  );
} 