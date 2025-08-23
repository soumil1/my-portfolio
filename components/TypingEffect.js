"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function TypingEffect({
  titles = [],
  className = "",
}) {
  const [index, setIndex] = useState(0);
  
  const titleList = useMemo(() => (titles.length ? titles : ["Developer"]), [titles]);
  const textColor = useColorModeValue("brand.600", "brand.400");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titleList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [titleList.length]);

  const currentTitle = titleList[index];

  const containerVariants = {
    hidden: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.025, staggerDirection: 1 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, transition: { type: 'spring', damping: 12, stiffness: 200 } },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } },
  };

  return (
    <Box
      className={className}
      display="inline-flex"
      alignItems="center"
      minH="1.5em"
      fontSize={{ base: "xl", md: "2xl" }}
      fontWeight="800"
      color={textColor}
      overflow="hidden"
      verticalAlign="bottom"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTitle}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{ display: "inline-flex" }}
        >
          {currentTitle.split("").map((char, i) => (
            <motion.span key={i} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}