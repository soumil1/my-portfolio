"use client";

import {
  Box, Container, Heading, SimpleGrid, Text, VStack, HStack, useColorModeValue, Tag, Center, Link, IconButton, Flex
} from "@chakra-ui/react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import NextImage from "next/image";
import { Icon } from "@iconify/react";
import { useRef } from "react";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const techIcons = {
  "React": "skill-icons:react-dark",
  "JavaScript": "skill-icons:javascript",
  "Framer Motion": "simple-icons:framer",
  "Next.js": "skill-icons:nextjs-dark",
  "Tailwind CSS": "skill-icons:tailwindcss-dark",
  "Chakra UI": "simple-icons:chakraui",
  "TMDB API": "simple-icons:themoviedatabase",
  "Node.js": "skill-icons:nodejs-dark",
  "SCSS": "skill-icons:sass",
  "CSS": "skill-icons:css",
  "HTML": "skill-icons:html",
  "Vercel": "skill-icons:vercel-dark",
  "Express.js": "skill-icons:expressjs-dark",
  "AWS": "skill-icons:aws-dark",
  "Python": "skill-icons:python-dark",
  "SQL": "vscode-icons:file-type-sql",
};

const PROJECTS = [
  {
    id: 1,
    title: "Sortify - Sorting Visualizer",
    description:
      "Built an interactive educational tool for visualizing six common sorting algorithms. Used React, SCSS and Framer Motion. It features real time animations and a suite of user controls to adjust animation speed and array size.",
    image: "/images/Sortify.png",
    technologies: ["React", "JavaScript", "Framer Motion", "SCSS", "CSS"],
    liveUrl: "https://sortifyvisualsorting.netlify.app/",
    githubUrl: "https://github.com/soumil1/Sortify-Algorithm-Visualizer",
  },
  {
    id: 2,
    title: "Netflix Clone",
    description:
      "Responsive frontend clone of Netflix. Built with JavaScript, CSS and HTML, this project replicates core functionalities like movie browsing by genre. It integrates with the TMDB API to fetch and display real-time movie trailers and posters.",
    image: "/images/Netflix.png",
    technologies: ["HTML", "JavaScript", "CSS", "TMDB API", "Vercel"],
    liveUrl: "https://moviehub-netflix.vercel.app/",
    githubUrl: "https://github.com/soumil1/Netflix",
  },
  {
    id: 3,
    title: "Weather Alert Automation System",
    description:
      "Developed during an internship this system features a Node.js and Express.js backend with REST APIs to process weather data from multiple sources. Used Python scripts for initial data extraction and prototyping the alert trigger mechanism. The responsive React.js dashboard allows users to view and manage weather alerts.",
    image: "/images/WeatherAlert.png",
    technologies: ["Node.js", "Express.js", "AWS", "React", "Python", "HTML", "CSS", "JavaScript", "SQL"],
  },
  {
    id: 4,
    title: "Personal Portfolio Website",
    description:
      "A personal portfolio designed to showcase my skills and projects. Built with Next.js for optimal performance and Chakra UI for a polished and modern design. Website features smooth and engaging animations using Framer Motion and includes a functional contact form integrated with EmailJS for seamless communication.",
    image: "/images/Portfolio.png",
    technologies: ["Next.js", "Chakra UI", "Framer Motion", "SCSS", "Tailwind CSS"],
    liveUrl: "/",
    githubUrl: "https://github.com/soumil1/my-portfolio",
  },
];

function ProjectCard({ project }) {
  const ref = useRef(null);
  const cardBg = useColorModeValue("#fff", "#000");
  const borderColor = useColorModeValue("#e2e8f0", "#334155");
  const textColor = useColorModeValue("#475569", "#94a3b8");
  const titleColor = useColorModeValue("#1e293b", "#fff");
  const imageBg = useColorModeValue("#f8fafc", "#1e293b");

  const x = useMotionValue(0), y = useMotionValue(0);
  const spring = { stiffness: 100, damping: 15 };
  const imageX = useSpring(useTransform(x, [-100, 100], [-10, 10]), spring);
  const imageY = useSpring(useTransform(y, [-100, 100], [-10, 10]), spring);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <MotionBox
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.03, boxShadow: "var(--chakra-shadows-xl)" }}
      bg={cardBg} border="1px solid" borderColor={borderColor}
      borderRadius="2xl" boxShadow="lg" overflow="hidden"
      h="500px" display="flex" flexDirection="column"
    >
      <Box w="full" h="220px" position="relative" bg={imageBg} flexShrink={0}>
        <MotionBox style={{ x: imageX, y: imageY }} w="full" h="full">
          <NextImage
            src={project.image} alt={project.title}
            layout="fill" objectFit="contain"
          />
        </MotionBox>
      </Box>

      <VStack p={5} spacing={3} align="start" flex="1" justify="space-between">
        <Flex justify="space-between" w="full">
          <Heading as="h3" size="md" color={titleColor}>{project.title}</Heading>
          <HStack>
            {project.githubUrl && (
              <IconButton as={Link} href={project.githubUrl} target="_blank"
                aria-label="GitHub" icon={<Icon icon="skill-icons:github-dark" />}
                variant="ghost" size="sm" />
            )}
            {project.liveUrl && (
              <IconButton as={Link} href={project.liveUrl} target="_blank"
                aria-label="Live Demo" icon={<Icon icon="ci:external-link" />}
                variant="ghost" size="sm" />
            )}
          </HStack>
        </Flex>
        <Text color={textColor} fontSize="sm" noOfLines={4}>{project.description}</Text>
        <HStack spacing={2} wrap="wrap">
          {project.technologies.map((tech) => (
            <Tag key={tech} size="sm" variant="subtle" colorScheme="teal">
              {techIcons[tech] && <Icon icon={techIcons[tech]} style={{ marginRight: 4 }} />}
              {tech}
            </Tag>
          ))}
        </HStack>
      </VStack>
    </MotionBox>
  );
}

export default function Projects() {
  const headingColor = useColorModeValue("#000", "#fff");
  const sectionBg = useColorModeValue("#f1f5f9", "#0f172a");
  const textColor = useColorModeValue("#475569", "#94a3b8");
  const boxBg = useColorModeValue("#fff", "#1e293b");
  const boxBorder = useColorModeValue("#e2e8f0", "#334155");
  const gearIconColor = useColorModeValue("#1e293b", "#f8fafc");

  return (
    <Box as="section" id="projects" bg={sectionBg} py={{ base: 20, md: 28 }}>
      <Container maxW="6xl">
        <Text as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" textAlign="center" mb={12} color={headingColor}>
          My Recent Work
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
        </SimpleGrid>

        <Center mt={16}>
          <MotionVStack
            spacing={3} textAlign="center" p={6} bg={boxBg}
            borderRadius="2xl" border="1px dashed" borderColor={boxBorder}
            whileHover={{ scale: 1.03, boxShadow: "var(--chakra-shadows-xl)" }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Icon icon="ph:gear-six-duotone" fontSize="32px" color={gearIconColor} />
            </motion.div>
            <Heading as="h3" size="sm">More Projects Coming Soon!</Heading>
            <Text color={textColor} fontSize="sm">
              I am always working on new and exciting projects. Check back soon for more updates.
            </Text>
          </MotionVStack>
        </Center>
      </Container>
    </Box>
  );
}
