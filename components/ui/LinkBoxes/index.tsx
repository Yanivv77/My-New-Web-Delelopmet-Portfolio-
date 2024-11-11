import { useState } from 'react';
import { Modal } from './Modal';
import { MyLinksModal } from './modals/MyLinksModal';
import { ServicesModal } from './modals/ServicesModal';
import { PngToSvgModal } from './modals/PngToSvgModal';
import { ImageToWebpModal } from './modals/ImageToWebpModal';

interface LinkBox {
  text: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

const links: LinkBox[] = [
  { text: 'My Links', content: <MyLinksModal /> },
  // { text: 'Services I Use', content: <ServicesModal /> },
  { text: 'PNG to SVG', content: <PngToSvgModal /> },
  { text: 'Image to WEBP', content: <ImageToWebpModal /> }
];

function LinkGrid({ links, onSelectLink }: { links: LinkBox[], onSelectLink: (link: LinkBox) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => onSelectLink(link)}
          className="group flex flex-col items-center justify-center h-28 w-28 rounded-lg 
                   hover:bg-black-200/80 transition-all duration-500 ease-out
                   border border-white/5 hover:border-white/20
                   backdrop-blur-sm hover:scale-105
                   hover:shadow-lg hover:shadow-white/10"
        >
          <div className="flex flex-col items-center space-y-1.5">
            {link.icon}
            <span className="font-light tracking-wide text-white text-sm 
                         group-hover:text-white transition-colors duration-300">
              {link.text}
            </span>
          </div>
          
          {/* Arrow icon */}
          <svg 
            className="absolute bottom-2 w-4 h-4 text-white/50 
                     group-hover:text-white group-hover:translate-y-0.5 
                     transition-all duration-300"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}

export function LinkBoxes() {
  const [selectedLink, setSelectedLink] = useState<LinkBox | null>(null);

  return (
    <div className="w-full flex justify-center">
      <section className="relative w-full max-w-4xl px-4 sm:px-6 py-6 
                    border border-white/5 rounded-2xl 
                    bg-midnight-glass backdrop-blur-lg
                    shadow-[0_0_50px_-12px] shadow-white/10
                    hover:shadow-[0_0_50px_-6px] hover:shadow-white/20
                    transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-50 blur-2xl" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-white/90 text-2xl font-extralight tracking-wide">
              My Tools
            </h2>
          </div>

          <LinkGrid 
            links={links}
            onSelectLink={setSelectedLink}
          />

          <Modal
            isOpen={selectedLink !== null}
            onClose={() => setSelectedLink(null)}
            title={selectedLink?.text || ''}
          >
            {selectedLink?.content}
          </Modal>
        </div>
      </section>
    </div>
  );
} 