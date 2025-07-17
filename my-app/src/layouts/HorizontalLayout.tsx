import React from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Box } from '@chakra-ui/react';
import SideBar from '@/components/side-bar/SideBar';

import NavBar from '../components/nav-bar/NavBar';

const HorizontalLayout = ({ children }: any) => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* SideBar */}
      <SideBar />

      {/* Main  Content Routes */}
      <Box ml={{ base: 0, md: 250 }}>
        <NavBar />
      </Box>
      <Box
        ml={{ base: 0, md: 250 }}
        p="4"
        // border="1px solid black"
        // height="calc(100vh - 70px)"
      >
        {children}
      </Box>
    </Box>
  );
};

export default HorizontalLayout;
