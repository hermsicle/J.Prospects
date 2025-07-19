import {
  Box,
  Heading,
  Flex,
  Button,
  IconButton,
  Tabs,
  Link,
  SimpleGrid,
  useDisclosure,
  Card,
  Stack,
  GridItem,
  Grid,
  Progress,
  Text,
} from '@chakra-ui/react';
import { AppTable } from '@/components/table/AppTable';
import AddProspectModal from '../add-prospect-modal/AddProspectModal';
import KpiCard from '@/components/kpi-card/KpiCard';
import {
  FiUsers,
  FiActivity,
  FiBriefcase,
  FiXCircle,
  FiCalendar,
  FiPlusCircle,
  FiList,
  FiRefreshCw,
  FiBarChart2,
  FiUserPlus,
  FiAward,
} from 'react-icons/fi';
import { MdWorkOutline } from 'react-icons/md';

import ProspectsPieChart from '../prospects-pie-chart/ProspectsPieChart';
import { useState } from 'react';
import DeleteModal from '@/components/modal/DeleteModal';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteProspect,
  fetchCompanyKpis,
  listCompanyProspects,
} from '@/services/apis';
import { useColorModeValue } from '@/components/ui/color-mode';

const StatusBox = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => (
  <Box
    py={1}
    px={2}
    bg={`${color}.50`}
    borderRadius="md"
    textAlign="center"
    fontSize="sm"
    color={`${color}.600`}
    display="flex"
    alignItems="center"
    gap={1}
  >
    <Box fontWeight="bold" fontSize="">
      {value}
    </Box>
    <Box>{label}</Box>
  </Box>
);

const ProspectsTab = () => {
  const { open, onOpen, setOpen } = useDisclosure();
  const location = useLocation();
  const companyId = location.search.split('=')[1];

  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ['kpis'],
    queryFn: () => fetchCompanyKpis(companyId),
  });

  console.log('data', data);

  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, '2xl': 6 }}
        spacing={4}
        mb={4}
        gap={4}
      >
        <KpiCard
          header="Total Prospects"
          data="25"
          icon={<FiUsers />}
          color={useColorModeValue('purple.100', 'purple.200')}
        />

        <KpiCard
          header="New Prospects This Week"
          data="5"
          icon={<FiUserPlus />}
          color={useColorModeValue('blue.50', 'blue.200')}
        />

        <KpiCard
          header="Recently Updated Prospects"
          data="4"
          icon={<FiRefreshCw />}
          color={useColorModeValue('orange.100', 'orange.200')}
        />

        <KpiCard
          header="Prospects by Status"
          data="5"
          icon={<FiBarChart2 />}
          color={useColorModeValue('white', 'gray.200')}
          children={
            <SimpleGrid
              columns={{ base: 2, xl: 2, '2xl': 2, '3xl': 4 }}
              mt={0}
              gap={1}
            >
              <StatusBox label="Applied" value={8} color="blue" />
              <StatusBox label="Interview" value={4} color="yellow" />
              <StatusBox label="Offer" value={1} color="green" />
              <StatusBox label="Rejected" value={5} color="red" />
            </SimpleGrid>
          }
        />

        <KpiCard
          header="Interviews Scheduled This Week"
          data="2"
          icon={<FiCalendar />}
          color={useColorModeValue('yellow.50', 'yellow.200')}
        />

        <KpiCard
          header="Offers Received This Month"
          data="1"
          icon={<FiAward />}
          color={useColorModeValue('green.50', 'green.200')}
        />
      </SimpleGrid>

      {/* <ProspectsPieChart /> */}

      <Card.Root>
        <Card.Header>
          <Flex alignItems="center" justifyContent={'space-between'}>
            <Heading d="flex" alignItems={'center'} size="md">
              Prospects
            </Heading>
            <Button size="sm" onClick={onOpen}>
              Add prospect
            </Button>
          </Flex>
        </Card.Header>
        <Card.Body>
          <ProspectsTable companyId={companyId} />
        </Card.Body>
      </Card.Root>

      {open && <AddProspectModal open={open} setOpen={setOpen} />}
    </Box>
  );
};

