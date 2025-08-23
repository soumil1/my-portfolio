import { ColorModeScript } from '@chakra-ui/react';
import Providers from '../components/Providers';
import './globals.scss';

export const metadata = {
  title: 'Soumil Singh — Portfolio',
  description: 'Software & Data Analysis - Projects, skills and experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode="dark" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}