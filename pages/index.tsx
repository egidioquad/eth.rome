import React, { useState } from 'react';
import {
  Flex,
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Center,
  Grid,
  Image as ChakraImage,
} from '@chakra-ui/react';
import { SearchIcon} from '@chakra-ui/icons';
import Link from 'next/link';
import {Header} from '../components/Header';
import {PromoSection} from '../components/PromoSection';
import {PinkSection} from '../components/PinkSection';
import {FourGrid} from '../components/FourGrid';
import ThreeStages from '../components/ThreeStages';
import { JoinUsSection } from '../components/JoinUsSection';
import { FAQSection } from '../components/FaqSection';
import {EmailsSection} from '../components/EmailSection';

const HomePage = () => {
  return (
    <>
   <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Header />
      <PromoSection />
      <PinkSection />
      <FourGrid />
      <ThreeStages />
      <JoinUsSection />
      <FAQSection />
      <EmailsSection />
      </Flex>
    </>
  );
};

export default HomePage;
