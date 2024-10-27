import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return (
    <section className=" py-7 border-zinc-800">
      {children}
    </section>
  );
};

export default SectionWrapper;