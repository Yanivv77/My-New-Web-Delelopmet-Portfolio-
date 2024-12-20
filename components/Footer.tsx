import { useEffect, useState } from 'react';
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";

const getLinkedInURL = () => {
  const userAgent = navigator.userAgent;
  if (/android|ipad|iphone|ipod/i.test(userAgent)) {
    return "https://www.linkedin.com/in/yanivv77";  // Profile link for mobile
  } else {
    return "https://www.linkedin.com/messaging/thread/new?recipient=yanivv77";  // Messaging link for others
  }
};

const Footer = () => {
  const [linkedInURL, setLinkedInURL] = useState("");

  useEffect(() => {
    setLinkedInURL(getLinkedInURL());
  }, []);

  return (
    <footer 
      className="w-full pt-20 pb-10 relative scroll-mt-[100px]"
      id="contact"
    >
      <div className="absolute left-0 -bottom-72 w-full min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="Grid pattern"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-50"
          priority={false}
          quality={75} 
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw] text-white">
          Looking for a Software developer?{" "}
          <span className="text-purple">Let&apos;s connect!</span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href={linkedInURL}>
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex flex-col-reverse mt-16 md:flex-row md:justify-between md:items-center md:mt-6">
        <p className="md:text-base text-sm md:font-normal font-light text-center md:text-left mb-6 md:mb-0 text-white">
          Copyright © 2024 Yaniv Bialik
        </p>
        <div className="flex items-center md:gap-3 gap-6 justify-center md:justify-start mb-6 md:mb-0">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image src={info.img} alt={info.link} width={20} height={20} priority={false} quality={75} />
          
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
