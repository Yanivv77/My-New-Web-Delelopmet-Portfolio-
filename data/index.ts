import exp from "constants";

// todo link to blog
export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
  { name: "Blog", link: "/blog" },
  
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


export const socialMedia = [
  {
    id: 1,
    img: "/github.svg",
    link: "https://github.com/Yanivv77/"
  },
  {
    id: 3,
    img: "/linkedin.svg",
    link: "http://linkedin.com/in/yanivv77"
  },
];