import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Spinner from './components/Spinner';

const Home = React.lazy(() => import('./container/Home'));
const Login = React.lazy(() => import('./components/Login'));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className='w-full flex items-center justify-center h-screen'>
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default App;
