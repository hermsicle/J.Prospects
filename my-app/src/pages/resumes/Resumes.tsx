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
import UploadResumeModal from '@/features/upload-resume-modal/UploadResumeModal';

const columns = [
  {
    accessorKey: 'fileName',
    header: 'File Name',
  },
  {
    accessorKey: 'docType',
    header: 'Document Type',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
];

const data = [
  {
    fileName: 'herman_resume2025v2.pdf',
    docType: 'Resume',
    createdAt: '2025-07-08 14:32',
    actions: 'Download',
  },
  {
    fileName: 'herman_resume2025.docx',
    docType: 'Resume',
    createdAt: '2025-07-05 09:18',
    actions: 'Download',
  },
  {
    fileName: 'herman_resume2025v1.pdf',
    docType: 'Resume',
    createdAt: '2025-07-01 16:45',
    actions: 'Download',
  },
];

const Resumes = () => {
  const { open, onOpen, setOpen } = useDisclosure();
  return (
    <Box>
      <Flex alignItems="center" justifyContent={'space-between'} mb={3}>
        <Heading>Resumes</Heading>
        <Button size="sm" onClick={onOpen}>
          Upload resume
        </Button>
      </Flex>
      <Card.Root>
        <Card.Body>
          <AppTable columns={columns} rawData={data} />
        </Card.Body>
      </Card.Root>

      {open && <UploadResumeModal open={open} setOpen={setOpen} />}
    </Box>
  );
};
export default Resumes;
