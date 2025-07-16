import { useColorModeValue } from '@/components/ui/color-mode';
import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  CloseButton,
  Box,
  Heading,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

const UploadResumeModal = ({ open, setOpen }: any) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={'center'}
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{'Upload resume'}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <ResumeDropzone />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Upload</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const ResumeDropzone = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    const file = acceptedFiles[0];
    setFileName(file.name);

    // Only preview PDF files
    if (file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    const reader = new FileReader();
    reader.onload = () => {
      const binaryStr = reader.result;
      console.log(binaryStr);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['.docx'],
      },
      multiple: false,
    });

  const bg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  const file = acceptedFiles.map((file) => (
    <Box key={file.name}>
      {file.name} - {file.size} bytes
    </Box>
  ));

  return (
    <Box>
      <Box
        {...getRootProps()}
        border="2px dashed"
        borderColor={isDragActive ? 'blue.400' : borderColor}
        borderRadius="xl"
        p={8}
        bg={bg}
        textAlign="center"
        cursor="pointer"
        _hover={{ borderColor: 'blue.400' }}
      >
        <input {...getInputProps()} />
        <Stack gap={3} d="flex" alignItems="center">
          <FiUploadCloud color="blue.400" size={24} style={{}} />
          <Text fontSize="lg" fontWeight="medium">
            {isDragActive
              ? 'Drop the resume here...'
              : 'Drag & drop your resume here or click to upload'}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Supported formats: PDF, DOC, DOCX
          </Text>
        </Stack>
      </Box>

      {fileName && (
        <Box mt={6}>
          <Text fontWeight="bold">Uploaded File:</Text>
          <Text>{fileName}</Text>

          {previewUrl && (
            <Box mt={4} height="60vh">
              <iframe
                title="PDF Preview"
                src={previewUrl}
                width="100%"
                height="100%"
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* <Text>{file}</Text> */}
    </Box>
  );
};

export default UploadResumeModal;
