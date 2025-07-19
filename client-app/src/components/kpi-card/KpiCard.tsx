import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';

interface KpiCardProps {
  header: string;
  data: string | number;
  icon: any;
}

const KpiCard = ({ header, data, icon }: KpiCardProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const border = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={6}
      bg={bg}
      boxShadow="sm"
      minW="200px"
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
    >
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="md" color="gray.500" fontWeight="medium">
          {header}
        </Text>
        <Icon
          as={icon.type}
          boxSize={6}
          color="blue.400"
          display={{ base: 'none', md: 'block' }}
        />
      </Flex>
      <Text fontSize="2xl" fontWeight="bold">
        {data}
      </Text>
    </Box>
  );
};

export default KpiCard;
