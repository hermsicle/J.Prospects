import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Flex,
  Text,
  Heading,
  Menu,
} from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';
import { CiLight, CiDark } from 'react-icons/ci';

import { useColorMode } from '../ui/color-mode';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ mobile = false }: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuthenticator((context) => [context.user]);

  const signedInUser = user && user.username ? user.username : '';
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();

    navigate('/');
  };

  if (mobile) {
    return (
      <Flex alignItems={'center'} gap={2}>
        <IconButton
          cursor="pointer"
          rounded="full"
          variant="ghost"
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <CiLight /> : <CiDark />}
        </IconButton>

        <Menu.Root>
          <Menu.Trigger asChild>
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image />
              </Avatar.Root>
            </AvatarGroup>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-txt-a">
                Signed in as {signedInUser}{' '}
                <Menu.ItemCommand></Menu.ItemCommand>
              </Menu.Item>
              <Menu.Item value="signout" onClick={handleSignOut}>
                Sign Out
                <Menu.ItemCommand></Menu.ItemCommand>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>
    );
  }

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      p="4"
      pt="6"
      bg={useColorModeValue('white', 'gray.800')}
      h="70px"
      display={{ sm: 'none', md: 'flex' }}
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

        <Menu.Root>
          <Menu.Trigger asChild>
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image />
              </Avatar.Root>
            </AvatarGroup>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-txt-a">
                Signed in as {signedInUser}{' '}
                <Menu.ItemCommand></Menu.ItemCommand>
              </Menu.Item>
              <Menu.Item value="signout" onClick={handleSignOut}>
                Sign Out
                <Menu.ItemCommand></Menu.ItemCommand>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>
    </Flex>
  );
};

export default NavBar;
