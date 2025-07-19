import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import { FiUsers, FiClipboard, FiActivity } from 'react-icons/fi';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useNavigate } from 'react-router-dom';

import PreviewImage from '@/assets/j-prospects.png';

const Feature = ({
  icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) => (
  <Stack
    align="center"
    gap={4}
    textAlign="center"
    p={5}
    borderRadius="md"
    boxShadow="md"
  >
    <Icon as={icon} boxSize={10} color="blue.400" />
    <Heading fontSize="xl">{title}</Heading>
    <Text color="gray.600">{text}</Text>
  </Stack>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const goToAuth = () => navigate('/auth');

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={20}>
      <Container maxW="container.lg" margin="0 auto">
        {/* Hero Section */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          mb={20}
          gap={10}
        >
          <VStack align="start" gap={6} maxW={{ base: '100%', md: '50%', lg: '30%' }}>
            <Heading
              as="h1"
              size="2xl"
              fontWeight="extrabold"
              lineHeight="shorter"
            >
              J.Prospects
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Track your job prospects seamlessly. Manage applications,
              interviews, and offers—all in one place.
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              fontWeight="bold"
              _hover={{ bg: 'blue.600' }}
              onClick={goToAuth}
            >
              Get Started
            </Button>
          </VStack>
          <Box
            flex="1"
            bg="blue.400"
            borderRadius="xl"
            // height="400px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
            fontSize="3xl"
            userSelect="none"
          >
            <img
              src={PreviewImage}
              style={{
                height: '100%',
              }}
            />
          </Box>
        </Flex>

        {/* Features Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <Feature
            icon={FiUsers}
            title="All Your Prospects"
            text="Manage every job application in one organized dashboard."
          />
          <Feature
            icon={FiClipboard}
            title="Track Your Progress"
            text="Stay on top of applications, interviews, and offers effortlessly."
          />
          <Feature
            icon={FiActivity}
            title="Insights & Analytics"
            text="Gain insights into your job search pipeline and improve outcomes."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default LandingPage;
