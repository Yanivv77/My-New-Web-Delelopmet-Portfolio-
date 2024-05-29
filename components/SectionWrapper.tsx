import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return (
    <section className="border-t py-7 border-zinc-800">
      {children}
    </section>
  );
};

export default SectionWrapper;