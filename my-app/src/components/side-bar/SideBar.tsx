import React, { useEffect } from 'react';
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
  useMediaQuery,
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
import { Link, useLocation, useParams } from 'react-router-dom';

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
  const [isLargerThan768] = useMediaQuery(['(min-width: 768px)']);

  useEffect(() => {
    if (isLargerThan768 && open) {
      onClose();
    }
  }, [isLargerThan768]);

  return (
    <>
      {/* Default SideBar */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />

      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      {/* Sidebar mobilenav open */}

      <Drawer.Root open={open} onOpenChange={onClose} placement="start">
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Body p="0">
                <SidebarContent
                  onClose={onClose}
                  display={{ base: 'block', md: 'none' }}
                />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

const handleSignOut = async () => {
  await signOut();
};

const SidebarContent = ({ onClose, open, ...rest }: any) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      w={{ base: 350, md: 250 }}
      pos="fixed"
      h="full"
      // shadow="sm"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
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
          <NavItem icon={PiSignOut} path={'/auth'}>
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
  const location = useLocation();

  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        px="4"
        py="2"
        mx="2"
        my="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          color: useColorModeValue('blue.500', 'gray.800'),
          background: useColorModeValue('blue.100', 'gray.800'),
        }}
        fontWeight={'500'}
        color={
          location.pathname.startsWith(path)
            ? useColorModeValue('blue.500', 'gray.800')
            : ''
        }
        backgroundColor={
          location.pathname.startsWith(path)
            ? useColorModeValue('blue.100', 'gray.800')
            : ''
        }
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
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu">
        <FiMenu />
      </IconButton>

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        J. Prospects
      </Text>
    </Flex>
  );
};

export default SideBar;
