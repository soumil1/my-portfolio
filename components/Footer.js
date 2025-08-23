"use client";
import {
  Box, Container, Text, HStack, VStack, Link, useColorModeValue
} from "@chakra-ui/react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Icon } from '@iconify/react';
import React, { useRef } from "react";

const SOCIAL_LINKS = [
  { name: "GitHub", icon: "skill-icons:github-dark", href: "https://github.com/soumil1" },
  { name: "LinkedIn", icon: "simple-icons:linkedin", href: "https://www.linkedin.com/in/soumilsingh21" },
  { name: "LeetCode", icon: "cib:leetcode", href: "https://leetcode.com/Soum221/" },
  { name: "GeeksforGeeks", icon: "simple-icons:geeksforgeeks", href: "https://auth.geeksforgeeks.org/user/soumilsingh1" },
  { name: "CodeChef", icon: "simple-icons:codechef", href: "https://www.codechef.com/users/soumil11" },
];

const MagneticIcon = ({ name, icon, href }) => {
  const ref = useRef(null);
  const iconBg = useColorModeValue("white", "#1e293b");
  const iconColor = useColorModeValue("#1e293b", "white");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * width * 0.4);
    y.set(yPct * height * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      transition={{ type: 'spring' }}
    >
      <Link
        href={href}
        target="_blank"
        aria-label={name}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="12"
        h="12"
        bg={iconBg}
        borderRadius="full"
        boxShadow="lg"
        transition="all 0.3s ease"
        _hover={{ 
          transform: 'scale(1.15)', 
          boxShadow: "xl",
          borderColor: useColorModeValue("#0d9488", "#5eead4"),
          borderWidth: "2px"
        }}
      >
        <Icon icon={icon} fontSize="24px" color={iconColor} />
      </Link>
    </motion.div>
  );
};

export default function Footer() {
  const footerBg = useColorModeValue("#f1f5f9", "#0f172a");
  const textColor = useColorModeValue("#475569", "#94a3b8");
  const spotlightColor = useColorModeValue("rgba(79, 70, 229, 0.2)", "rgba(129, 140, 248, 0.15)");
  const titleColor = useColorModeValue("#0f172a", "white");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const maskImage = useMotionTemplate`radial-gradient(300px at ${smoothMouseX}px ${smoothMouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <Box as="footer" bg={footerBg} position="relative" onMouseMove={handleMouseMove}>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${smoothMouseX}px ${smoothMouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />

      <Container maxW="7xl" py={{ base: 10, md: 16 }}>
        <VStack spacing={8}>
          <VStack spacing={3} textAlign="center" position="relative">
            <motion.div style={style}>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                color={titleColor}
                transition="color 0.5s ease"
              >
                Committed to Learning and Contributions
              </Text>
            </motion.div>
            <Text color={textColor} maxW="lg">
              I am passionate about solving problems.
            </Text>
          </VStack>

          <HStack spacing={5} justify="center" flexWrap="wrap">
            {SOCIAL_LINKS.map((social) => (
              <MagneticIcon key={social.name} {...social} />
            ))}
          </HStack>
          <Text fontSize="sm" color={textColor} pt={6}>
            © {new Date().getFullYear()} Soumil Singh. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
