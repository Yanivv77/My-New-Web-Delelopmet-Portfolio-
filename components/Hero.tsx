import React, { lazy, Suspense } from 'react';
import { FaLocationArrow } from "react-icons/fa6";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
const MagicButton = lazy(() => import("./ui/MagicButton"));
import Skills from "./Skills";
import Contacts from "./Contacts";
import About from './About';

const Hero = () => {
  return (
    <div className="pt-36" id="about">
      <Suspense fallback={<div></div>}>
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="darkblue"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="teal" />
        </div>
        <div
          className="h-screen w-full bg-black-100 bg-grid-white/[0.03] 
           absolute top-0 left-0 flex items-center justify-center"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100
             [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        <div className="flex justify-center relative mb-5 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <TextGenerateEffect
              words="Hello. I'm Yaniv,
              a FullStack Developer"
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
            />

            <Contacts />
            <About />
            <Skills />
           

          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Hero;
