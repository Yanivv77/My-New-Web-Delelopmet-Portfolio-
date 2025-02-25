"use client";
import { navItems } from "@/data";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Grid from "@/components/ui/Grid";
import RecentProjects from "@/components/RecentProjects";
import Footer from "@/components/Footer";
import WorkAndEducation from "@/components/WorkAndEducation";
import Games from "@/components/ui/Games";
import { LinkBoxes } from "@/components/ui/LinkBoxes/index";
import Translator from "@/components/Translator";

if (process?.env?.NEXT_PUBLIC_NODE_ENV === 'production' || process?.env?.NODE_ENV === 'production') {
  console.warn = () => {};
  console.error = () => {};
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.trace = () => {};
}

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <LinkBoxes />
        <Translator />
        <WorkAndEducation />
        <Grid />
        <Games />
        <RecentProjects />
        <Footer />
      </div>
    </main>
  );
};

export default Home;