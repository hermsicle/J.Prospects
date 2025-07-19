import React from 'react';
import { Box, Heading, Flex, Button, IconButton, Tabs } from '@chakra-ui/react';
import { AppTable } from '@/components/table/AppTable';

const FilesTab = () => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent={'space-between'}>
        <Heading d="flex" alignItems={'center'} size="md">
          Files
        </Heading>
        <Button size="sm">Add file</Button>
      </Flex>

      <FilesTable />
    </Box>
  );
};

const FilesTable = () => {
  const columns = [
    {
      accessorKey: 'personOfContact',
      header: 'Person Of Contact',
    },
    {
      accessorKey: 'url',
      header: 'LinkedIn URL or Email',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'positionOfInterest',
      header: 'Role',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
    },
  ];
  return <AppTable columns={columns} rawData={[]} />;
};

export default FilesTab;
