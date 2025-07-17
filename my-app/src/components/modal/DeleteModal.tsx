import React from 'react';
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
} from '@chakra-ui/react';

interface DeleteModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  title: string;
  handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open = false,
  setOpen,
  title,
  handleDelete,
}) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e: any) => setOpen(e.open)}
      placement={'center'}
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Text>Are you sure you want to delete this item?</Text>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Delete</Button>
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

export default DeleteModal;
