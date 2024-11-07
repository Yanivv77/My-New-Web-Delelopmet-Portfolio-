import { useState, useEffect } from 'react';
import { projects } from "@/data/projects";
import { PinContainer } from "./ui/Pin";
import Image from "next/image";
import Link from "next/link";

const RecentProjects = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  
  }, []);

  const renderIconList = (iconLists: string[]) => {
    return iconLists.map((icon, index) => (
      <div
        key={index}
        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
        style={{ transform: `translateX(-${5 * index + 2}px)` }}
      >
        <Image
          src={icon}
          alt={`icon${index}`}
          className="p-2 object-contain"
          loading="lazy"
          fill
        />
      </div>
    ));
  };

  return (
    <div className="pb-20">
      <div className="parent-container relative z-[999]">
        <h1 className="heading text-white" id="projects">
          A small selection of <span className="text-purple">recent projects</span>
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-16 mt-10">
        {projects.map((item) => (
          <a
            key={item.id}
             className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
           
              <PinContainer title={item.title}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[25vh] lg:h-[30vh] mb-10 group">
                  <div
                    className="relative w-full h-full overflow-hidden rounded-2xl lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <Image
                      src="/bg.png"
                      alt="bgimg"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                      fill
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <Image
                    src={item.img}
                    alt="cover"
                    width={500}
                    height={300}
                    className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      sm:hover:scale-110 hover:scale-105 transition-all duration-500 ease-out
                      sm:group-hover:-translate-y-[45%] group-hover:-translate-y-[48%] group-hover:rotate-2
                      hover:drop-shadow-[0_35px_35px_rgba(123,97,255,0.25)]"
                    style={{
                      maxWidth: '85%',
                      filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.4))'
                    }}
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{ color: "#BEC1DD", margin: "1vh 0" }}
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {renderIconList(item.iconLists)}
                  </div>

                  {isClient && (
                    <a
                      href={item?.githubLink || "#"}
                      className="flex lg:text-lg md:text-2xs text-2xs text-purple hover:underline cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                  )}
                </div>
              </PinContainer>
          
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
