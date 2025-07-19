import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { useColorModeValue } from '../ui/color-mode';

interface KpiCardProps {
  header: string;
  data: string | number;
  icon: any;
  color?: any;
  children?: React.ReactNode;
}

const KpiCard = ({
  header,
  data,
  icon,
  color = null,
  children,
}: KpiCardProps) => {
  const bg = useColorModeValue('white', 'gray.800');

  if (children) {
    return (
      <Box
        p={3}
        bg={color ?? bg}
        boxShadow="sm"
        // minW="200px"
        cursor="pointer"
        _hover={{ boxShadow: 'md' }}
        transition="all 0.2s"
      >
        <Flex
          // align="center"
          mb={0}
          justify={{
            base: 'space-between',
            //
            '2xl': 'space-around',
          }}
          flexDirection={{
            base: 'row',
            //
            '2xl': 'column-reverse',
          }}
          alignItems={{
            base: 'flex-start',
            //
            '2xl': 'center',
          }}
          // border="1px solid black"
          minH={{
            base: '40px',
            //
            '2xl': '80px',
          }}
        >
          <Text
            fontSize="sm"
            color={useColorModeValue('gray.800', 'gray.700')}
            fontWeight="medium"
            textAlign="center"
          >
            {header}
          </Text>
          <Icon
            as={icon.type}
            boxSize={6}
            color={useColorModeValue('gray.800', 'gray.700')}
            display={{ base: 'none', md: 'block' }}
          />
        </Flex>
        {children}
      </Box>
    );
  }

  return (
    <Box
      p={3}
      bg={color ?? bg}
      boxShadow="sm"
      // minW="200px"
      cursor="pointer"
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
    >
      <Flex
        // align="center"
        mb={0}
        justify={{
          base: 'space-between',
          //
          '2xl': 'space-evenly',
        }}
        flexDirection={{
          base: 'row',
          //
          '2xl': 'column-reverse',
        }}
        alignItems={{
          base: 'flex-start',
          //
          '2xl': 'center',
        }}
        // border="1px solid black"
        minH={{
          base: '40px',
          //
          '2xl': '80px',
        }}
      >
        <Text
          fontSize="sm"
          color={useColorModeValue('gray.800', 'gray.700')}
          fontWeight="medium"
          textAlign="center"
        >
          {header}
        </Text>
        <Icon
          as={icon.type}
          boxSize={6}
          color={useColorModeValue('gray.800', 'gray.700')}
          display={{ base: 'none', md: 'block' }}
        />
      </Flex>

      <Box
        // border="1px solid black"
        display="flex"
        alignItems={{
          base: 'flex-start',
          //
          '2xl': 'center',
        }}
        justifyContent={{
          base: 'flex-start',
          '2xl': 'center',
        }}
      >
        <Text
          fontSize={{
            base: '2xl',
            md: '3xl',
            //
            '2xl': '4xl',
          }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.700')}
        >
          {data}
        </Text>
      </Box>
    </Box>
  );
};

export default KpiCard;
