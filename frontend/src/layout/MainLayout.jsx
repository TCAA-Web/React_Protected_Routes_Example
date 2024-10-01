import React from "react";
import { NavLink, Outlet } from "react-router-dom";
export const MainLayout = () => {
  return (
    <div>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signin">Sign in</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
