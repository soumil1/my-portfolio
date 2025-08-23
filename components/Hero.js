"use client";
import {
  Box, Flex, Heading, Text, Button, VStack, HStack, useColorModeValue, Container, Link 
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import TypingEffect from "./TypingEffect";
import ProfileImage from "./ProfileImage";
import { headerData } from "@/data/header";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
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

export default function Hero() {
  const textColor = useColorModeValue("#475569", "#cbd5e1");
  const heroBg = useColorModeValue(
    "linear(to-b, #f8fafc, #f0fdfa)",
    "#0f172a"
  );
  const blobColor1 = useColorModeValue("brand.100", "brand.900");
  const blobColor2 = useColorModeValue("#e2e8f0", "#1e293b");
  const helloTextColor = useColorModeValue("#475569", "#cbd5e1");

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
         top: offsetPosition,
         behavior: 'smooth'
        });
    }
  };

  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      bg={heroBg}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="10%"
        right="5%"
        w={{ base: "150px", md: "300px" }}
        h={{ base: "150px", md: "300px" }}
        borderRadius="full"
        bg={blobColor1}
        opacity="0.5"
        filter="blur(80px)"
        animation="float 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="15%"
        left="5%"
        w={{ base: "100px", md: "200px" }}
        h={{ base: "100px", md: "200px" }}
        borderRadius="full"
        bg={blobColor2}
        opacity="0.4"
        filter="blur(60px)"
        animation="float 10s ease-in-out infinite reverse"
      />

      <Container maxW="7xl" py={{ base: 20, md: 28 }}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Flex
            align="center"
            justify="space-between"
            direction={{ base: "column-reverse", lg: "row" }}
            gap={{ base: 12, lg: 16 }}
          >
            <VStack
              align={{ base: "center", lg: "flex-start" }}
              spacing={6}
              flex="1"
              textAlign={{ base: "center", lg: "left" }}
            >
              <MotionBox variants={itemVariants}>
                <Text
                  fontSize="lg"
                  fontWeight="600"
                  color={helloTextColor}
                  mb={2}
                >
                  Hello, I&apos;m
                </Text>
                <Heading
                  as="h1"
                  size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="600"
                  lineHeight="1.1"
                  mb={6}
                >
                  {headerData.name}
                </Heading>
                <Box minH="4rem" fontSize={{ base: "xl", md: "2xl" }} color="brand.600">
                  <TypingEffect titles={headerData.titles} />
                </Box>
              </MotionBox>

              <MotionBox variants={itemVariants}>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color={textColor}
                  maxW="550px"
                  lineHeight="1.8"
                >
                  I am a Fullstack developer with a knack for building reliable applications. I am learning Data Analysis and Power BI to create smarter & data driven solutions 📊
                </Text>
              </MotionBox>

              <MotionBox variants={itemVariants}>
                <HStack spacing={4} justify={{ base: "center", lg: "flex-start" }}>
                  <MotionButton
                    as={Link}
                    href="/Resume.pdf"
                    download="Resume.pdf"
                    target="_blank"
                    _hover={{ textDecoration: 'none' }}
                    size="lg"
                    colorScheme="brand"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Resume
                  </MotionButton>
                  <MotionButton
                    size="lg"
                    variant="outline"
                    colorScheme="brand"
                    onClick={() => handleNavClick("contact")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Get In Touch
                  </MotionButton>
                </HStack>
              </MotionBox>
            </VStack>

            <MotionBox
              variants={itemVariants}
              flex="0 0 auto"
            >
              <ProfileImage />
            </MotionBox>
          </Flex>
        </MotionBox>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(10deg); }
        }
      `}</style>
    </Box>
  );
}
