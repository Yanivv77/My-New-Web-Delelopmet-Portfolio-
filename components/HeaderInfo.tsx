import { ReactNode } from 'react';

interface HeaderInfoProps {
  Icon: ReactNode;
  title: string;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ Icon, title }) => {
  return (
    <div className="flex items-center space-x-2">
      {Icon}
      <span className="capitalize text-sm md:text-base font-semibold text-zinc-400">
        {title}
      </span>
    </div>
  );
};

export default HeaderInfo;