import * as React from 'react';
import {
  Box,
  ContentBlock,
  Card,
  Stack,
  Bleed,
  Heading,
  Columns,
  Column,
  IconTime,
  IconLocation,
  Divider,
  Text,
  IconInfo,
  Dialog,
  Alert,
  Inline,
  Button,
  TextField,
} from 'braid-design-system';
import { Fragment } from 'react';

const seminar = {
  clientId: '8aae0a35-57ba-4ec5-8cef-3df8c0347a91',
  title: 'New event for seller@seek.com.au',
  description:
    'Proin ornare justo nec ultrices mollis. Suspendisse sed pretium diam, ut posuere nunc. Donec sit amet lobortis ante. Integer ultrices sollicitudin turpis, et bibendum mi cursus at. Duis rutrum aliquet velit, vitae elementum orci porta eget. Aliquam euismod at lacus sit amet pharetra. Vestibulum faucibus eu sem bibendum vulputate.\n\nDonec ligula nunc, ultricies sit amet malesuada vitae, elementum quis urna. Ut ac nisl eget orci vulputate aliquet. Sed mattis efficitur elit sit amet euismod. In hac habitasse platea dictumst. Aliquam hendrerit nulla sed sem hendrerit sodales. Vivamus nec.',
  seminarDateTime: '2029-12-31T21:00:00.000Z',
  imageFile: '6e0efcbd-9292-4652-a974-c524a3fcdeb9.jpg',
  location: {
    address: '60 Cremorne St',
    suburb: 'Cremorne',
    postcode: '3000',
    state: '52',
  },
};

enum Status {
  Unregistered = 'UNREGISTERED',
  Registered = 'REGISTERED',
  DismissedRegisteredConfirmation = 'DISMISSED_REGISTERED_CONFIRMATION',
}

export const Page = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rsvpStatus, setStatus] = React.useState<Status>(Status.Unregistered);

  const handleSubmit = () => {
    setShowForm(false);
    setIsLoading(true);

    setTimeout(() => setStatus(Status.Registered), 800);
  };

  return (
    <Fragment>
      <Box marginY={{ mobile: 'none', desktop: 'gutter' }}>
        <ContentBlock width="medium">
          <Card>
            <Stack space="large">
              <Bleed horizontal="gutter" top="gutter">
                <img
                  // This is a decorative image and thus should not provide alt text
                  // https://www.w3.org/WAI/tutorials/images/decorative/
                  alt=""
                  src=""
                />
              </Bleed>

              <Heading level="2">{seminar.title}</Heading>

              <Box>
                {rsvpStatus === Status.Registered ? (
                  <Alert
                    tone="positive"
                    onClose={() =>
                      setStatus(Status.DismissedRegisteredConfirmation)
                    }
                    closeLabel="Close RSVP confirmation"
                  >
                    <Text>
                      Congratulations! You&apos;re now booked into this event.
                      We&apos;ll send you an email shortly confirming the
                      details.
                    </Text>
                  </Alert>
                ) : rsvpStatus === Status.Unregistered ? (
                  <Inline space="none">
                    <Button onClick={() => setShowForm(true)}>RSVP now</Button>
                  </Inline>
                ) : null}
              </Box>

              <Box>
                <Columns space="gutter" collapseBelow="tablet">
                  <Column>
                    <Stack space="small">
                      <Box>
                        <Heading level="4" component="h3">
                          <IconTime /> When
                        </Heading>
                      </Box>
                      <Text>
                        <span>
                          {new Date(seminar.seminarDateTime).toLocaleString()}
                        </span>
                      </Text>
                    </Stack>
                  </Column>

                  <Column>
                    <Stack space="small">
                      <Box>
                        <Heading level="4" component="h3">
                          <IconLocation /> Where
                        </Heading>
                      </Box>
                      <Text>
                        <span>
                          {seminar.location.address}
                          <br />
                          {seminar.location.suburb} {seminar.location.state}{' '}
                          {seminar.location.postcode}
                        </span>
                      </Text>
                    </Stack>
                  </Column>
                </Columns>
              </Box>

              <Divider />

              <Stack space="small">
                <Box>
                  <Heading level="4" component="h3">
                    <IconInfo /> About this event
                  </Heading>
                </Box>
                <Text>
                  <span>{seminar.description}</span>
                </Text>
              </Stack>
            </Stack>
          </Card>
        </ContentBlock>
      </Box>

      <Dialog
        id="formDialog"
        title={seminar.title}
        open={showForm}
        onClose={() => setShowForm(false)}
      >
        <Form onSubmit={handleSubmit} isLoading={isLoading} />
      </Dialog>
    </Fragment>
  );
};

const FIRST_NAME_CHARACTER_LIMIT = 30;
const LAST_NAME_CHARACTER_LIMIT = 30;
const EMAIL_ADDRESS_CHARACTER_LIMIT = 30;

const Form = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
  }) => void;
  isLoading: boolean;
}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit({
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
        });
      }}
    >
      <Stack space="small">
        <Columns space="small">
          <Column>
            <TextField
              id="firstName"
              label="First name"
              characterLimit={FIRST_NAME_CHARACTER_LIMIT}
              value={firstName}
              onChange={(ev) => setFirstName(ev.currentTarget.value)}
            />
          </Column>
          <Column>
            <TextField
              id="lastName"
              label="Last name"
              characterLimit={LAST_NAME_CHARACTER_LIMIT}
              value={lastName}
              onChange={(ev) => setLastName(ev.currentTarget.value)}
            />
          </Column>
        </Columns>

        <TextField
          id="emailAddress"
          label="Email address"
          type="email"
          characterLimit={EMAIL_ADDRESS_CHARACTER_LIMIT}
          value={emailAddress}
          onChange={(ev) => setEmailAddress(ev.currentTarget.value)}
        />
        <TextField
          id="phoneNumber"
          type="tel"
          prefix="+61"
          label="Phone number"
          secondaryLabel="optional"
          value={phoneNumber}
          onChange={(ev) => setPhoneNumber(ev.currentTarget.value)}
        />

        <Button loading={isLoading} type="submit">
          RSVP
        </Button>
      </Stack>
    </form>
  );
};
