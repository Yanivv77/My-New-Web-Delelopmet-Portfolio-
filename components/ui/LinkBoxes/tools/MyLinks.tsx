export function MyLinksModal() {
  const linkCategories = {
    "Dev News": [
      { name: "Dev.to", url: "https://dev.to", description: "Developer community and articles" },
      { name: "Hacker News", url: "https://news.ycombinator.com", description: "Tech news and discussions" },
      { name: "Daily.dev", url: "https://daily.dev/", description: "Daily developer news and articles" },
    ],
    "UI": [
      { name: "Dribbble", url: "https://dribbble.com", description: "Design inspiration and resources" },
      { name: "Shadcn UI", url: "https://ui.shadcn.com", description: "UI components for React" },
      { name: "Shadcn Extension", url: "https://shadcn-extension.vercel.app", description: "Extension for Shadcn UI" },
      { name: "Next UI", url: "https://nextui.org/", description: "Beautiful, fast, and modern React UI library" },
      { name: "Tremor", url: "https://www.tremor.so/components", description: "Components for building dashboards" },
      { name: "Radix UI", url: "https://www.radix-ui.com/", description: "Unstyled, accessible components for React" },
      { name: "Headless UI", url: "https://headlessui.dev/", description: "Completely unstyled, fully accessible UI components" },
      { name: "Framer Motion", url: "https://www.framer.com/motion/", description: "Animation library for React" },
      { name: "Locofy", url: "https://locofy.ai", description: "Design and import to Figma" },
      { name: "Uiverse", url: "https://uiverse.io", description: "A platform for UI components and design resources" },
      { name: "Sketchfab", url: "https://sketchfab.com/", description: "3D model sharing platform" },
    ],
    "Backend": [
      { name: "Neon", url: "https://neon.tech", description: "Serverless Postgres for developers" },
      { name: "Supabase", url: "https://supabase.com", description: "Open-source Firebase alternative" },
      { name: "Firebase", url: "https://firebase.google.com/", description: "Platform for building mobile and web applications" },
      { name: "Mocky", url: "https://designer.mocky.io", description: "API mocking tool for developers" },
      { name: "Velite", url: "https://velite.dev", description: "A lightweight framework for building web applications" },
    ],
    "AI": [
      { name: "Uizard", url: "https://uizard.io/", description: "AI-powered design tool" },
      { name: "v0", url: "https://v0.com", description: "A platform for version control and collaboration" }, 
      { name: "Bolt", url: "https://bolt.new", description: "A platform for building and sharing web applications" }, 
      { name: "Phind", url: "https://www.phind.com", description: "Idea to product" }, 
      { name: "Codium AI", url: "https://www.codium.ai", description: "Suggests tests as you’re writing code" }, 
      { name: "Mintlify Writer", url: "https://www.mintlify.com", description: "Auto-generates docs" }, 
    ],
      "Other": [
        { name: "Readme.so", url: "https://readme.so", description: "Create beautiful README files" },
        { name: "Carbon", url: "https://carbon.now.sh", description: "Create and share beautiful images of your source code" },
        { name: "Favicon.io", url: "https://favicon.io", description: "Generate favicons and app icons" },
        { name: "DevDocs", url: "https://devdocs.io", description: "Documentation for developers" },
        { name: "QuickRef", url: "https://quickref.me", description: "Quick reference for programming languages and frameworks" },
      ],
  };

  return (
    <div className="text-white/80">
      
      <div className="space-y-6">
        {Object.entries(linkCategories).map(([category, links]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-xl font-semibold text-white">{category}</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-navy-700/50 border border-white/10 hover:bg-navy-600/50 transition-colors duration-300"
                >
                  <div className="font-medium">{link.name}</div>
                  <div className="text-sm text-white/60">{link.description}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">

      </div>
    </div>
  );
} 