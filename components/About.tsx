import Heading from "./Heading";
import data from "../data/about";
import SectionWrapper from "./SectionWrapper";
import Image from 'next/image';

const About = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-2/3">
          <Heading>about</Heading>
          
          <h1 className="mt-3 text-base md:text-xl font-semibold  text-zinc-100">
            {data.bio}
          </h1>
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0 md:ml-6 flex justify-center">
          <Image
            src="/about.jpg"
            alt="Portfolio"
            width={200}
            height={200}
            className="rounded-full object-cover border-4 border-cyan-500"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};
export default About;
