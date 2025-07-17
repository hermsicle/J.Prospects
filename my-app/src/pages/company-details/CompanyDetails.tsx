import React, { Children, useState } from 'react';
import { Box, Heading, Flex, Button, IconButton, Tabs } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { LuFolder, LuUser } from 'react-icons/lu';
import ProspectsTab from '@/features/prospects-tab/ProspectsTab';
import FilesTab from '@/features/files-tab/FilesTab';
import { useColorModeValue } from '@/components/ui/color-mode';

const CompanyDetails = () => {
  const [currentTab, setCurrentTab] = useState('prospects');
  const navigate = useNavigate();

  const goBack = () => navigate('/companies');
  const params = useParams();

  const companyTabs = [
    {
      value: 'prospects',
      header: 'Prospects',
      icon: <LuUser />,
    },
    {
      value: 'files',
      header: 'Company Information',
      icon: <LuFolder />,
    },
  ];

  return (
    <Box>
      <Flex alignItems="center" justifyContent={'space-between'}>
        <Heading d="flex" alignItems={'center'}>
          <IconButton onClick={goBack} variant="ghost" color="blue.500">
            <IoIosArrowBack />
          </IconButton>
          {params.id}
        </Heading>
      </Flex>

      <Tabs.Root
        value={currentTab}
        onValueChange={(e: any) => setCurrentTab(e.value)}
      >
        <Tabs.List>
          {Children.toArray(
            companyTabs.map((tab) => {
              return (
                <Tabs.Trigger value={tab.value} key={tab.value}>
                  {tab.icon}
                  {tab.header}
                </Tabs.Trigger>
              );
            })
          )}
        </Tabs.List>

        <Tabs.Content
          value={'prospects'}
          // bg={useColorModeValue('white', '')}
          px={3}
          pb={3}
        >
          <Box>
            <ProspectsTab />
          </Box>
        </Tabs.Content>

        <Tabs.Content
          value={'files'}
          // bg={useColorModeValue('white', '')}
          px={3}
          pb={3}
        >
          <FilesTab />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default CompanyDetails;
