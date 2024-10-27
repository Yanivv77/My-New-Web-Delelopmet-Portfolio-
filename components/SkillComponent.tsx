import Image from "next/image";
import { Skill } from "@/data/skills";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

interface SkillComponentProps {
  skill: Skill;
}

const SkillComponent: React.FC<SkillComponentProps> = ({ skill }) => {
  return (
    <>
    <HoverBorderGradient
      >
    <div className="flex items-center space-x-2 bg-zinc-800 px-3 py-2">
      <div className="relative w-[25px] h-[25px]">
    <Image src={''} overrideSrc={skill.image} className="object-cover w-full h-full" alt={`${skill.name} logo`} priority={false} quality={75} />
      </div>
      
      <span className=" capitalize text-sm md:text-base font-bold">
        {skill.name}
      </span>
      
    </div>
    </HoverBorderGradient>
    </>
  );
};

export default SkillComponent;