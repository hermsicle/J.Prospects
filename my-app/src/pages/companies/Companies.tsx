import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  Card,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import { AppTable } from '@/components/table/AppTable';
import AddCompanyModal from '@/features/add-company-modal/AddCompanyModal';
import DeleteModal from '@/components/modal/DeleteModal';
/*
Company Features:
Table to list all companies
Button to add company of interest
*/

const columns = [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'prospects',
    header: 'Prospects',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'url',
    header: 'Website URL',
    cell: ({ row }: any) => {
      return (
        <Box display="flex" flexDirection="column" gap={1}>
          <Link
            href={row.original.url}
            target="__blank"
            color="blue.500"
            textDecoration={'underline'}
          >
            {row.original.url}
          </Link>
        </Box>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    enableSorting: false,
  },
];

const data = [
  {
    companyName: 'Google',
    prospects: '3',
    description: '',
    url: 'google.com',
  },
  { companyName: 'Meta', prospects: '5', description: '', url: '' },
  {
    companyName: 'WealthFront',
    prospects: '12',
    description: '',
    url: '',
  },
  { companyName: 'Apple', prospects: '1', description: '', url: '' },
  {
    companyName: 'Miracle',
    prospects: '1',
    description: `
    Unify your clinical trial systems into one automated dashboard.
    `,
    url: 'https://www.miracleml.com/',
  },
];

const Companies = () => {
  const { open, onOpen, setOpen } = useDisclosure();
  const {
    open: deleteOpen,
    onOpen: onDeleteOpen,
    setOpen: setDeleteOpen,
  } = useDisclosure();

  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const toggleDelete = (company: any) => {
    console.log('Delete company', company);
    setSelectedCompany(company);
    setDeleteOpen(true);
  };

  const toggleEdit = (company: any) => {
    console.log('Edit company', company);
    setSelectedCompany(company);
    setOpen(true);
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent={'space-between'} mb={3}>
        <Heading>Companies</Heading>
        <Button size="sm" onClick={onOpen}>
          Add company
        </Button>
      </Flex>
      <Card.Root>
        <Card.Body>
          <AppTable
            columns={columns}
            rawData={data}
            handleDelete={toggleDelete}
            handleEdit={toggleEdit}
          />
        </Card.Body>
      </Card.Root>

      {open && (
        <AddCompanyModal
          open={open}
          setOpen={setOpen}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />
      )}
      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          title={`Delete ${selectedCompany?.companyName}`}
          handleDelete={() => {}}
        />
      )}
    </Box>
  );
};

export default Companies;
