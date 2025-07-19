import {
  OUTREACH_NOTE_EXAMPLE,
  OUTREACT_MESSAGE_EXAMPLE,
} from '@/data/cover-letter';
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
  Select,
  createListCollection,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { getOpenAIResponse } from '@/services/openai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProspect, updateProspect } from '@/services/apis';
import { useLocation } from 'react-router-dom';

const AddProspectModal = ({
  open,
  setOpen,
  selectedProspect = null,
  setSelectedProspect = null,
}: any) => {
  const isEdit = selectedProspect !== null;
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>(
    isEdit
      ? selectedProspect
      : {
          positionOfInterest: '',
          personOfContact: '',
          url: {
            linkedin: '',
            email: '',
            jobListing: '',
          },
          status: 'inProgress', // Default to In Progress if new prospect
          generatedOutreachMessage: '',
          generatedNoteMessage: '',
        }
  );
  const ref = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const companyId = location.search.split('=')[1];

  // console.log('companyId', companyId);

  const addProspectMutation = useMutation({
    mutationFn: createProspect,
    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
    },
  });

  const updateProspectMutation = useMutation({
    mutationFn: updateProspect,
    onSuccess: (data) => {
      setOpen(false);
      setSelectedProspect(null);
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
    },
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (isEdit) {
      // Update prospect logic here
      const data = { ...formData };

      // do not send updatedAs field
      delete data.updatedAt;

      updateProspectMutation.mutate({
        companyId: companyId,
        prospectId: selectedProspect.prospectId,
        data,
      });
    } else {
      const data = { ...formData };

      addProspectMutation.mutate({ id: companyId, data });
    }
  };

  const generateOutreachMessage = async () => {
    handleChange('generatedOutreachMessage', OUTREACT_MESSAGE_EXAMPLE);
  };

  const generateNoteMessage = async () => {
    handleChange('generatedNoteMessage', OUTREACH_NOTE_EXAMPLE);

    try {
      const res = await getOpenAIResponse(
        'Create linkedIn outreach message to recruiter'
      );
      console.log('res', res);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
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
              <Dialog.Title>
                {isEdit ? 'Edit prospect' : 'Add prospect'}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                {/* Person of Contact */}
                <Field.Root>
                  <Field.Label>Person of Contact</Field.Label>
                  <Input
                    placeholder="Person of Contact"
                    value={formData.personOfContact}
                    onChange={(e) =>
                      handleChange('personOfContact', e.target.value)
                    }
                  />
                </Field.Root>

                {/* Position of Interest */}
                <Field.Root>
                  <Field.Label>Position of Interest</Field.Label>
                  <Input
                    placeholder="Position"
                    value={formData.positionOfInterest}
                    onChange={(e) =>
                      handleChange('positionOfInterest', e.target.value)
                    }
                  />
                </Field.Root>

                <Flex
                  justifyContent={'space-evenly'}
                  gap={2}
                  // alignItems="center"
                >
                  {/* //! Generate outreach message */}
                  <Box w={'50%'}>
                    <Button
                      size="sm"
                      w={'100%'}
                      onClick={generateOutreachMessage}
                      colorScheme="blue"
                      disabled={
                        !formData.positionOfInterest ||
                        !formData.personOfContact
                      }
                    >
                      {formData.generatedOutreachMessage
                        ? 'Regenerate out-reach message'
                        : 'Generate out-reach message'}
                    </Button>
                    <Text fontSize="10px" textAlign={'center'}>
                      Use if person of contact is already in your connections
                      and accepted messages{' '}
                    </Text>

                    {formData.generatedOutreachMessage && (
                      <Box p={4} borderWidth="1px" borderColor={'gray.300'}>
                        <Heading size="sm">Generated out reach message</Heading>
                        {formData.generatedOutreachMessage}
                      </Box>
                    )}
                  </Box>

                  {/* //! Generate note message  */}
                  <Box w={'50%'}>
                    <Button
                      size="sm"
                      w={'100%'}
                      onClick={generateNoteMessage}
                      colorScheme="blue"
                      disabled={
                        !formData.positionOfInterest ||
                        !formData.personOfContact
                      }
                    >
                      {formData.generatedNoteMessage
                        ? 'Regenerate note message'
                        : 'Generate note message'}
                    </Button>
                    <Text fontSize="10px" textAlign={'center'}>
                      Use if person of contact is not yet connected. Limits to
                      200 characters
                    </Text>

                    {formData.generatedNoteMessage && (
                      <Box p={4} borderWidth="1px" borderColor={'gray.300'}>
                        <Heading size="sm">Generated out reach message</Heading>
                        {formData.generatedNoteMessage}
                      </Box>
                    )}
                  </Box>
                </Flex>

                {/* LinkedIn */}
                <Field.Root>
                  <Field.Label>LinkedIn URL</Field.Label>
                  <Input
                    placeholder="https://linkedin.com/in/username"
                    value={formData.url.linkedin}
                    onChange={(e) =>
                      handleChange('url', {
                        ...formData.url,
                        linkedin: e.target.value,
                      })
                    }
                  />
                </Field.Root>

                {/* Email */}
                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input
                    placeholder="email@example.com"
                    value={formData.url.email}
                    onChange={(e) =>
                      handleChange('url', {
                        ...formData.url,
                        email: e.target.value,
                      })
                    }
                  />
                </Field.Root>

                {/* Job Listing */}
                <Field.Root>
                  <Field.Label>Job Listing URL</Field.Label>
                  <Input
                    placeholder="https://company.com/jobs/role"
                    value={formData.url.jobListing}
                    onChange={(e) =>
                      handleChange('url', {
                        ...formData.url,
                        jobListing: e.target.value,
                      })
                    }
                  />
                </Field.Root>

                {/* Status */}
                {/* <Field.Root>
                  <Field.Label>Status</Field.Label>
                  <Input
                    placeholder="Applied / Interviewing / Offer / Rejected"
                    value={formData.status}
                    onChange={(e: any) =>
                      handleChange('status', e.target.value)
                    }
                  />
                </Field.Root> */}
                <StatusSelect
                  value={[formData.status]}
                  setValue={(val: any) => handleChange('status', val[0])}
                />
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>Save</Button>
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

const StatusSelect = ({ value = '', setValue }: any) => {
  const statusOptions = createListCollection({
    items: [
      { label: 'In Progress', value: 'inProgress' },
      { label: 'Applied', value: 'applied' },
      { label: 'Interviewing', value: 'interviewing' },
      { label: 'Offer', value: 'offer' },
      { label: 'Rejected', value: 'rejected' },
    ],
  });
  return (
    <Select.Root
      collection={statusOptions}
      value={value}
      onValueChange={(e: any) => setValue(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Label>Select status</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select status" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal zIndex={999} disabled>
        <Select.Positioner>
          <Select.Content>
            {statusOptions.items.map((status) => (
              <Select.Item item={status} key={status.value}>
                {status.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default AddProspectModal;
