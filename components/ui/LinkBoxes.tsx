import { ArrowUpRight } from 'lucide-react';

interface LinkBox {
  text: string;
  href: string;
}

const links: LinkBox[] = [
  { text: 'Products', href: '/products' },
  { text: 'Services', href: '/services' },
  { text: 'About', href: '/about' },
  { text: 'Contact', href: '/contact' },
  { text: 'Blog', href: '/blog' },
];

export function LinkBoxes() {
  return (
    <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-lg mx-auto max-w-5xl">
      <h2 className="text-white/90 text-3xl font-extralight tracking-wide text-center mb-8">
        My Tools
      </h2>
      <div className="flex gap-6 justify-center items-center flex-wrap mx-auto">
        {links.map((link) => (
          <a
            key={link.text}
            href={link.href}
            className="group flex items-center justify-center w-28 h-28 rounded-2xl 
                     hover:bg-black-200/80 transition-all duration-500 ease-out
                     border border-white/5 hover:border-white/20
                     backdrop-blur-sm hover:scale-105
                     hover:shadow-lg hover:shadow-white/10"
          >
            <div className="relative flex flex-col items-center gap-2">
              <span className="font-light tracking-wide text-white text-sm 
                           group-hover:text-white transition-colors duration-300">
                {link.text}
              </span>
              <ArrowUpRight 
                className="w-4 h-4 text-white group-hover:text-white 
                         transition-all duration-500 transform 
                         group-hover:translate-x-1 group-hover:-translate-y-1
                         group-hover:scale-110" 
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}