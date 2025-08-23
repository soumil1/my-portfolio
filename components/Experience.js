"use client";
import {
  Box, Text, Container, VStack, HStack, Badge, useColorModeValue, Flex
} from "@chakra-ui/react";
import { motion, useScroll, useSpring } from "framer-motion";
import Heading from "./Heading";
import { experienceData } from "@/data/experience";
import { useRef } from "react";

const MotionBox = motion(Box);

const sortedExperience = experienceData.sort((a, b) => new Date(b.date) - new Date(a.date));

function ExperienceCard({ experience, index }) {
  const isOdd = index % 2 !== 0;
  const cardBg = useColorModeValue("#ffffff", "#1e293b");
  const borderColor = useColorModeValue("#e2e8f0", "#334155");
  const titleColor = useColorModeValue("#1e293b", "#f8fafc");
  const textColor = useColorModeValue("#475569", "#94a3b8");
  const companyColor = useColorModeValue("#0d9488", "#5eead4"); 
  const badgeBg = useColorModeValue("#ccfbf1", "#134e4a"); 
  const badgeColor = useColorModeValue("#0f766e", "#99f6e4"); 

  const cardVariants = {
    hidden: { opacity: 0, x: isOdd ? 100 : -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 60, damping: 12, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Flex
      direction={{ base: 'column', md: isOdd ? 'row-reverse' : 'row' }}
      align="center"
      justify="center"
      mb={8}
      w="full"
    >
      <MotionBox
        flex={{ md: 1 }}
        w="full"
        bg={cardBg}
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="lg"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        position="relative"
        whileHover={{ scale: 1.03, boxShadow: "xl" }}
        transition={{ type: "spring", stiffness: 300 }}
        _before={{
          content: '""', position: 'absolute', top: '28px', [isOdd ? 'left' : 'right']: '-10px',
          w: '0', h: '0', borderTop: '10px solid transparent', borderBottom: '10px solid transparent',
          [isOdd ? 'borderRight' : 'borderLeft']: `10px solid ${borderColor}`,
          display: { base: 'none', md: 'block' }
        }}
        _after={{
          content: '""', position: 'absolute', top: '29px', [isOdd ? 'left' : 'right']: '-8px',
          w: '0', h: '0', borderTop: '9px solid transparent', borderBottom: '9px solid transparent',
          [isOdd ? 'borderRight' : 'borderLeft']: `9px solid ${cardBg}`,
          display: { base: 'none', md: 'block' }
        }}
      >
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between" align="flex-start">
            <VStack as={motion.div} variants={itemVariants} align="stretch" spacing={1}>
              <Text fontSize="xl" fontWeight="800" color={titleColor}>{experience.title}</Text>
              <Text fontSize="md" fontWeight="600" color={companyColor}>{experience.company}</Text>
            </VStack>
            <motion.div variants={itemVariants}>
              <Badge bg={badgeBg} color={badgeColor} fontSize="xs" px={3} py={1} borderRadius="full" variant="subtle">
                {experience.duration}
              </Badge>
            </motion.div>
          </HStack>
          <motion.div variants={itemVariants}>
            <Text color={textColor} fontSize="sm">{experience.description}</Text>
          </motion.div>
          <HStack as={motion.div} variants={itemVariants} flexWrap="wrap" spacing={2} pt={2}>
            {experience.technologies?.map((tech) => (
              <Badge key={tech} variant="outline" colorScheme="gray">{tech}</Badge>
            ))}
          </HStack>
        </VStack>
      </MotionBox>
      <Box w={{ base: '0', md: '50px' }} h={{ base: '50px', md: '0' }} mx={4} />
      <Box flex={{ md: 1 }} display={{ base: 'none', md: 'block' }} />
    </Flex>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
  });
  const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
  });

  const headingSubtitleColor = useColorModeValue("#000000"); 
  const timelineLineBg = useColorModeValue("#e2e8f0", "#334155"); 
  const timelineDotBg = useColorModeValue("#14b8a6", "#99f6e4"); 
  const dotBorder = useColorModeValue('#ffffff', '#1e293b'); 

  return (
    <Box as="section" id="experience" py={{ base: 20, md: 28 }}>
      <Container maxW="5xl">
        <Heading>
          <span style={{ color: headingSubtitleColor }}>My Professional Journey</span> 
        </Heading>
        <Box ref={ref} position="relative" mt={12}>
          <MotionBox
            position="absolute" left="50%" top="0" bottom="0" w="3px" bg={timelineLineBg}
            transform="translateX(-1.5px)"
            style={{ scaleY }}
            transformOrigin="top"
            display={{ base: 'none', md: 'block' }}
          />
          <VStack spacing={0}>
            {sortedExperience.map((experience, index) => (
              <Box key={experience.id} w="full" position="relative">
                <MotionBox
                  position="absolute" top="30px" left="50%" w="18px" h="18px"
                  bg={timelineDotBg} borderRadius="full" border="4px solid" borderColor={dotBorder}
                  transform="translateX(-9px)" zIndex="1" display={{ base: 'none', md: 'block' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />
                <ExperienceCard experience={experience} index={index} />
              </Box>
            ))}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
