import React from 'react';
import { Box, Heading, Flex, SimpleGrid } from '@chakra-ui/react';

import KpiCard from '@/components/kpi-card/KpiCard';
import { FiUsers } from 'react-icons/fi';

const Home = () => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent={'space-between'}>
        <Heading>Home</Heading>
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} gap={6} mt="3">
        <KpiCard header="Total Companies" data="5" icon={<FiUsers />} />
        <KpiCard header="Total Prospects" data="25" icon={<FiUsers />} />
      </SimpleGrid>
    </Box>
  );
};

export default Home;
