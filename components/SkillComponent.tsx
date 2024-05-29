import Image from "next/image";
import { Skill } from "@/data/skills";

interface SkillComponentProps {
  skill: Skill;
}

const SkillComponent: React.FC<SkillComponentProps> = ({ skill }) => {
  return (
    <div className="flex items-center space-x-2 bg-zinc-800 px-3 py-2">
      <div className="relative w-[25px] h-[25px]">
    <Image src={''} overrideSrc={skill.image} className="object-cover w-full h-full" alt={`${skill.name} logo`} />
      </div>
      <span className="text-white capitalize text-sm md:text-base font-bold">
        {skill.name}
      </span>
    </div>
  );
};

export default SkillComponent;