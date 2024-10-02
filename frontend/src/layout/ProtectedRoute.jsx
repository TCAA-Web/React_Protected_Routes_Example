import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user }) => {
  // Hvis ikke useren findes så redirect tilbage til forsiden
  if (!user) {
    return <Navigate to="/" redirect />;
  }

  // Ellers så returner det underlæggende komponent
  return (
    <>
      <Outlet />
    </>
  );
};
