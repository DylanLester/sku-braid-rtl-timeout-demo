import 'braid-design-system/reset';

import { BraidProvider } from 'braid-design-system';
import apac from 'braid-design-system/themes/apac';
import React, { StrictMode } from 'react';

import { Page } from '../Page/Page';

interface AppProps {
  environment: 'development' | 'production';
}

export default ({ environment }: AppProps) => (
  <StrictMode>
    <BraidProvider theme={apac}>
      <Page />
    </BraidProvider>
  </StrictMode>
);
