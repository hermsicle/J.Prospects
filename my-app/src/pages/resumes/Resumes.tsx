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
import DeleteModal from '@/components/modal/DeleteModal';

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
    enableSorting: false,
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
  const {
    open: deleteOpen,
    onOpen: onDeleteOpen,
    setOpen: setDeleteOpen,
  } = useDisclosure();
  const [selectedResume, setSelectedResume] = useState<any>(null);

  const toggleDelete = (resume: any) => {
    console.log('Delete resume', resume);
    setSelectedResume(resume);
    setDeleteOpen(true);
  };

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
          <AppTable
            columns={columns}
            rawData={data}
            handleDelete={toggleDelete}
            deleteActionOnly={true}
          />
        </Card.Body>
      </Card.Root>

      {open && <UploadResumeModal open={open} setOpen={setOpen} />}
      {deleteOpen && (
        <DeleteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          title={`Delete ${selectedResume?.fileName}`}
          handleDelete={() => {}}
        />
      )}
    </Box>
  );
};
export default Resumes;
