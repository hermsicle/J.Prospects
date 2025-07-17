import {
  COVER_LETTER_EXAMPLE,
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
  Heading,
  Textarea,
  Icon,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';

const AddCompanyModal = ({
  open,
  setOpen,
  selectedCompany = null,
  setSelectedCompany = null,
}: any) => {
  const isEdit = selectedCompany !== null;
  const [formData, setFormData] = useState({
    name: '',
    // website: '',
    description: '',
    prospects: [
      {
        positionOfInterest: '',
        personOfContact: '',
        url: {
          linkedin: '',
          email: '',
          jobListing: '',
        },
        status: '',
      },
    ],
  });
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<
    string | null
  >(null);
  const [generatedOutreachMessage, setGeneratedOutreachMessage] = useState<
    string | null
  >(null);
  const [generatedNoteMessage, setGeneratedNoteMessage] = useState<
    string | null
  >(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (key: string, value: any, isProspect = false) => {
    if (isProspect) {
      setFormData((prev: any) => ({
        ...prev,
        prospects: [{ ...prev.prospects[0], [key]: value }],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // TODO: send formData to API or state
  };

  const handleGenerateLetter = () => {
    console.log('call OpenAI API');
    setGeneratedCoverLetter(COVER_LETTER_EXAMPLE);
  };

  const handleGenerateOutreachMessage = () => {
    console.log('call OpenAI API');
    setGeneratedOutreachMessage(OUTREACT_MESSAGE_EXAMPLE);
  };

  const handleGenerateNoteMessage = () => {
    console.log('call OpenAI API');
    setGeneratedNoteMessage(OUTREACH_NOTE_EXAMPLE);
  };

  useEffect(() => {
    return () => {
      setSelectedCompany(null);
    };
  }, []);

  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={'center'}
      // size={generatedCoverLetter ? 'cover' : 'lg'}
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {isEdit ? 'Edit company' : 'Add company'}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Flex gap={2}>
                <Stack w={generatedCoverLetter ? '60%' : '100%'} gap="4">
                  <Field.Root>
                    <Field.Label>Company Name</Field.Label>
                    <Input
                      placeholder="Company Name"
                      ref={ref}
                      value={formData.name}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => handleChange('name', e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Company Description</Field.Label>
                    <Textarea
                      placeholder="Company Description"
                      // autoresize
                      // resize={'both'}
                      maxH="250px"
                      value={formData.description}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => handleChange('description', e.target.value)}
                    />
                  </Field.Root>

                  {/* //! Generate Cover Letter from Description */}
                  <Button
                    size="sm"
                    onClick={handleGenerateLetter}
                    colorScheme="blue"
                    disabled={!formData.description && !formData.name}
                  >
                    {generatedCoverLetter
                      ? 'Regenerate cover letter'
                      : 'Generate cover letter'}
                  </Button>

                  <hr />
                  <Heading size="md">
                    Add prospect information *optional
                  </Heading>
                  <SimpleBar
                    forceVisible="y"
                    autoHide={false}
                    style={{
                      maxHeight: '600px',
                    }}
                  >
                    <Stack gap="4">
                      {/* Position of Interest */}
                      <Field.Root>
                        <Field.Label>Position of Interest</Field.Label>
                        <Input
                          placeholder="Position"
                          value={formData.prospects[0].positionOfInterest}
                          onChange={(e) =>
                            handleChange(
                              'positionOfInterest',
                              e.target.value,
                              true
                            )
                          }
                        />
                      </Field.Root>

                      {/* Person of Contact */}
                      <Field.Root>
                        <Field.Label>Person of Contact</Field.Label>
                        <Input
                          placeholder="Person of Contact"
                          value={formData.prospects[0].personOfContact}
                          onChange={(e) =>
                            handleChange(
                              'personOfContact',
                              e.target.value,
                              true
                            )
                          }
                        />
                      </Field.Root>

                      <Flex justifyContent={'space-evenly'} gap={2}>
                        {/* //! Generate outreach message */}
                        <Box w={'50%'}>
                          <Button
                            size="sm"
                            w={'100%'}
                            onClick={handleGenerateOutreachMessage}
                            colorScheme="blue"
                            disabled={
                              !formData.prospects[0].positionOfInterest ||
                              !formData.prospects[0].personOfContact
                            }
                          >
                            {generatedOutreachMessage
                              ? 'Regenerate out-reach message'
                              : 'Generate out-reach message'}
                          </Button>
                          <Text fontSize="10px" textAlign={'center'}>
                            Use if person of contact is already in your
                            connections and accepted messages{' '}
                          </Text>

                          {generatedOutreachMessage && (
                            <Box
                              p={4}
                              borderWidth="1px"
                              borderColor={'gray.300'}
                            >
                              <Heading size="sm">
                                Generated out reach message
                              </Heading>
                              {generatedOutreachMessage}
                            </Box>
                          )}
                        </Box>

                        {/* //! Generate note message  */}
                        <Box w={'50%'}>
                          <Button
                            size="sm"
                            w={'100%'}
                            onClick={handleGenerateNoteMessage}
                            colorScheme="blue"
                            disabled={
                              !formData.prospects[0].positionOfInterest ||
                              !formData.prospects[0].personOfContact
                            }
                          >
                            {generatedNoteMessage
                              ? 'Regenerate note message'
                              : 'Generate note message'}
                          </Button>
                          <Text fontSize="10px" textAlign={'center'}>
                            Use if person of contact is not yet connected.
                            Limits to 200 characters
                          </Text>

                          {generatedNoteMessage && (
                            <Box
                              p={4}
                              borderWidth="1px"
                              borderColor={'gray.300'}
                            >
                              <Heading size="sm">
                                Generated out reach message
                              </Heading>
                              {generatedNoteMessage}
                            </Box>
                          )}
                        </Box>
                      </Flex>

                      {/* LinkedIn */}
                      <Field.Root>
                        <Field.Label>LinkedIn URL</Field.Label>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          value={formData.prospects[0].url.linkedin}
                          onChange={(e) =>
                            handleChange(
                              'url',
                              {
                                ...formData.prospects[0].url,
                                linkedin: e.target.value,
                              },
                              true
                            )
                          }
                        />
                      </Field.Root>

                      {/* Email */}
                      <Field.Root>
                        <Field.Label>Email</Field.Label>
                        <Input
                          placeholder="email@example.com"
                          value={formData.prospects[0].url.email}
                          onChange={(e) =>
                            handleChange(
                              'url',
                              {
                                ...formData.prospects[0].url,
                                email: e.target.value,
                              },
                              true
                            )
                          }
                        />
                      </Field.Root>

                      {/* Job Listing */}
                      <Field.Root>
                        <Field.Label>Job Listing URL</Field.Label>
                        <Input
                          placeholder="https://company.com/jobs/role"
                          value={formData.prospects[0].url.jobListing}
                          onChange={(e) =>
                            handleChange(
                              'url',
                              {
                                ...formData.prospects[0].url,
                                jobListing: e.target.value,
                              },
                              true
                            )
                          }
                        />
                      </Field.Root>

                      {/* Status */}
                      <Field.Root>
                        <Field.Label>Status</Field.Label>
                        <Input
                          placeholder="Applied / Interviewing / Offer / Rejected"
                          value={formData.prospects[0].status}
                          onChange={(e) =>
                            handleChange('status', e.target.value, true)
                          }
                        />
                      </Field.Root>
                    </Stack>
                  </SimpleBar>
                </Stack>

                {generatedCoverLetter && (
                  <Box
                    w={generatedCoverLetter ? '40%' : '100%'}
                    p={4}
                    borderWidth="1px"
                    borderColor={'gray.300'}
                  >
                    <Heading size="md">Generated cover letter</Heading>
                    {generatedCoverLetter}
                  </Box>
                )}
              </Flex>
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

export default AddCompanyModal;
