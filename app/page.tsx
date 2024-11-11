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

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <LinkBoxes />
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