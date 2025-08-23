"use client";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import profilePic from "../public/images/profile.jpg"; 

const MotionBox = motion(Box);

export default function ProfileImage() {
  const borderColor = useColorModeValue("#ffffff", "#1e293b");
  const shadowColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)");

  return (
    <MotionBox
      position="relative"
      w={{ base: "280px", md: "320px" }}
      h={{ base: "280px", md: "320px" }}
      mx="auto"
    >
      <MotionBox
        position="relative"
        w="full"
        h="full"
        borderRadius="full"
        overflow="hidden"
        border="6px solid"
        borderColor={borderColor}
        boxShadow={`0 20px 40px ${shadowColor}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 12,
          delay: 0.2,
        }}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <MotionBox
          w="full"
          h="full"
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={profilePic}
            alt="Soumil Singh - Full Stack Developer"
            fill
            priority
            sizes="(max-width: 768px) 280px, 320px"
            style={{
              objectFit: "cover",
              borderRadius: "50%",
            }}
            placeholder="blur"
          />
        </MotionBox>
      </MotionBox>
    </MotionBox>
  );
}