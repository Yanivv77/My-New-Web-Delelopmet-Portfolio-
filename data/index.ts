import exp from "constants";

// todo link to blog
export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
  
];


export const gridItems = [

  {
    id: 1,
    title: "Check out my Blog",
    description: "",
    className: "lg:col-span-3 md:col-span-3 md:row-span-3",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 2,
    title: "Contact me",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-3",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  }
];

export const blogItem = 
{
  id: 1,
  title: "Currently building a JS Animation library",
  description: "The Inside Scoop",
  className: "md:col-span-3 md:row-span-2",
  imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
  titleClassName: "justify-center md:justify-start lg:justify-center",
  img: "/b5.svg",
  spareImg: "/grid.svg",
}

export const projects = [
  {
    id: 1,
    title: "MERN ProShop",
    des: "E-commerce platform built with the MERN stack.",
    img: "./Proshop.PNG",
    iconLists: ["./react.svg", "./nodejs.svg","./typescript.svg","./mongodb.svg"],
    link: "https://github.com/Yanivv77/Mern-Stack-Ecommerce-Project",
  },
  {
    id: 2,
    title: "Management-App-GraphQL",
    des: "Management application using GraphQL.",
    img: "./GraphQL.PNG",
    iconLists: ["./react.svg", "./nodejs.svg","./graphql_icon.svg","./mongodb.svg"],
    link: "https://github.com/Yanivv77/Project-Management-App-GraphQL",
  },
  {
    id: 3,
    title: "World Trivia Battle",
    des: "Location-based trivia battle online game.",
    img: "./TriviaBattle.PNG",
    iconLists: ["./react.svg", "./nodejs.svg","./socket-io.svg","./mongodb.svg"],
    link: "https://github.com/Yanivv77/Location-based-trivia-battle-game",
  },
  {
    id: 4,
    title: "Microservices Blog",
    des: "Blog application built with microservices architecture.",
    img: "./Microservices-Blog.PNG",
    iconLists: ["./react.svg", "./nodejs.svg","./docker.svg","./mongodb.svg"],
    link: "https://github.com/Yanivv77/Microservices-Blog",
  },
  {
    id: 5,
    title: "NextJs & Strapi Events App",
    des: "Events application built with Next.js and Strapi.",
    img: "./Events.PNG",
    iconLists: ["./next.svg", "./strapi.svg","./mongodb.svg"],
    link: "https://github.com/Yanivv77/My-events-app-frontend",
  },
  {
    id: 6,
    title: "MERN GoalsApp",
    des: "Goals tracking application built with the MERN stack.",
    img: "./YanivsGoalsApp.PNG",
    iconLists: ["./react.svg", "./nodejs.svg","./mongodb.svg"],
    link: "https://github.com/Yanivv77/Mern-Project",
  },
  {
    id: 8,
    title: "React FeedbackApp",
    des: "Feedback application built with React.",
    img: "./Feedback.PNG",
    iconLists: ["./react.svg",],
    link: "https://github.com/Yanivv77/React-feedback-app",
  },
  {
    id: 9,
    title: "React SimpleBlog",
    des: "Simple blog application built with React.",
    img: "./SimpleBlog.PNG",
    iconLists: ["./react.svg"],
    link: "https://github.com/Yanivv77/Modern-React-Blog-Project",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/Yanivv77/"
  },
  {
    id: 3,
    img: "/link.svg",
    link: "http://linkedin.com/in/yanivv77"
  },
];