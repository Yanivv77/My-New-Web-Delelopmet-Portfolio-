export type ProjectType = {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  githubLink: string;
};

export const projects: ProjectType[] = [
  {
    id: 7,  
    title: "QuickBooks",
    des: "Very fast performance e-commerce site",
    img: "/project_images/quickSite.webp",  
    iconLists: ["/project_icons/next.svg","/project_icons/typescript.svg","project_icons/postgresql.svg","/project_icons/drizzleorm.png", "/project_icons/openai.svg"],  
    link: "https://quickbooks-tau.vercel.app",
    githubLink: "https://github.com/Yanivv77/QuickSite"
  },
  {
    id: 6,  
    title: "WittyPrices",
    des: "Amazon products price tracking and notification system with email alerts.",
    img: "/project_images/wittyprices.webp",  
    iconLists: ["/project_icons/next.svg", "/project_icons/typescript.svg", "/project_icons/mongodb.svg", "/project_icons/nodemailer.webp"],
    link: "https://wittyprices.vercel.app",  
    githubLink: "https://github.com/Yanivv77/WittyPrices"  
  },
  {
    id: 5,  
    title: "FormCraftAI",
    des: "Instantly create customizable forms with AI.",
    img: "/project_images/formcraftai.webp",  
    iconLists: ["/project_icons/next.svg","/project_icons/typescript.svg","project_icons/postgresql.svg","/project_icons/drizzleorm.png", "/project_icons/gemini.svg"],  
    link: "https://form-craft-ai-sooty.vercel.app/",
    githubLink: "https://github.com/Yanivv77/FormCraftAI"
  },
  {
    id: 4,  
    title: "Podniv",
    des: "SaaS platform that creates podcasts from text-to-speech with OpenAI.",
    img: "/project_images/podniv.webp",  
    iconLists: ["/project_icons/next.svg","/project_icons/typescript.svg","project_icons/convex.svg","/project_icons/clerck.webp", "/project_icons/openai.svg"],  
    link: "https://pod-niv.vercel.app/",
    githubLink: "https://github.com/Yanivv77/PodNiv"
  },
  {
    id: 3,
    title: "CryptoNiv",
    des: "Sending crypto in blockchain smart contract project",
    img: "/project_images/CryptoNiv.webp",
    iconLists: ["/project_icons/react.svg", "/project_icons/solidity.webp"],
    link: "https://yproject.online/",
    githubLink: "https://github.com/Yanivv77/Cryptoniv"
  },
  {
    id: 2,
    title: "MERN ProShop",
    des: "E-commerce platform built with the MERN stack.",
    img: "/project_images/Proshop.webp",
    iconLists: ["/project_icons/react.svg", "/project_icons/nodejs.svg","/project_icons/typescript.svg","/project_icons/mongodb.svg"],
    link: "https://github.com/Yanivv77/Mern-Stack-Ecommerce-Project",
    githubLink: "https://github.com/Yanivv77/Mern-Stack-Ecommerce-Project"
  },
  {
    id: 1,
    title: "Management-App-GraphQL",
    des: "Management application using GraphQL.",
    img: "/project_images/GraphQL.webp",
    iconLists: ["/project_icons/react.svg", "/project_icons/nodejs.svg","/project_icons/graphql_icon.svg","/project_icons/mongodb.svg"],
    link: "https://github.com/Yanivv77/Project-Management-App-GraphQL",
    githubLink: "https://github.com/Yanivv77/Project-Management-App-GraphQL"
  },
  
 
 
];