import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const Login = React.lazy(() => import('./pages/login'));
const ActivityFeeds = React.lazy(() => import('./pages/activity-feeds'));

const MainRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Navigate replace to="/activity-feeds" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activity-feeds" element={<ActivityFeeds />} />
    </Routes>
  </Suspense>
);

export default MainRoutes;
