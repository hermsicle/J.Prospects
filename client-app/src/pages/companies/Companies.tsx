import React, { useEffect, useState } from 'react';
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
import { deleteCompany, fetchCompanies, updateCompany } from '@/services/apis';
import { useMutation, useQuery } from '@tanstack/react-query';

const columns = [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'prospectCount',
    header: 'Prospects',
  },
  {
    accessorKey: 'companyDescription',
    header: 'Description',
  },
  // {
  //   accessorKey: 'url',
  //   header: 'Website URL',
  //   cell: ({ row }: any) => {
  //     return (
  //       <Box display="flex" flexDirection="column" gap={1}>
  //         <Link
  //           href={row.original.url}
  //           target="__blank"
  //           color="blue.500"
  //           textDecoration={'underline'}
  //         >
  //           {row.original.url}
  //         </Link>
  //       </Box>
  //     );
  //   },
  // },
  {
    accessorKey: 'actions',
    header: 'Actions',
    enableSorting: false,
  },
];

const Companies = () => {
  const { open, onOpen, setOpen } = useDisclosure();
  const { open: deleteOpen, setOpen: setDeleteOpen } = useDisclosure();

  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      refetch();
      setDeleteOpen(false);
    },
    onError: (error) => {
      console.error('Error deleting company', error);
    },
  });

  const toggleDelete = (company: any) => {
    console.log('Delete company', company);
    setSelectedCompany(company);
    setDeleteOpen(true);
  };

  const handleCompanyDelete = () => {
    deleteMutation.mutate(selectedCompany.companyId);
  };

  const toggleEdit = (company: any) => {
    console.log('Edit company', company);
    setSelectedCompany(company);
    setOpen(true);
  };

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error loading companies</div>;

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
            handleRefresh={refetch}
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
          handleDelete={handleCompanyDelete}
        />
      )}
    </Box>
  );
};

export default Companies;
