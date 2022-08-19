import * as React from 'react';
import '@testing-library/jest-dom';
import {
  screen,
  within,
  waitForElementToBeRemoved,
  render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BraidTestProvider } from 'braid-design-system/test';
import { Page } from './Page';

it('should allow a user to successfully RSVP', async () => {
  const user = userEvent.setup();

  console.time();
  render(
    <BraidTestProvider>
      <Page />
    </BraidTestProvider>,
  );

  console.timeLog();
  // await waitForElementToBeRemoved(() => screen.getByLabelText('Loading'));

  console.timeLog();
  const rsvpButton = screen.getByRole('button', { name: 'RSVP now' });
  await user.click(rsvpButton);

  console.timeLog();
  const rsvpFormDialog = screen.getByRole('dialog', {
    name: 'New event for seller@seek.com.au',
  });

  console.timeLog();
  const firstNameInput = within(rsvpFormDialog).getByRole('textbox', {
    name: 'First name',
  });

  console.timeLog();
  const lastNameInput = within(rsvpFormDialog).getByRole('textbox', {
    name: 'Last name',
  });

  console.timeLog();
  const emailAddressInput = within(rsvpFormDialog).getByRole('textbox', {
    name: 'Email address',
  });

  console.timeLog();
  const phoneNumberInput = within(rsvpFormDialog).getByRole('textbox', {
    name: 'Phone number (optional) +61',
  });

  console.timeLog();
  const submitRsvpButton = within(rsvpFormDialog).getByRole('button', {
    name: 'RSVP',
  });

  console.timeLog();
  await user.type(firstNameInput, 'Example');

  console.timeLog();
  await user.type(lastNameInput, 'User');

  console.timeLog();
  await user.type(emailAddressInput, 'buyer@seek.com.au');

  console.timeLog();
  await user.type(phoneNumberInput, '123456789');

  console.timeLog();
  await user.click(submitRsvpButton);
  expect(
    within(rsvpFormDialog).getByRole('button', {
      name: 'RSVP',
    }),
  ).toBeDisabled();

  console.timeLog();
  await waitForElementToBeRemoved(
    () =>
      screen.getByRole('dialog', {
        name: 'New event for seller@seek.com.au',
      }),
    { timeout: 10_000 },
  );

  console.timeLog();
  const rsvpConfirmationAlert = screen.getByRole('alert');
  expect(rsvpConfirmationAlert).toHaveTextContent(
    "Congratulations! You're now booked into this event. We'll send you an email shortly confirming the details.",
  );
  expect(rsvpButton).not.toBeInTheDocument();

  console.timeEnd();
}, 100_000);
