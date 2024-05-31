import React from "react";
import Heading from "./Heading";
import SectionWrapper from "./SectionWrapper";
import data, { Skill } from "@/data/skills";
import SkillComponent from "./SkillComponent";

const Skills: React.FC = () => {
  const numberOfSpacers = data.length % 10 === 0 ? 0 : 10 - (data.length % 2);

  return (
    <SectionWrapper>
      <Heading >skills</Heading>
      <div className="flex flex-wrap items-stretch gap-5">
        {data.map((skill: Skill) => (
          <div  key={skill.id}>
            <SkillComponent skill={skill} />
          </div>
        ))}
        {Array.from({ length: numberOfSpacers }, (_, index) => (
          <div className="flex-grow invisible" key={`spacer-${index}`}></div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
