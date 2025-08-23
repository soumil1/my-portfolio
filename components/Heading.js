"use client";
import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Heading({ children, subtitle }) {
  const titleColor = useColorModeValue("#1e293b", "#ffffff");
  const subtitleColor = useColorModeValue("#475569", "#94a3b8");

  return (
    <VStack spacing={4} textAlign="center" mb={12}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: 0.1,
        }}
      >
        <Text
          as="h2"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="800"
          color={titleColor}
          lineHeight="1.2"
        >
          {children}
        </Text>
      </MotionBox>

      {subtitle && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
          maxW="2xl"
        >
           <Text
            fontSize={{ base: "md", md: "lg" }}
            color={subtitleColor}
            lineHeight="1.6"
            fontWeight="500"
           >
            {subtitle}
           </Text>
        </MotionBox>
      )}
    </VStack>
  );
}