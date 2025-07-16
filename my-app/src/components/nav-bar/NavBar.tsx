import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { CiLight, CiDark } from 'react-icons/ci';

import { useColorMode } from '../ui/color-mode';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      p="4"
      pt="6"
      bg={useColorModeValue('white', '')}
      h="70px"
      shadow="sm"
    >
      <Box>
        <Heading size="sm">
          ✨ Track opportunities. Write smart. Powered by GenAI ✨
        </Heading>
      </Box>
      <Flex alignItems={'center'} gap={2}>
        <IconButton
          cursor="pointer"
          rounded="full"
          variant="ghost"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <CiLight /> : <CiDark />}
        </IconButton>
        <AvatarGroup>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
        </AvatarGroup>
      </Flex>
    </Flex>
  );
};

export default NavBar;
