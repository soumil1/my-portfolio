"use client";

import {
  Box, Container, SimpleGrid, Text, useColorModeValue, HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
import Heading from "./Heading";

const MotionBox = motion(Box);

const skillIconMap = {
    'React': 'skill-icons:react-dark',
    'Next.js': 'skill-icons:nextjs-dark',
    'JavaScript': 'skill-icons:javascript',
    'HTML': 'skill-icons:html',
    'CSS': 'skill-icons:css',
    'SCSS': 'skill-icons:sass',
    'Tailwind CSS': 'skill-icons:tailwindcss-dark',
    'Node.js': 'skill-icons:nodejs-dark',
    'Express.js': 'skill-icons:expressjs-dark',
    'Python': 'skill-icons:python-dark',
    'MongoDB': 'skill-icons:mongodb',
    'PostgreSQL': 'skill-icons:postgresql-dark',
    'SQL': 'vscode-icons:file-type-sql',
    'Git/GitHub': 'skill-icons:github-dark',
    'Postman': 'skill-icons:postman',
    'C++': 'skill-icons:cpp',
    'C': 'skill-icons:c',
    'Microsoft Excel': 'vscode-icons:file-type-excel2',
    'Microsoft Power BI': 'logos:microsoft-power-bi',
    'REST APIs': 'eos-icons:api-outlined',
    'SAP ERP': 'logos:sap',
    'SAP ABAP': 'logos:sap',
    'AWS': 'skill-icons:aws-dark',
    'Salesforce': 'logos:salesforce',
    'Microsoft Office': 'logos:microsoft-icon' 
};

const SKILL_CATEGORIES = [
    { title: "Programming Languages", skills: ["C++", "C", "Python", "JavaScript", "SAP ABAP"], },
    { title: "Frontend Development", skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "SCSS"], },
    { title: "Backend Development", skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "SQL", "REST APIs"], },
    { title: "Data Analysis & Tools", skills: ["Microsoft Power BI", "Microsoft Excel", "Microsoft Office", "SAP ERP", "AWS", "Salesforce", "Git/GitHub", "Postman"], }, 
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

function SkillCard({ skillName }) {
  const cardBg = useColorModeValue("#ffffff", "#1e293b");
  const textColor = useColorModeValue("#334155", "#cbd5e1");
  const borderColor = useColorModeValue("#e2e8f0", "#334155");
  const iconString = skillIconMap[skillName];

  return (
    <MotionBox
      variants={skillVariants}
      whileHover={{ y: -5, boxShadow: "xl" }}
      bg={cardBg}
      p={4}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.2s ease-in-out"
      cursor="pointer"
    >
      <HStack spacing={4} align="center">
        <Icon icon={iconString} fontSize="32px" />
        <Text fontWeight="600" color={textColor} fontSize="md">
          {skillName}
        </Text>
      </HStack>
    </MotionBox>
  );
}

export default function Skills() {
  const sectionBg = useColorModeValue('#f8fafc', '#0f172a');
  const cardBg = useColorModeValue("#ffffff", "#1e293b");
  const titleColor = useColorModeValue("#1e293b", "#ffffff");
  const borderColor = useColorModeValue("#f1f5f9", "#334155");
  const headingSubtitleColor = useColorModeValue("brand.600", "brand.400");

  return (
    <Box as="section" id="skills" bg={sectionBg} py={{ base: 20, md: 28 }}>
      <Container maxW="7xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionBox variants={categoryVariants} textAlign="center">
            <Heading>
              <span style={{ color: headingSubtitleColor }}>My Skills</span>
            </Heading>
          </MotionBox>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mt={12}>
            {SKILL_CATEGORIES.map((category) => (
              <MotionBox
                key={category.title}
                variants={categoryVariants}
                bg={cardBg}
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                boxShadow="xl"
                border="1px solid"
                borderColor={borderColor}
              >
                <Text
                  fontSize="2xl"
                  fontWeight="800"
                  color={titleColor}
                  mb={6}
                >
                  {category.title}
                </Text>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={4}>
                  {category.skills.map((skill) => (
                    <SkillCard key={skill} skillName={skill} />
                  ))}
                </SimpleGrid>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}
