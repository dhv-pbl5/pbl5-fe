import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import URL_PATH from './utils/constants';

const Home = lazy(() => import('@/pages/Home'));

function AppRoutes() {
  return (
    <Routes>
      <Route path={URL_PATH.HOME} element={<Home />} />
      <Route path="*" element={<Navigate to={URL_PATH.HOME} />} />
    </Routes>
  );
}

export default AppRoutes;
