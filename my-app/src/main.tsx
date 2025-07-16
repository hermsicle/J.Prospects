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

import { AppRoutesNotProtected } from './routes/AppRoutes.tsx';
import { Hub } from 'aws-amplify/utils';

const awsConfig: any = {
  Auth: {
    Cognito: {
      userPoolId: 'us-west-1_BbhOQTGkJ',
      userPoolClientId: '75ncfjdofs647p1sckbtma9tg7',
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

function Root() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  const navigateToLanding = () => {
    navigate('/');
  };

  // Hub.listen('auth', ({ payload }) => {
  //   switch (payload.event) {
  //     case 'signedIn':
  //       console.log('user have been signedIn successfully.');
  //       navigateToHome();
  //       break;
  //     case 'signedOut':
  //       console.log('user have been signedOut successfully.');
  //       navigateToLanding();
  //       break;
  //     case 'tokenRefresh':
  //       console.log('auth tokens have been refreshed.');
  //       break;
  //     case 'tokenRefresh_failure':
  //       console.log('failure while refreshing auth tokens.');
  //       break;
  //     case 'signInWithRedirect':
  //       console.log('signInWithRedirect API has successfully been resolved.');
  //       break;
  //     case 'signInWithRedirect_failure':
  //       console.log('failure while trying to resolve signInWithRedirect API.');
  //       break;
  //   }
  // });

  if (route !== 'authenticated') {
    // return <Authenticator signUpAttributes={['email']} />;
    return <AppRoutesNotProtected />;
  }

  if (route === 'authenticated') {
    return <App />;
  }

  return <></>;
}

createRoot(document.getElementById('root')!).render(
  <Authenticator.Provider>
    <Provider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </Authenticator.Provider>
);
