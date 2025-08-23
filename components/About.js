"use client";
import {
  Box,
  Text,
  Container,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Heading from "./Heading";
import { aboutData } from "@/data/about";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function About() {
  const cardBg = useColorModeValue("#ffffff", "#1e293b");
  const textColor = useColorModeValue("#475569", "#94a3b8");
  const borderColor = useColorModeValue("#e2e8f0", "#475569");

  return (
    <Box as="section" id="about" py={{ base: 20, md: 28 }}>
      <Container maxW="7xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionBox variants={itemVariants}>
            <Heading>About Me</Heading>
          </MotionBox>

          <VStack>
            <MotionBox
              variants={itemVariants}
              w="full"
              maxW="4xl"
              mx="auto"
            >
              <Box
                bg={cardBg}
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                boxShadow="xl"
                border="1px solid"
                borderColor={borderColor}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  h="4px"
                  bg="brand.500"
                />

                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.8"
                  color={textColor}
                  textAlign="center"
                  position="relative"
                  zIndex="1"
                >
                  {aboutData.bio}
                </Text>
              </Box>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
}