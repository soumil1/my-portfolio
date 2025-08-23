"use client"; 

import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      bg: props.colorMode === "dark" ? "#0f172a" : "#ffffff", 
      color: props.colorMode === "dark" ? "#e2e8f0" : "#1e293b", 
      lineHeight: "1.7",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
  }),
};

const colors = {
  brand: { 
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "lg",
      fontWeight: "600",
      transition: "all 0.2s ease-in-out",
    },
    variants: {
      solid: () => ({
        bg: 'brand.600',
        color: 'white',
        _hover: {
          bg: 'brand.500',
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
      }),
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  colors,
  components,
});

export default theme;