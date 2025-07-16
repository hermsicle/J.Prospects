import React, { Children } from 'react';

import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router';

import Home from '@/pages/home/Home';
import Companies from '@/pages/companies/Companies';
import Settings from '@/pages/settings/Settings';
import CompanyDetails from '@/pages/company-details/CompanyDetails';
import Resumes from '@/pages/resumes/Resumes';
import LandingPage from '@/pages/landing/Landing';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';

export const AuthWrapper = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const logoUrl = '/logo192.png'; // replace with your logo path or URL
  const { authStatus } = useAuthenticator((context) => [context.user]);

  if (authStatus === 'authenticated') {
    return <Navigate to="/home" />;
  }

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack
        gap={6}
        // w="full"
        // maxW="md"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        rounded="xl"
        p={8}
      >
        {/* Logo */}
        {/* <Image
          src={logoUrl}
          alt="J.Prospects Logo"
          boxSize="80px"
          objectFit="contain"
        /> */}

        {/* Company Name */}
        <Heading as="h1" size="xl" fontWeight="extrabold">
          J.Prospects
        </Heading>

        {/* Authenticator Component */}
        <Box w="full">
          <Authenticator signUpAttributes={['email']} />
        </Box>

        {/* Back to Landing */}
        <Button colorScheme="blue" onClick={() => navigate('/')}>
          &larr; Back to Landing Page
        </Button>
      </VStack>
    </Box>
  );
};

export const appRoutesProtected = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/companies',
    element: <Companies />,
  },
  {
    path: '/company/:id',
    element: <CompanyDetails />,
  },
  {
    path: '/resumes',
    element: <Resumes />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
];

export const appRoutesNotProtected = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthWrapper />,
  },
];
