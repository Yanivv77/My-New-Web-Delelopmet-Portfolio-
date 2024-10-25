import React, { useState } from 'react';
import Heading from './Heading';
import SectionWrapper from './SectionWrapper';
import data, { Skill } from '@/data/skills';
import SkillComponent from './SkillComponent';
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa6';

const Skills: React.FC = () => {
  // State to manage the visibility of all skills
  const [showAll, setShowAll] = useState(false);
  
  const itemsPerRow = 10; // Desired number of items per row
  const initialDisplayCount = 7; // Number of skills to display initially
  
  // Determine which skills to display based on the state
  const displayedSkills = showAll ? data : data.slice(0, initialDisplayCount);
  
  // Calculate the number of spacers needed for the current display
  const numberOfSpacers =
    displayedSkills.length % itemsPerRow === 0
      ? 0
      : itemsPerRow - (displayedSkills.length % itemsPerRow);

  // Handler to toggle the visibility of all skills
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <SectionWrapper>
      <Heading>Skills</Heading>
      {/* Container for Skills Grid */}
      <div className="flex flex-wrap items-stretch gap-5">
        {displayedSkills.map((skill: Skill) => (
          <div key={skill.id} className="flex-grow">
            <SkillComponent skill={skill} />
          </div>
        ))}
        {/* Generate invisible divs to fill the remaining space in the last row if necessary */}
        {Array.from({ length: numberOfSpacers }, (_, index) => (
          <div className="flex-grow invisible" key={`spacer-${index}`}></div>
        ))}
        {data.length > initialDisplayCount && (
        <div className="">
          <MagicButton
            title={showAll ? 'Less' : 'More'}
            icon={<FaLocationArrow />}
            position="right"
            handleClick={toggleShowAll}
            otherClasses="w-28 mt-0"
          />
        </div>
      )}
      </div>
      {/* MagicButton aligned to the bottom left */}
      
    </SectionWrapper>
  );
};

export default Skills;
