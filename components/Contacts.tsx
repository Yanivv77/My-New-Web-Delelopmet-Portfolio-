import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import data, { Contact } from "@/data/contacts";
import SectionWrapper from "./SectionWrapper";


const Contacts: React.FC = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-wrap items-center gap-5">
        {data.map((contact: Contact) => (
          <Link
            href={contact.link}
            key={contact.id}
            target={contact.name === "cv" ? "_self" : "_blank"}
            className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 hover:text-black hover:dark:text-white"
          >
            {contact.name === "github" && (
              <FaGithub size={18} className="text-black dark:text-white" />
            )}
            {contact.name === "linkedin" && (
              <FaLinkedin
                size={18}
                className="text-[#0a66c2] dark:text-white"
              />
            )}
            {contact.name === "email" && (
              <MdEmail size={18} className="text-black dark:text-white" />
            )}
            {contact.name === "cv" && (
              <FaRegUserCircle
                size={18}
                className="text-black dark:text-white"
              />
            )}
            <span className="text-sm md:text-base text-zinc-700 dark:text-white font-bold">
              {contact.label}
            </span>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Contacts;
