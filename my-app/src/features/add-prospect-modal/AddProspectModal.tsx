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
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { getOpenAIResponse } from '@/services/openai';

const AddProspectModal = ({
  open,
  setOpen,
  selectedProspect = null,
  setSelectedProspect = null,
}: any) => {
  const isEdit = selectedProspect !== null;

  const [formData, setFormData] = useState({
    positionOfInterest: '',
    personOfContact: '',
    url: {
      linkedin: '',
      email: '',
      jobListing: '',
    },
    status: '', // Default to In Progress if new prospect
    generatedOutreachMessage: '',
    generatedNoteMessage: '',
  });
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // TODO: send formData to API or state
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
                <Field.Root>
                  <Field.Label>Status</Field.Label>
                  <Input
                    placeholder="Applied / Interviewing / Offer / Rejected"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
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

export default AddProspectModal;
