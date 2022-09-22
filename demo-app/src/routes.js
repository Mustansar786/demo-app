import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import {
  User,
  AddUser,
  UpdateUser
} from './pages/index';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';

import NotFound from './pages/Page404';

// ----------------------------------------------------------------------
const Authentication = () => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/dashboard"> </Navigate>;
  }
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login"> </Navigate>;
  }
};
export default function Router() {
  return (
    <Routes>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<DashboardApp />} />
       <Route path="/user" element={<User />} />
        <Route path="/user/add_user" element={<AddUser />} />
        <Route path="/user/edit_user/:id" element={<UpdateUser />} />
      </Route>
      
      <Route element={<LogoOnlyLayout />}>
        <Route path="/" element={<Authentication />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="404" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
     
    </Routes>
  );
}
