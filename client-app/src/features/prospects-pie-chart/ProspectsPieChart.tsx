import { Box, Flex, Text, Icon } from '@chakra-ui/react';

import { Chart, useChart } from '@chakra-ui/charts';
import { Cell, Pie, PieChart, Legend } from 'recharts';
import { useColorModeValue } from '@/components/ui/color-mode';

import { FiPieChart } from 'react-icons/fi';

const ProspectsPieChart = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');

  const chart = useChart({
    data: [
      { name: 'windows', value: 400, color: 'blue.solid' },
      { name: 'mac', value: 300, color: 'orange.solid' },
      { name: 'linux', value: 300, color: 'pink.solid' },
      { name: 'other', value: 200, color: 'green.solid' },
    ],
  });

  return (
    <Box
      p={6}
      bg={bg}
      boxShadow="sm"
      border="1px solid"
      borderColor={border}
      // minW="200px"
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
      display="flex"
      flexDirection={'column'}
      alignItems="center"
      // justifyContent={'center'}
      mb="3"
      // height="400px"
      // minWidth="375px"
      width="100%"
      height="300px"
    >
      <Flex align="center" justify="space-between" mb={3} w="100%">
        <Text fontSize="md" color="gray.500" fontWeight="medium">
          Metrics
        </Text>
        <Icon as={FiPieChart} boxSize={6} color="blue.400" />
      </Flex>
      <Chart.Root
        // boxSize="300px"
        chart={chart}
      >
        <PieChart>
          {/* <Legend content={<Chart.Legend />}  /> */}

          <Pie
            isAnimationActive={false}
            data={chart.data}
            dataKey={chart.key('value')}
            outerRadius={100}
            innerRadius={0}
            labelLine={false}
            label={({ name, index }) => {
              const { value } = chart.data[index ?? -1];
              const percent = value / chart.getTotal('value');
              return `${name}: ${(percent * 100).toFixed(1)}%`;
            }}
          >
            {chart.data.map((item) => {
              return <Cell key={item.name} fill={chart.color(item.color)} />;
            })}
          </Pie>
        </PieChart>
      </Chart.Root>
    </Box>
  );
};

export default ProspectsPieChart;
