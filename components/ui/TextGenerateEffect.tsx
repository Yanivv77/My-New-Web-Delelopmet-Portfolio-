"use client";
import { useEffect, useMemo } from "react";
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
  const wordsArray = useMemo(() => words.split(" "), [words]);

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      transition: { duration: 2, delay: i * 0.2 },
    }));
  }, [words, controls]);

  const renderWords = () => (
    <motion.div initial={{ opacity: 0 }} animate={controls}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={idx} 
          className={`${idx > 3 ? "text-purple" : "text-white"}`}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
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
