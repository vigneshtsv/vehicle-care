import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


function AdminProtectedRoute() {
    const { currentUser } = useSelector((state)=> state.user);
  return currentUser.Role === Admin ? (
    <Outlet /> ) : (
        <Navigate to='/loginform' />
    );
}

export default AdminProtectedRoute;