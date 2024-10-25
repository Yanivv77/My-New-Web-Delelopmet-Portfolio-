import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h3 className="capitalize text-base md:text-lg text-zinc-400 relative z-index-10">
      {children}
    </h3>
  );
};

export default Heading;