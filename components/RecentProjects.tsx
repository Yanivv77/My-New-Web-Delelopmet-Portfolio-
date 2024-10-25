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
    <div className="py-20">
      <div className="parent-container relative z-[999]">
        <h1 className="heading text-white" id="projects">
          A small selection of <span className="text-purple">recent projects</span>
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-16 mt-10">
        {projects.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="lg:min-h-[32.5rem] flex items-center justify-center sm:w-96 w-[80vw] text-white">
              <PinContainer title={item.title}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl flex items-center justify-center"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <Image 
                      src="/bg.png" 
                      alt="bgimg" 
                      fill 
                      loading="lazy" 
                      className="object-cover"
                    />
                  </div>
                  <Image
                    src={item.img}
                    alt="cover"
                    className="z-10 absolute bottom-0 pt-5 pb-5 object-cover"
                    fill
                    loading="lazy"
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
                    <Link href={item?.githubLink || "#"} className="flex lg:text-lg md:text-2xs text-2xs text-purple hover:underline cursor-pointer">
                      Github
                    </Link>
                  )}
                </div>
              </PinContainer>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
