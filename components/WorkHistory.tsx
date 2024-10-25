import Image from "next/image";
import Heading from "./Heading";
import SectionWrapper from "./SectionWrapper";
import data from "../data/work";
import SkillComponent from "./SkillComponent";

const WorkHistory = () => {
  return (
    <SectionWrapper>
      <div className="mb-10">
        <Heading>Work History</Heading>
        {data.map((work) => (
          <div className="mt-6 flex gap-x-8 relative z-index-10" key={work.id}>
            <div className="relative w-[50px] h-[50px] rounded-full overflow-hidden border dark:border-zinc-700">
              <Image
                src={work.image}
                fill
                className="w-full h-full object-cover"
                alt={`${work.company} Logo`}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-black dark:text-white capitalize font-bold text-base">
                {work.role}
              </h2>
              <span className="capitalize text-sm font-bold text-zinc-100">
                {work.company}
              </span>
              <div className="flex items-center gap-x-1">
                <span className="text-black dark:text-white capitalize text-sm font-bold mt-2">
                  {work.date}
                </span>
              </div>
              {work.skills && (
                <div className="flex gap-2 flex-wrap my-2">
                  {work.skills.map((skill, index) => (
                    <SkillComponent key={index} skill={skill} />
                  ))}
                </div>
              )}
              {work.options && (
                <div className="mt-2">
                  <ul className="list-disc pl-5 space-y-2">
                    {work.options.map((option: string, index: number) => (
                      <li
                        key={index}
                        className="text-zinc-900 text-base font-semibold dark:text-zinc-100"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
export default WorkHistory;
