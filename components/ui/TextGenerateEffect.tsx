"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const controls = useAnimation();
  const wordsArray = words.split(" ");

  useEffect(() => {
    controls.start((i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, delay: i * 0.15 },
    }));
  }, [words, controls]);

  const renderWords = () => (
    <div>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={idx}
          custom={idx}
          initial={{ y: 20, opacity: 0 }}
          animate={controls}
          className={`${idx > 3 ? "text-purple" : "text-white"}`}
        >
          {word}{" "}
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="text-white leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
