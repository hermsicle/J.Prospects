import { Children, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import HorizontalLayout from './layouts/HorizontalLayout';

// import { getCurrentUser } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import {
  appRoutesNotProtected,
  appRoutesProtected,
  AuthWrapper,
} from './routes/AppRoutes';

const PrivateRoutes = () => {
  const { authStatus } = useAuthenticator((context) => [context.user]);

  return authStatus === 'authenticated' ? <Outlet /> : <></>;
};

function App() {
  // check if user is authenticated

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        {Children.toArray(
          appRoutesProtected.map((route) => {
            return (
              <Route
                path={route.path}
                element={<HorizontalLayout>{route.element}</HorizontalLayout>}
              />
            );
          })
        )}
      </Route>
      {Children.toArray(
        appRoutesNotProtected.map((route) => {
          return <Route path={route.path} element={route.element} />;
        })
      )}
    </Routes>
  );
}

export default App;
