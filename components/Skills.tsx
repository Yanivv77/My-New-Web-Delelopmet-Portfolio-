import React from 'react';
import Heading from './Heading';
import SectionWrapper from './SectionWrapper';
import data, { Skill } from '@/data/skills';
import SkillComponent from './SkillComponent';

const Skills: React.FC = () => {
  // Calculate the number of spacers needed to fill the last row completely if it's not full
  const itemsPerRow = 10; // Desired number of items per row
  const numberOfSpacers = data.length % itemsPerRow === 0 ? 0 : itemsPerRow - (data.length % itemsPerRow);

  return (
    <SectionWrapper>
      <Heading>Skills</Heading>
      <div className="flex flex-wrap items-stretch gap-5">
        {data.map((skill: Skill) => (
          <div key={skill.id} className="flex-grow">
            <SkillComponent skill={skill} />
          </div>
        ))}
        {/* Generate invisible divs to fill the remaining space in the last row if necessary */}
        {Array.from({ length: numberOfSpacers }, (_, index) => (
          <div className="flex-grow invisible" key={`spacer-${index}`}></div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
