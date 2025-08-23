"use client";
import { useDisclosure, useColorMode } from "@chakra-ui/react";
import {
  Box, Flex, HStack, IconButton, Button, Link, useColorModeValue
} from "@chakra-ui/react";
import NextLink from "next/link";
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const headerBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(15, 23, 42, 0.8)");
  const borderColor = useColorModeValue("#e2e8f0", "#334155");
  const linkColor = useColorModeValue("#475569", "#cbd5e1");
  const linkHoverColor = useColorModeValue("#0d9488", "#5eead4");
  const nameColor = useColorModeValue("#1e293b", "#ffffff");

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <MotionBox
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg={headerBg}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor={isScrolled ? borderColor : "transparent"}
      transition="all 0.3s ease-in-out"
      boxShadow={isScrolled ? "sm" : "none"}
    >
      <Flex maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={3} align="center" justify="space-between">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Link
            as={NextLink}
            href="/"
            fontSize="xl"
            fontWeight="800"
            color={nameColor}
            _hover={{ textDecoration: "none" }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Soumil Singh
          </Link>
        </motion.div>
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          {NAV_ITEMS.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link 
                href={item.isExternal ? item.href : undefined}
                onClick={!item.isExternal ? () => handleNavClick(item.id) : undefined}
                download={item.isExternal ? "Resume.pdf" : undefined}
                target={item.isExternal ? "_blank" : undefined}
                fontSize="sm" 
                fontWeight="600" 
                color={linkColor} 
                _hover={{ color: linkHoverColor, textDecoration: "none" }} 
                cursor="pointer" 
                transition="color 0.2s ease-in-out"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </HStack>
        <HStack spacing={2}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton aria-label="Toggle color mode" icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} variant="ghost" size="sm" />
          </motion.div>
          <Button
            size="sm"
            colorScheme="brand"
            display={{ base: "none", md: "inline-flex" }}
            onClick={() => handleNavClick("contact")}
          >
            Get In Touch
          </Button>
          <IconButton aria-label="Toggle menu" icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} onClick={onToggle} variant="ghost" size="sm" display={{ md: "none" }} />
        </HStack>
      </Flex>
    </MotionBox>
  );
}
