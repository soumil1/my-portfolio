"use client";
import {
  Box, Container, VStack, Text, Input, Textarea, Button, FormControl, FormLabel, useToast, useColorModeValue, Icon, HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "./Heading";
import { useState, useRef } from "react";
import { FiMail, FiSend, FiChevronRight } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("purple.600", "purple.300");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("purple.500", "purple.300");
  const buttonTextColor = useColorModeValue("white", "gray.900");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
        toast({
            title: "Incomplete Form",
            description: "Please fill out all the fields.",
            status: "warning",
            duration: 4000,
            isClosable: true,
        });
        return;
    }
    setIsLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. I will get back to you soon.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setFormData({ name: "", email: "", message: "" });
          setIsFormVisible(false);
        },
        (error) => {
          console.log(error.text);
          toast({
            title: "An error occurred.",
            description: "Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const containerVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.6, ease: "easeInOut"},
    },
  };

  return (
    <Box as="section" id="contact" py={{ base: 20, md: 28 }}>
      <Container maxW="4xl">
        <Heading>
          <span style={{ color: headingColor }}>Have an Idea?</span> Let&apos;s Connect
        </Heading>

        <MotionBox
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          mt={12}
          bg={cardBg}
          borderRadius="2xl"
          boxShadow="xl"
          border="1px solid"
          borderColor={borderColor}
          p={{ base: 6, md: 10 }}
          overflow="hidden"
          position="relative"
          minH={{ base: "auto", md: "550px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AnimatePresence mode="wait">
            {!isFormVisible ? (
              <MotionBox
                key="invitation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                textAlign="center"
                w="full"
              >
                <VStack spacing={6}>
                  <MotionBox
                    onClick={() => setIsFormVisible(true)}
                    cursor="pointer"
                    whileHover="hover"
                    initial="initial"
                    animate="initial"
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
                    }}
                  >
                    <Icon as={FiMail} boxSize={{ base: 24, md: 32 }} color={accentColor} />
                  </MotionBox>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    An Invitation to Connect
                  </Text>
                  <Text fontSize="lg" color={textColor} maxW="md" mx="auto">
                    I&apos;m always open to discussing new projects, creative ideas or career opportunities
                  </Text>
                  <MotionButton
                    onClick={() => setIsFormVisible(true)}
                    size="lg"
                    colorScheme="purple"
                    variant="solid"
                    rightIcon={<FiChevronRight />}
                    whileHover={{ scale: 1.05, boxShadow: "lg" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Write a Message
                  </MotionButton>
                </VStack>
              </MotionBox>
            ) : (
              <MotionBox
                key="form"
                w="full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <VStack as="form" ref={form} spacing={5} onSubmit={handleSubmit} w="full">
                  <FormControl isRequired>
                    <FormLabel>Your Name</FormLabel>
                    <Input
                      name="name"
                      placeholder="Test"
                      value={formData.name}
                      onChange={handleInputChange}
                      size="lg"
                      focusBorderColor="purple.500"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Your Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      placeholder="test.demo@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      size="lg"
                      focusBorderColor="purple.500"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      name="message"
                      placeholder="I am passionate about Frontend and Data Analysis..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      size="lg"
                      focusBorderColor="purple.500"
                    />
                  </FormControl>
                  <HStack w="full" justify="space-between">
                    <Button variant="ghost" onClick={() => setIsFormVisible(false)}>
                      Cancel
                    </Button>
                    <MotionButton
                      type="submit"
                      bg={accentColor}
                      color={buttonTextColor}
                      size="lg"
                      isLoading={isLoading}
                      rightIcon={<FiSend />}
                      whileHover={{ scale: 1.05, boxShadow: "lg" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      Send Message
                    </MotionButton>
                  </HStack>
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionBox>
      </Container>
    </Box>
  );
}