const ProspectsTable = ({ companyId }: any) => {
  const columns = [
    {
      accessorKey: 'positionOfInterest',
      header: 'Role Applying For',
    },
    {
      accessorKey: 'personOfContact',
      header: 'Person Of Contact',
    },
    {
      accessorKey: 'url',
      header: 'LinkedIn | Email | Job Listing',
      cell: ({ row }: any) => {
        const { linkedin, email, jobListing } = row.original.url;

        return (
          <Box display="flex" flexDirection="column" gap={1}>
            <Link
              href={linkedin}
              target="__blank"
              color="blue.500"
              textDecoration={'underline'}
            >
              {linkedin}
            </Link>
            <Link
              href={`mailto:${email}`}
              target="__blank"
              color="blue.500"
              textDecoration={'underline'}
            >
              {email}
            </Link>
            <Link
              href={`${jobListing}`}
              target="__blank"
              color="blue.500"
              textDecoration={'underline'}
            >
              {jobListing}
            </Link>
          </Box>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'updatedAt',
      header: 'Last Updated',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      enableSorting: false,
    },
  ];

  // const data = [
  //   {
  //     personOfContact: 'Jane Doe',
  //     url: {
  //       linkedin: 'https://linkedin.com/in/janedoe',
  //       email: 'jane.doe@example.com',
  //       jobListing: 'indeed.com',
  //     },
  //     status: 'Interviewing',
  //     lastUpdated: '',
  //     positionOfInterest: 'Frontend Engineer',
  //     actions: '', // placeholder for action buttons like edit/delete
  //   },
  //   {
  //     personOfContact: 'Michael Lee',
  //     url: {
  //       linkedin: 'https://linkedin.com/in/michaellee',
  //       email: 'michael.lee@example.com',
  //       jobListing: 'linkedIn.com',
  //     },
  //     status: 'Applied',
  //     lastUpdated: '',
  //     positionOfInterest: 'Backend Developer',
  //     actions: '',
  //   },
  //   {
  //     personOfContact: 'Emily Chen',
  //     url: {
  //       linkedin: 'https://linkedin.com/in/emchen',
  //       email: 'emily.chen@example.com',
  //     },
  //     status: 'Rejected',
  //     lastUpdated: '',
  //     positionOfInterest: 'Product Designer',
  //     actions: '',
  //   },
  //   {
  //     personOfContact: 'Ryan Smith',
  //     url: {
  //       linkedin: 'https://linkedin.com/in/ryansmith',
  //       email: 'ryan.smith@example.com',
  //     },
  //     status: 'Offer',
  //     lastUpdated: '',
  //     positionOfInterest: 'Full Stack Engineer',
  //     actions: '',
  //   },
  //   {
  //     personOfContact: 'Sarah Kim',
  //     url: {
  //       linkedin: 'https://linkedin.com/in/sarahkim',
  //       email: 'sarah.kim@example.com',
  //     },
  //     status: 'Follow Up',
  //     lastUpdated: '',
  //     positionOfInterest: 'Software Engineer Intern',
  //     actions: '',
  //   },
  // ];
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const { open, onOpen, setOpen } = useDisclosure();

  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ['prospects'],
    queryFn: () => listCompanyProspects(companyId),
  });

  const {
    open: deleteOpen,
    onOpen: onDeleteOpen,
    setOpen: setDeleteOpen,
  } = useDisclosure();

  const deleteMutation = useMutation({
    mutationFn: deleteProspect,
    onSuccess: () => {
      refetch();
      setDeleteOpen(false);
    },
  });

  const toggleDelete = (prospect: any) => {
    console.log('Delete prospect', prospect);
    setSelectedProspect(prospect);
    setDeleteOpen(true);
  };

  const toggleEdit = (company: any) => {
    console.log('Edit company', company);
    setSelectedProspect(company);
    setOpen(true);
  };

  const handleProspectDelete = () => {
    deleteMutation.mutate({
      companyId: companyId,
      prospectId: selectedProspect.prospectId,
    });
  };

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error loading prospects</div>;

  return (
    <>
      <AppTable
        columns={columns}
        rawData={data}
        handleDelete={toggleDelete}
        handleEdit={toggleEdit}
        handleRefresh={refetch}
      />
      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          title={`Delete ${selectedProspect?.personOfContact}`}
          handleDelete={handleProspectDelete}
        />
      )}
      {open && (
        <AddProspectModal
          open={open}
          setOpen={setOpen}
          selectedProspect={selectedProspect}
          setSelectedProspect={setSelectedProspect}
        />
      )}
    </>
  );
};

export default ProspectsTab;
