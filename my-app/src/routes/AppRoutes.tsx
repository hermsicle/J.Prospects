import React, { Children } from 'react';

import { Routes, Route, useNavigate, Navigate } from 'react-router';

import Home from '@/pages/home/Home';
import Companies from '@/pages/companies/Companies';
import Settings from '@/pages/settings/Settings';
import CompanyDetails from '@/pages/company-details/CompanyDetails';
import Resumes from '@/pages/resumes/Resumes';
import LandingPage from '@/pages/landing/Landing';
import { Authenticator } from '@aws-amplify/ui-react';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';

const appRoutesProtected = [
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

const AuthWrapper = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const logoUrl = '/logo192.png'; // replace with your logo path or URL

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

const appRoutesNotProtected = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthWrapper />,
  },
];

const AppRoutesProtected = () => {
  return (
    <Routes>
      {Children.toArray(
        appRoutesProtected.map((route) => {
          return <Route path={route.path} element={route.element} />;
        })
      )}

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

const AppRoutesNotProtected = () => {
  return (
    <Routes>
      {Children.toArray(
        appRoutesNotProtected.map((route) => {
          return <Route path={route.path} element={route.element} />;
        })
      )}
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppRoutesProtected, AppRoutesNotProtected };
