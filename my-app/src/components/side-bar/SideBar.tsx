'use client';

import React from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  // useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Portal,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiFile,
} from 'react-icons/fi';
import { PiSignOut } from 'react-icons/pi';

import type { IconType } from 'react-icons';
import { BsBuildings } from 'react-icons/bs';

import {
  ColorModeButton,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue,
} from '@/components/ui/color-mode';
import { Link } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

interface LinkItemProps {
  name: string;
  path: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', path: '/home', icon: FiHome },
  { name: 'Companies', path: '/companies', icon: BsBuildings },
  { name: 'Resumes', path: '/resumes', icon: FiFile },
  { name: 'Settings', path: '/settings', icon: FiCompass },
];

const SideBar = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Default SideBar */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '280px', // customize width
          boxShadow: 'lg',
          // background: colorMode === 'light' ? 'white' : 'blue.900', // or use chakra tokens if using ChakraTheme
          zIndex: 1000,
        }}
      />

      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </>
  );
};

const handleSignOut = async () => {
  await signOut();
};

const SidebarContent = ({ onClose, ...rest }: any) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.300', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      shadow="sm"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          J.Prospects
          {/* Short for Job Prospects */}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Box
        flexDirection={'column'}
        display="flex"
        justifyContent={'space-between'}
        h="90%"
      >
        <Box>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} path={link.path}>
              {link.name}
            </NavItem>
          ))}
        </Box>

        <Box onClick={handleSignOut}>
          <NavItem icon={PiSignOut} path={'/'}>
            Sign Out
          </NavItem>
        </Box>
      </Box>
    </Box>
  );
};

interface NavItemProps {
  icon: IconType;
  path: string;
  children: any;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <Link
      to={path}
      style={{ textDecoration: 'none' }}
      // _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: any) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        // icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

export default SideBar;
