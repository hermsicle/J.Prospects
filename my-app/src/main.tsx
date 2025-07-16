import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { BrowserRouter, useNavigate } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react';
import 'simplebar-react/dist/simplebar.min.css';

import { Provider } from '@/components/ui/provider';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';

import { Hub } from 'aws-amplify/utils';

const awsConfig: any = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
};

Amplify.configure(awsConfig);

createRoot(document.getElementById('root')!).render(
  <Authenticator.Provider>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Authenticator.Provider>
);
