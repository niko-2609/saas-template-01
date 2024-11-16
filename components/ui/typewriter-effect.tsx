"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  staticText = "Plan your perfect journey,",
  dynamicWords = ["with power of AI", "one click away"],
  className,
  cursorClassName,
}: {
  staticText: string;
  dynamicWords: string[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = dynamicWords[currentWordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
        }
      }, 50); // speed of deleting
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        if (displayedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
        }
      }, 100); // speed of typing
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, dynamicWords, currentWordIndex]);

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-4xl min-h-[50px] flex flex-col items-center font-bold text-center gap-2",
        className
      )}
    >
      <span className="flex">{staticText}&nbsp;</span>
      <div className="flex items-center">
      <span className="inline-block">{displayedText}&nbsp;</span>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{  repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
      </div>
    </div>
  );
};